export const doctorService = {
  async getDoctorList(): Promise<IDoctor[]> {
    const res = await fetch(
      "http://localhost:5220/api/Doctors"
    );
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
      most_exp: "experienceYear",
      most_exam: "numberOfExamination",
      most_service: "numberOfService",
    };
    const doctors = (await this.getDoctorList()).filter((d) =>
      idList.includes(d.doctorId.toString())
    );

    const sortKey = sortOptions[sortBy];
    if (sortKey) {
      return doctors.sort(
        (a, b) => (b[sortKey] as number ) - (a[sortKey] as number)
      );
    }

    return doctors;
  },

  async getDoctorDetailById(doctorId: string | number): Promise<IDoctorDetail> {
    const res = await fetch(`http://localhost:5220/api/Doctors/${doctorId}`);
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
      most_exp: "experienceYear",
      most_exam: "numberOfExamination",
      most_service: "numberOfService",
    };
    const orderBy = sortOptions[sortBy] || "rating";

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
      `http://localhost:5220/api/Doctors?${
        query.length > 0 ? `$filter=${query.join(" or ")}&` : ""
      }$orderby=${orderBy} desc`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },
};
