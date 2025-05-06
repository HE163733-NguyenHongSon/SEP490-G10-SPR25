interface IBookingSuggestion {
  patientId:string;
  symptoms?: string;
  specialty:Partial<ISpecialty>;
  service: Partial<IService>;
  availableSchedules: IAvailableSchedule[];
}
   