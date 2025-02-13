export const doctorService = {
  async getDoctorList(): Promise<IDoctor[]> {
    const res = await fetch("http://localhost:5220/api/Doctors");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    console.log("fetch doctors");

    return res.json();
  },
  async getDoctorDetailById(doctorId: string | number): Promise<IDoctorDetail> {
    const res = await fetch(`http://localhost:5220/api/Doctors/${doctorId}`, {
      next: { revalidate: 5 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },
  async getDoctorListByFilter(
    specialties: string[],
    academicTitles: string[],
    degrees: string[]
  ): Promise<IDoctor[]> {
    let query = [];

    if ( specialties.length > 0) {
      query.push(
        `specialtyNames in (${specialties.map((s) => `'${s}'`).join(",")})`
      );
    }
    if (  academicTitles.length > 0) {
      query.push(
        `academicTitle in (${academicTitles.map((a) => `'${a}'`).join(",")})`
      );
    }
    if ( degrees.length > 0) {
      query.push(`degree in (${degrees.map((d) => `'${d}'`).join(",")})`);
    }

    const res = await fetch( `http://localhost:5220/api/Doctors${ query.length > 0 ? `?$filter=${query.join(" or ")}` : ""}`)
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },
};
