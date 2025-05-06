
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const slotService = {
  
  async getSlotList(): Promise<ISlot[]> {
    try {
      const url = `${apiUrl}/api/Slots`;
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      
      if (!res.ok) {
        console.error(`Error response for Slot list: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching Slot list:', error);
      return []; // Return empty array instead of throwing
    }
  },
  async getSlotById(slotId?: string | number  ): Promise<ISlot> {
    try {
      const url = `${apiUrl}/api/Slots/${slotId}`;
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      
      if (!res.ok) {
        console.error(`Error response for slot detail: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching slot details for ID ${slotId}:`, error);
      throw error; // We might need to throw here as the UI likely needs this data
    }
  },

};
