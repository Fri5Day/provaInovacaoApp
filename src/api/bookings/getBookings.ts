import api from '../axios'

export const getBookings = async () => {
  try {
    const response = await api.get('/reservas')
    return response.data
  } catch (error) {
    console.error('Error fetching bookings:', error)
    throw error
  }
}
