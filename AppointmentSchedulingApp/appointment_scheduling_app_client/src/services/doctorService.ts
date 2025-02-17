export const doctorService = {
  async getDoctorList(): Promise<IDoctor[]> {
    const res = await fetch("http://localhost:5220/api/Doctors");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    // console.log("fetch doctors");

    return res.json();
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
    console.log(query);
    const res = await fetch(
      `http://localhost:5220/api/Doctors?${
        query.length > 0 ? `$filter=${query.join(" or ")}&` : ""
      }$orderby=${
        sortBy === "most_exp"
          ? "experienceYear"
          : sortBy === "most_exam"
          ? "numberOfExamination"
          : "rating"
      } desc`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },
};
