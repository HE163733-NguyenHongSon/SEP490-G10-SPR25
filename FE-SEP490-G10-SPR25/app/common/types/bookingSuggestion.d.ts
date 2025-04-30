interface IBookingSuggestion {
  symptoms?: string;
  specialty:Partial<ISpecialty>;
  service: Partial<IService>;
  availableSchedules: IAvailableSchedule[];
}
   