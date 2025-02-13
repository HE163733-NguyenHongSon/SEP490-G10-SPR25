export const doctorService = {
  async getDoctorList(): Promise<IDoctor[]> {
    const res = await fetch("http://localhost:5220/api/Doctors");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    console.log("fetch doctors");

    return res.json();
  },
  async getDoctorDetailById(doctorId:string | number): Promise<IDoctorDetail> {
    const res = await fetch(`http://localhost:5220/api/Doctors/${doctorId}`, {
      next: { revalidate: 5   }, 
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  },
};
