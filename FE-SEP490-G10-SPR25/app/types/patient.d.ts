interface IPatient extends IUser {
    mainCondition: string;
    rank: string;
    guardianId: number;
    guardianName: string;
    guardianPhone: string;
    guardianEmail: string;
    reservationId: number;
    appointmentDate: string;
    symptoms: string;
    diagnosis: string;
    treatmentPlan: string;
    followUpDate: string;
    notes: string;
}