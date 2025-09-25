import api from "../axios";

export const deleteRooms = async(id: number) => {
  try {
    const response = await api.delete(`/salas/${id}`);
    return response.data;
  } catch (error) {
    console.error(error)
    throw error;
  }
}
