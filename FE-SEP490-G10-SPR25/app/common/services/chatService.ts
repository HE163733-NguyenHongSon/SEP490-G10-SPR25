import axios from 'axios';

interface ChatMessage {
  userId?: string;
  message: string;
  timestamp?: Date;
}

interface ChatResponse {
  message: string;
  source: string;
  timestamp: Date;
}

// Tạo các phản hồi dự phòng khi backend gặp sự cố
const fallbackResponses = [
  {
    question: "đau bụng",
    response: "Đau bụng có thể do nhiều nguyên nhân như tiêu hóa, dạ dày, ruột thừa, hoặc căng thẳng. Nếu đau nhiều, kéo dài hoặc kèm triệu chứng khác, bạn nên khám chuyên khoa Tiêu hóa hoặc Nội khoa."
  },
  {
    question: "đặt lịch",
    response: "Để đặt lịch khám, bạn có thể sử dụng tính năng đặt lịch trên trang web của chúng tôi, gọi số hotline 1900-xxxx, hoặc đến trực tiếp phòng khám để được hỗ trợ."
  },
  {
    question: "giờ làm việc",
    response: "Phòng khám hoạt động từ 7:30 đến 20:00 các ngày trong tuần, và từ 8:00 đến 17:00 vào cuối tuần và ngày lễ."
  },
  {
    question: "bác sĩ",
    response: "Chúng tôi có đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm. Để tìm hiểu thêm về từng bác sĩ, bạn có thể xem trang 'Đội ngũ bác sĩ' trên website của chúng tôi."
  },
  {
    question: "khám",
    response: "Để khám bệnh, bạn cần đặt lịch trước qua website, gọi điện, hoặc đến trực tiếp. Bạn nên chuẩn bị sẵn thông tin cá nhân, bảo hiểm y tế (nếu có), và các giấy tờ liên quan đến bệnh lý nếu đã từng khám ở nơi khác."
  },
  {
    question: "chi phí",
    response: "Chi phí khám và điều trị phụ thuộc vào chuyên khoa và dịch vụ bạn sử dụng. Bạn có thể tham khảo bảng giá trên website hoặc liên hệ với bộ phận chăm sóc khách hàng theo số 1900-xxxx để được tư vấn chi tiết."
  },
  {
    question: "bảo hiểm",
    response: "Phòng khám của chúng tôi có liên kết với nhiều công ty bảo hiểm. Vui lòng mang theo thẻ bảo hiểm khi đến khám để được hưởng quyền lợi tối đa. Để biết cụ thể về các đối tác bảo hiểm, vui lòng liên hệ với chúng tôi qua hotline 1900-xxxx."
  },
  {
    question: "kết quả",
    response: "Kết quả xét nghiệm thường được trả sau 1-2 ngày làm việc tùy loại xét nghiệm. Bạn có thể nhận kết quả trực tiếp tại phòng khám hoặc xem trực tuyến thông qua tài khoản cá nhân trên website của chúng tôi."
  },
  {
    question: "gãy",
    response: "Gãy xương cần được xử lý cấp cứu tại khoa Chấn thương chỉnh hình. Bạn nên giữ cố định vùng gãy, không tự chỉnh sửa và đến cơ sở y tế gần nhất càng sớm càng tốt. Bác sĩ sẽ chụp X-quang và đưa ra phương pháp điều trị phù hợp."
  },
  {
    question: "chân",
    response: "Các vấn đề về chân có thể liên quan đến nhiều chuyên khoa như Chấn thương chỉnh hình (gãy xương, chấn thương), Nội thần kinh (tê bì, đau nhức), hoặc Tim mạch (sưng phù chân). Bạn nên mô tả chi tiết triệu chứng để được tư vấn phù hợp."
  }
];

