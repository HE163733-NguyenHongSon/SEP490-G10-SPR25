
interface IFeedback {
    feedbackId: number;
    reservationId: number;
    patientId: number;
    patientName: string;
    patientImage: string;
    serviceId: number;
    serviceName: string;
    doctorId: number;
    doctorName: string;
    serviceFeedbackContent: string;
    serviceFeedbackGrade: number;
    doctorFeedbackContent: string;
    doctorFeedbackGrade: number;
    feedbackDate: string; 
  }
  