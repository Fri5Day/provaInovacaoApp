import api from '../axios'
import type { CreateRoomsInterface } from '@/interface/rooms/createRoomsInterface'

export const postRooms = async (
  data: CreateRoomsInterface,
) => {
  try {
    const response = await api.post('/salas', data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
