export const receptionistService = {
    async getPatientList(): Promise<IPatient[]> {
      const res = await fetch(
        "http://localhost:5220/api/Patients"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      return res.json();
    },
  
    // async getPatientListByIdListAndSort(
    //   idList: string,
    //   sortBy: string
    // ): Promise<IPatient[]> {
    //   const sortOptions: Record<string, keyof IPatient> = {
    //     most_patientId: "patientId", // can phai sua doan nay
    //   };
    //   const patients = (await this.getPatientList()).filter((p) =>
    //     idList.includes(p.patientId.toString())
    //   );
    //   const sortKey = sortOptions[sortBy];
    //   if (sortKey) {
    //     return patients.sort(
    //       (a, b) => (b[sortKey] as number ) - (a[sortKey] as number)
    //     );
    //   }
  
    //   return patients;
    // },
  
    async getPatientDetailById(patientId: string | number): Promise<IDoctorDetail> {
      const res = await fetch(`http://localhost:5220/api/Patients/${patientId}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      return res.json();
    },
    // async getPatientListByFilterAndSort(
    //   specialties: string[],
    //   academicTitles: string[],
    //   degrees: string[],
    //   sortBy: string
    // ): Promise<IPatient[]> {
    //   const query = [];
    //   const sortOptions: { [key: string]: string } = {
    //     most_patientId: "patientId", // can phai sua doan nay
    //   };
    //   const orderBy = sortOptions[sortBy] || "rating";
  
    //   if (specialties.length > 0) {
    //     query.push(
    //       `specialtyNames/any(s: ${specialties
    //         .map((sp) => `s eq '${sp}'`)
    //         .join(" or ")})`
    //     );
    //   }
    //   if (academicTitles.length > 0) {
    //     query.push(
    //       `academicTitle in (${academicTitles.map((a) => `'${a}'`).join(",")})`
    //     );
    //   }
    //   if (degrees.length > 0) {
    //     query.push(`degree in (${degrees.map((d) => `'${d}'`).join(",")})`);
    //   }
  
    //   const res = await fetch(
    //     `http://localhost:5220/api/Doctors?${
    //       query.length > 0 ? `$filter=${query.join(" or ")}&` : ""
    //     }$orderby=${orderBy} desc`
    //   );
    //   if (!res.ok) {
    //     throw new Error(`HTTP error! Status: ${res.status}`);
    //   }
  
    //   return res.json();
    // },
  };
  