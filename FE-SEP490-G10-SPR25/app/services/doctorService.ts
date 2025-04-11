const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const doctorService = {
  async getDoctorList(): Promise<IDoctor[]> {
    const res = await fetch(`${apiUrl}/api/Doctors`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();    
  },
  async getNumberOfDoctors(): Promise<number[]> {
    const res = await fetch(`${apiUrl}/odata/Doctors/$count`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();   
  },
  async getDoctorListByIdListAndSort(
    idList: string,
    sortBy: string
  ): Promise<IDoctor[]> {
    const sortOptions: Record<string, keyof IDoctor> = {
      most_exam: "numberOfExamination",
      most_service: "numberOfService",
    };
    const doctors = (await this.getDoctorList()).filter((d) =>
      idList.includes(d.doctorId.toString())
    );

    const sortKey = sortOptions[sortBy];
    if (sortKey) {
      return doctors.sort(
        (a, b) => (b[sortKey] as number) - (a[sortKey] as number)
      );
    }

    return doctors;
  },

  async getDoctorDetailById(
    doctorId: string | number
  ): Promise<IDoctorDetail> {
    const res = await fetch(`${apiUrl}/api/Doctors/${doctorId}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },

  async getDoctorListByFilterAndSort(
    specialties: string[],
    academicTitles: string[],
    degrees: string[],
    sortBy: string
  ): Promise<IDoctor[]> {
    const query = [];
    const sortOptions: { [key: string]: string } = {
      most_exam: "numberOfExamination",
      most_service: "numberOfService",
      academic_title: "academicTitle", 
    };
  
    const orderBy = sortOptions[sortBy] || "numberOfExamination";
  
    if (specialties.length > 0) {
      query.push(
        `specialtyNames/any(s: ${specialties
          .map((sp) => `s eq '${sp}'`)
          .join(" or ")})`
      );
    }
    if (academicTitles.length > 0) {
      query.push(
        `academicTitle in (${academicTitles.map((a) => `'${a}'`).join(",")})`
      );
    }
    if (degrees.length > 0) {
      query.push(`degree in (${degrees.map((d) => `'${d}'`).join(",")})`);
    }
  
    const res = await fetch(
      `${apiUrl}/api/Doctors?${
        query.length > 0 ? `$filter=${query.join(" or ")}&` : ""
      }${sortBy !== "academic_title" ? `$orderby=${orderBy} desc` : ""}`
    );
  
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
  
    const data = await res.json();
  
    if (sortBy === "academic_title") {
      const rank = {
        "GS.TS": 1,
        "GS": 2,
        "PGS.TS": 3,
        "PGS": 4,
        "TS": 5,
      };
  
      return data.sort(
        (a: IDoctor, b: IDoctor) =>
          (rank[a.academicTitle as keyof typeof rank] || 99) - (rank[b.academicTitle as keyof typeof rank] || 99)
      );
    }
  
    return data;
  }
  
};
