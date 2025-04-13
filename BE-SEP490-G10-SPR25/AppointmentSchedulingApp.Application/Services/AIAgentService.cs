using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Json;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text;

namespace AppointmentSchedulingApp.Application.Services
{
    public interface IAIAgentService
    {
        Task<string> ProcessMedicalQuery(string query);
        Task<string> AnalyzeSymptoms(string symptoms);
        Task<string> RecommendSpecialty(string symptoms);
        Task<string> GetDoctorRecommendation(string specialty, string symptoms);
    }

    public class AIAgentService : IAIAgentService
    {
        private readonly HttpClient _httpClient;
        private readonly string _openAiApiKey;
        private readonly string _geminiApiKey;
        private readonly bool _useGemini;
        private readonly ILogger<AIAgentService> _logger;

        public AIAgentService(IConfiguration configuration, ILogger<AIAgentService> logger)
        {
            _httpClient = new HttpClient();
            _openAiApiKey = configuration["OpenAI:ApiKey"];
            _geminiApiKey = configuration["Gemini:ApiKey"];
            _useGemini = configuration.GetValue<bool>("Gemini:UseGemini", false);
            _logger = logger;
        }

        public async Task<string> ProcessMedicalQuery(string query)
        {
            try
            {
                var prompt = $@"Bạn là một trợ lý y tế thông minh. Hãy phân tích câu hỏi sau và trả lời một cách chuyên nghiệp:
Câu hỏi: {query}

Hãy trả lời bằng tiếng Việt và tập trung vào:
1. Phân tích triệu chứng (nếu có)
2. Đề xuất chuyên khoa phù hợp
3. Giải thích ngắn gọn về tình trạng
4. Đưa ra lời khuyên y tế cơ bản";

                return await GetAIResponse(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing medical query");
                return "Xin lỗi, tôi không thể xử lý yêu cầu của bạn vào lúc này. Vui lòng thử lại sau.";
            }
        }

        public async Task<string> AnalyzeSymptoms(string symptoms)
        {
            try
            {
                var prompt = $@"Phân tích các triệu chứng sau và đưa ra đánh giá sơ bộ:
Triệu chứng: {symptoms}

Hãy trả lời bằng tiếng Việt và bao gồm:
1. Mô tả triệu chứng
2. Các nguyên nhân có thể
3. Mức độ nghiêm trọng
4. Các bước tiếp theo cần thực hiện";

                return await GetAIResponse(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing symptoms");
                return "Xin lỗi, tôi không thể phân tích triệu chứng vào lúc này.";
            }
        }

        public async Task<string> RecommendSpecialty(string symptoms)
        {
            try
            {
                var prompt = $@"Dựa vào các triệu chứng sau, hãy đề xuất chuyên khoa phù hợp:
Triệu chứng: {symptoms}

Hãy trả lời bằng tiếng Việt và bao gồm:
1. Chuyên khoa được đề xuất
2. Lý do đề xuất
3. Các xét nghiệm/chẩn đoán thường được thực hiện
4. Thời gian điều trị dự kiến";

                return await GetAIResponse(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error recommending specialty");
                return "Xin lỗi, tôi không thể đề xuất chuyên khoa vào lúc này.";
            }
        }

        public async Task<string> GetDoctorRecommendation(string specialty, string symptoms)
        {
            try
            {
                var prompt = $@"Dựa vào chuyên khoa và triệu chứng sau, hãy đưa ra khuyến nghị về bác sĩ:
Chuyên khoa: {specialty}
Triệu chứng: {symptoms}

Hãy trả lời bằng tiếng Việt và bao gồm:
1. Loại bác sĩ cần tìm
2. Các chuyên môn cần có
3. Kinh nghiệm cần thiết
4. Các câu hỏi nên hỏi bác sĩ";

                return await GetAIResponse(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting doctor recommendation");
                return "Xin lỗi, tôi không thể đưa ra khuyến nghị về bác sĩ vào lúc này.";
            }
        }

        private async Task<string> GetAIResponse(string prompt)
        {
            try
            {
                return _useGemini
                    ? await GetGeminiResponse(prompt)
                    : await GetOpenAIResponse(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting AI response");
                return "Xin lỗi, tôi không thể xử lý yêu cầu của bạn vào lúc này.";
            }
        }

        private async Task<string> GetOpenAIResponse(string prompt)
        {
            var request = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "system", content = "Bạn là một trợ lý y tế chuyên nghiệp, có kiến thức sâu rộng về y học và khả năng giao tiếp tốt." },
                    new { role = "user", content = prompt }
                },
                temperature = 0.7,
                max_tokens = 1000
            };

            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _openAiApiKey);
            
            var response = await _httpClient.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", request);
            
            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("OpenAI API error: {StatusCode}, {ErrorContent}", 
                    response.StatusCode, errorContent);
                throw new Exception($"OpenAI API error: {response.StatusCode}");
            }
            
            var content = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<dynamic>(content);
            
            if (result == null || result.choices == null || result.choices.Count == 0 || 
                result.choices[0] == null || result.choices[0].message == null)
            {
                _logger.LogError("Invalid response format from OpenAI API");
                throw new Exception("Invalid response format from OpenAI API");
            }
            
            return result.choices[0].message.content;
        }

