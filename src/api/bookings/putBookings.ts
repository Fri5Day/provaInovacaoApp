import api from '../axios'
import type { CreateBookingsInterface } from '@/interface/bookings/createBookingsInterface'

export const putBookings = async (
  id: number,
  data: CreateBookingsInterface,
) => {
  try {
    const response = await api.put(`reservas/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating booking:', error)
    throw error
  }
}
