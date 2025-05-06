
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export const specialtyService = {
  async getNumberOfSpecialties(): Promise<number> {
    try {
      const url = `${apiUrl}/odata/Specialties/$count`;
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        cache: 'no-store'
      });
      
      
      if (!res.ok) {
        console.error(`Error response for specialty count: ${res.statusText}`);
        throw new Error(`Error: ${res.status}`);
      }
      
      const count = await res.json();
      return count;
    } catch (error) {
      console.error('Error getting number of specialties:', error);
      return 0; // Return 0 instead of throwing error
    }
  },
  
  async getSpecialtyList(): Promise<ISpecialty[]> {
    try {
      const url = `${apiUrl}/api/Specialties`;
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      
      if (!res.ok) {
        console.error(`Error response for specialty list: ${res.statusText}`);
        throw new Error(`Error: ${res.status}`);
      }
      
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching specialty list:', error);
      return []; // Return empty array instead of throwing error
    }
  }
};
