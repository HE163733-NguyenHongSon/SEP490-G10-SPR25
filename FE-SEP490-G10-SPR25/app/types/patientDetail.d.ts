interface IPatientDetail extends IPatient {
    citizenId: number;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    avatarUrl:string;
    guardianId : number;
    guardianName: string;
    guardianPhone: string;
    guardianEmail: string;
  }