import api from '../axios'
import type { CreateBookingsInterface } from '@/interface/bookings/createBookingsInterface'

export const postBookings = async (
  data: CreateBookingsInterface,
) => {
  try {
    const response = await api.post('/reservas', data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
