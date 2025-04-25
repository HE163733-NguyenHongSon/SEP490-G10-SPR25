// utils/dateUtils.ts
export const formatAppointmentDate = (date: string): string => {
   
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };