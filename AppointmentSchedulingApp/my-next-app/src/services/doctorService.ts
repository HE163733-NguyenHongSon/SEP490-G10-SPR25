export const doctorService = {
  async getDoctorList(): Promise<IDoctor[]> {
    const res = await fetch("http://localhost:5220/api/Doctors");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    console.log("fetch doctors");

    return res.json();
  },
  async getDoctorDetailById(): Promise<IDoctor[]> {
    const res = await fetch("http://localhost:5220/api/Doctors");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    console.log("fetch doctors");

    return res.json();
  },
};
