
export const specialtyService = {
  async getSpecialtyList(): Promise<ISpecialty[]> {
    const res = await fetch("http://localhost:5220/api/Specialties");
    console.log(res)
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  },
};
