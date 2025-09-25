import api from "../axios";

export const getRooms = async () => {
  try {
    const response = await api.get('/salas');
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
}