        private async Task<string> GetGeminiResponse(string prompt)
        {
            try
            {
                // Gemini API URL với API key (sửa đường dẫn)
                string apiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={_geminiApiKey}";

                // Cấu trúc JSON request theo đúng định dạng mới của Gemini API
                var requestBody = new
                {
                    contents = new[]
                    {
                        new
                        {
                            parts = new[]
                            {
                                new
                                {
                                    text = $"Bạn là một trợ lý y tế chuyên nghiệp, có kiến thức sâu rộng về y học và khả năng giao tiếp tốt. {prompt}"
                                }
                            }
                        }
                    },
                    generationConfig = new
                    {
                        temperature = 0.7,
                        maxOutputTokens = 1000,
                        topP = 0.95,
                        topK = 40
                    }
                };

                _logger.LogInformation("Sending request to Gemini API: {ApiUrl}", apiUrl);
                
                var jsonContent = JsonConvert.SerializeObject(requestBody);
                _logger.LogInformation("Request body: {RequestBody}", jsonContent);
                
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(apiUrl, content);
                
                var responseString = await response.Content.ReadAsStringAsync();
                _logger.LogInformation("Gemini API response: {Response}", responseString);
                
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("Gemini API error: {StatusCode}, {ErrorContent}", 
                        response.StatusCode, responseString);
                    
                    // Fallback to a simpler response if the main API fails
                    return await GetSimpleGeminiResponse(prompt);
                }
                
                var geminiResponse = JsonConvert.DeserializeObject<dynamic>(responseString);

                if (geminiResponse == null)
                {
                    _logger.LogError("Invalid response format from Gemini API - null response");
                    return "Xin lỗi, tôi không thể xử lý yêu cầu của bạn vào lúc này.";
                }

                // Log full response structure to debug
                string serializedResponse = JsonConvert.SerializeObject(geminiResponse, Formatting.Indented);
                _logger.LogInformation("Deserialized response: {Response}", serializedResponse);

                // Extract text from the response with careful null checks
                if (geminiResponse.candidates != null && 
                    geminiResponse.candidates.Count > 0 && 
                    geminiResponse.candidates[0].content != null &&
                    geminiResponse.candidates[0].content.parts != null &&
                    geminiResponse.candidates[0].content.parts.Count > 0)
                {
                    return geminiResponse.candidates[0].content.parts[0].text;
                }
                
                _logger.LogError("Unable to extract text from Gemini API response");
                throw new Exception("Invalid response structure from Gemini API");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetGeminiResponse");
                
                // Try the alternate endpoint if the main one fails
                return await GetSimpleGeminiResponse(prompt);
            }
        }
        
        private async Task<string> GetSimpleGeminiResponse(string prompt)
        {
            try
            {
                // Sử dụng endpoint thay thế 
                string apiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={_geminiApiKey}";
                
                _logger.LogInformation("Trying alternate Gemini API endpoint: {ApiUrl}", apiUrl);
                
                var requestBody = new
                {
                    contents = new[]
                    {
                        new
                        {
                            parts = new[]
                            {
                                new
                                {
                                    text = prompt
                                }
                            }
                        }
                    }
                };
                
                var jsonContent = JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                
                var response = await _httpClient.PostAsync(apiUrl, content);
                var responseString = await response.Content.ReadAsStringAsync();
                
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("Simple Gemini API also failed: {StatusCode}, {ErrorContent}", 
                        response.StatusCode, responseString);
                    return "Xin lỗi, tôi không thể xử lý yêu cầu của bạn vào lúc này. Hệ thống AI đang bảo trì.";
                }
                
                var geminiResponse = JsonConvert.DeserializeObject<dynamic>(responseString);
                
                if (geminiResponse?.candidates != null && 
                    geminiResponse.candidates.Count > 0 && 
                    geminiResponse.candidates[0].content?.parts != null &&
                    geminiResponse.candidates[0].content.parts.Count > 0)
                {
                    return geminiResponse.candidates[0].content.parts[0].text;
                }
                
                return "Xin lỗi, tôi không thể xử lý yêu cầu của bạn vào lúc này. Hệ thống AI đang bảo trì.";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetSimpleGeminiResponse");
                return "Xin lỗi, tôi không thể xử lý yêu cầu của bạn vào lúc này. Hệ thống AI đang bảo trì.";
            }
        }
    }
} 