
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const slotService = {
  
  async getSlotList(): Promise<ISlot[]> {
    try {
      const url = `${apiUrl}/api/Slots`;
      console.log('Fetching Slot list from:', url);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      console.log('Slot list response status:', res.status);
      
      if (!res.ok) {
        console.error(`Error response for Slot list: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(`Retrieved ${data.length} Slot`);
      return data;
    } catch (error) {
      console.error('Error fetching Slot list:', error);
      return []; // Return empty array instead of throwing
    }
  },
  async getSlotById(slotId?: string | number  ): Promise<ISlot> {
    try {
      const url = `${apiUrl}/api/Slots/${slotId}`;
      console.log(`Fetching slot detail from: ${url}`);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      console.log(`Slot detail response status: ${res.status}`);
      
      if (!res.ok) {
        console.error(`Error response for slot detail: ${res.statusText}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(`Retrieved details for slot ID: ${slotId}`);
      return data;
    } catch (error) {
      console.error(`Error fetching slot details for ID ${slotId}:`, error);
      throw error; // We might need to throw here as the UI likely needs this data
    }
  },

};
