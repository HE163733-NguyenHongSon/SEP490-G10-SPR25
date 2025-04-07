// export const receptionistService = {
//   async getPatientList(): Promise<IPatient[]> {
//     const res = await fetch(
//       "http://localhost:5220/api/Patients"
//     );
//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }

//     return res.json();
//   },


//   async getPatientDetailById(patientId: string | number): Promise<IPatient> {
//     const res = await fetch(`http://localhost:5220/api/Patients/${patientId}`);
//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }

//     return res.json();
//   },
  
// };
