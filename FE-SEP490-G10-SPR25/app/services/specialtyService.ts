const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const specialtyService = {
  async getSpecialtyList(): Promise<ISpecialty[]> {
    const res = await fetch(`${apiUrl}/Specialties`);
    console.log(res)
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  },
};
