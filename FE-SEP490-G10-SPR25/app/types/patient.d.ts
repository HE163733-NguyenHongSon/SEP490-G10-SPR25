interface IPatient extends IUser {
    mainCondition: string;
    rank: string;
    guardianId: number;
    guardianName: string;
    guardianPhone: string;
    guardianEmail: string;
}