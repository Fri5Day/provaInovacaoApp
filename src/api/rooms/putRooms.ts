import api from '../axios'
import type { CreateRoomsInterface } from '@/interface/rooms/createRoomsInterface'

export const putRooms = async (
  id: number,
  data: CreateRoomsInterface,
) => {
  try {
    const response = await api.put(`/salas/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating room:', error)
    throw error
  }
}
