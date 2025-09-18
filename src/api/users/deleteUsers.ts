import api from "../axios";

export const deleteUsers = async(id: number) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