// Triển khai mẫu tìm kiếm thông minh để khớp với câu hỏi
const findBestMatch = (message: string): string | null => {
  const lowercaseMessage = message.toLowerCase();
  
  // Tìm kiếm chính xác trước
  const exactMatch = fallbackResponses.find(item => 
    lowercaseMessage.includes(item.question)
  );
  
  if (exactMatch) return exactMatch.response;
  
  // Tìm kiếm từ khóa liên quan nếu không có kết quả chính xác
  const keywords: {[key: string]: string[]} = {
    "đau bụng": ["đau dạ dày", "đau bụng dưới", "đau bụng trên", "đau ruột"],
    "đặt lịch": ["hẹn khám", "đăng ký khám", "lịch khám", "book lịch"],
    "giờ làm việc": ["mở cửa", "đóng cửa", "thời gian làm việc", "lịch làm việc"],
    "bác sĩ": ["chuyên gia", "bác sỹ", "bs", "doctor"],
    "khám": ["thăm khám", "chẩn đoán", "tư vấn"],
    "chi phí": ["giá", "phí", "tiền", "thanh toán"],
    "bảo hiểm": ["bhyt", "bảo hiểm y tế", "bảo hiểm sức khỏe"],
    "kết quả": ["xét nghiệm", "chẩn đoán", "kiểm tra", "phân tích"],
    "chân": ["cẳng chân", "mắt cá", "đau chân", "tê chân", "bàn chân", "khớp gối"],
    "gãy": ["gãy xương", "trật khớp", "bong gân", "nứt xương", "vỡ xương"]
  };
  
  for (const [category, relatedWords] of Object.entries(keywords)) {
    for (const word of relatedWords) {
      if (lowercaseMessage.includes(word)) {
        const response = fallbackResponses.find(item => item.question === category);
        if (response) return response.response;
      }
    }
  }
  
  return null;
};

export const chatService = {
  sendMessage: async (message: string): Promise<ChatResponse> => {
    try {
      // Thử gửi yêu cầu với timeout hợp lý
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 giây
      
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Chat/send`, {
        message,
        userId: 'guest', // For anonymous users
        timestamp: new Date()
      }, { signal: controller.signal });
      
      clearTimeout(timeoutId);
      return response.data;
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Hiển thị thông tin chi tiết về lỗi để debug
      if (error.response) {
        // Lỗi từ server với response
        console.error('Error response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      } else if (error.request) {
        // Lỗi không có response từ server
        console.error('Error request:', error.request);
      } else {
        // Lỗi khác
        console.error('Error message:', error.message);
      }
      
      // Check if it's an abort error (timeout)
      if (error.name === 'AbortError' || error.name === 'CanceledError') {
        return {
          message: "Xin lỗi, yêu cầu mất quá nhiều thời gian để xử lý. Vui lòng thử lại sau.",
          source: "timeout",
          timestamp: new Date()
        };
      }
      
      // Tìm phản hồi dự phòng phù hợp nhất
      const fallbackResponse = findBestMatch(message);
      
      if (fallbackResponse) {
        return {
          message: fallbackResponse + "\n\n(Phản hồi này được tạo khi không kết nối được đến máy chủ. Vui lòng thử lại sau để có thông tin chính xác nhất.)",
          source: "fallback",
          timestamp: new Date()
        };
      }
      
      // Sử dụng trường hợp dự phòng tổng quát nếu không tìm thấy match
      const generalResponse = "Xin lỗi, hệ thống AI hiện đang được bảo trì. Bạn có thể:\n\n" +
        "• Liên hệ trực tiếp qua hotline: 1900-xxxx\n" +
        "• Gửi email đến support@phongkham.com\n" + 
        "• Truy cập mục FAQ trên website\n" +
        "• Đặt lịch trực tiếp tại 'Đặt lịch khám' trên menu chính";
      
      return {
        message: generalResponse,
        source: "error",
        timestamp: new Date()
      };
    }
  },

  getChatHistory: async (userId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Chat/history?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting chat history:', error);
      return { messages: [], responses: [] };
    }
  }
}; 