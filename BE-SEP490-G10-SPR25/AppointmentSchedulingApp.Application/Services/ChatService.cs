using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Net.Http.Json;
using Newtonsoft.Json;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using Microsoft.Extensions.Logging;
using AppointmentSchedulingApp.Infrastructure.Database;

namespace AppointmentSchedulingApp.Application.Services
{
    public class ChatService : IChatService
    {
        private readonly AppointmentSchedulingDbContext _context;
        private readonly IAIAgentService _aiAgent;
        private readonly ILogger<ChatService> _logger;

        public ChatService(AppointmentSchedulingDbContext context, IAIAgentService aiAgent, ILogger<ChatService> logger)
        {
            _context = context;
            _aiAgent = aiAgent;
            _logger = logger;
        }

        public async Task<ChatResponseDto> ProcessMessage(ChatMessageDto message)
        {
            try
            {
                // Phân tích câu hỏi bằng AI Agent
                var aiResponse = await _aiAgent.ProcessMedicalQuery(message.Message);
                
                // Tìm kiếm thông tin phù hợp trong cơ sở dữ liệu
                var searchResults = await SearchRelevantInformation(message.Message);
                
                // Kết hợp phản hồi AI và kết quả tìm kiếm
                var response = await GenerateResponse(aiResponse, searchResults);
                
                return new ChatResponseDto
                {
                    Message = response,
                    Source = "ai",
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing chat message");
                return new ChatResponseDto
                {
                    Message = "Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.",
                    Source = "error",
                    Timestamp = DateTime.UtcNow
                };
            }
        }

        private async Task<SearchResults> SearchRelevantInformation(string query)
        {
            var results = new SearchResults();

            try
            {
                // Tìm kiếm chuyên khoa phù hợp
                results.Specialties = await _context.Set<Specialty>()
                    .Where(s => s.SpecialtyName.Contains(query))
                    .ToListAsync();

                // Tìm kiếm dịch vụ y tế
                results.Services = await _context.Set<Service>()
                    .Where(s => s.ServiceName.Contains(query))
                    .ToListAsync();

                // Tìm kiếm bác sĩ phù hợp
                results.Doctors = await _context.Set<Doctor>()
                    .Where(d => d.Specialties.Any(s => s.SpecialtyName.Contains(query)))
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching relevant information");
            }

            return results;
        }

        private async Task<string> GenerateResponse(string aiResponse, SearchResults searchResults)
        {
            var prompt = $@"Dựa trên phân tích AI và kết quả tìm kiếm sau, hãy tạo một phản hồi tự nhiên và hữu ích:

Phân tích AI:
{aiResponse}

Kết quả tìm kiếm trong cơ sở dữ liệu:
- Chuyên khoa phù hợp: {JsonConvert.SerializeObject(searchResults.Specialties)}
- Dịch vụ y tế: {JsonConvert.SerializeObject(searchResults.Services)}
- Bác sĩ phù hợp: {JsonConvert.SerializeObject(searchResults.Doctors)}

Hãy tạo phản hồi bằng tiếng Việt, kết hợp thông tin từ cả hai nguồn một cách tự nhiên và hữu ích.";

            return await _aiAgent.ProcessMedicalQuery(prompt);
        }

        public async Task<ChatHistoryDto> GetChatHistory(string userId)
        {
            return new ChatHistoryDto
            {
                Messages = new List<ChatMessageDto>(),
                Responses = new List<ChatResponseDto>()
            };
        }
    }

    public class SearchResults
    {
        public List<Specialty> Specialties { get; set; } = new List<Specialty>();
        public List<Service> Services { get; set; } = new List<Service>();
        public List<Doctor> Doctors { get; set; } = new List<Doctor>();
    }
} 