const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
export const specialtyService = {
  async getNumberOfSpecialties(): Promise<number> {
    const res = await fetch(`${apiUrl}/odata/Specialties/$count`);
    console.log(res)
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  },
  async getSpecialtyList(): Promise<ISpecialty[]> {
    const res = await fetch(`${apiUrl}/api/Specialties`);
    console.log(res)
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  }
};
