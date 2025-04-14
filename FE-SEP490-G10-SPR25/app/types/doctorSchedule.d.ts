export interface IDoctorSchedule {
    doctorScheduleId: number;
    doctorId: number;
    doctorName: string;
  
    serviceId: number;
    serviceName: string;
  
    dayOfWeek: string;
  
    roomId: number;
    roomName: string;
  
    slotId: number;
    slotStartTime: string; 
    slotEndTime: string;   
  }
  