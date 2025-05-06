
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const roomService = {
  
  async getRoomList(): Promise<IRoom[]> {
    try {
      const url = `${apiUrl}/api/Rooms`;
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      
      if (!res.ok) {
        console.error(`Error response for Room list: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching Room list:', error);
      return []; // Return empty array instead of throwing
    }
  },
  async getRoomById(roomId?: string | number  ): Promise<IRoom> {
    try {
      const url = `${apiUrl}/api/Rooms/${roomId}`;
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      
      if (!res.ok) {
        console.error(`Error response for room detail: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching room details for ID ${roomId}:`, error);
      throw error; // We might need to throw here as the UI likely needs this data
    }
  },

};
