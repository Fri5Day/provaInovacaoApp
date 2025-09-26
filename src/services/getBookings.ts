import api from './api'

export const getBookings = async () => {
  try {
    const response = await api.get('/booking')
    return response.data
  } catch (error) {
    console.error('Error fetching bookings:', error)
    throw error
  }
}
