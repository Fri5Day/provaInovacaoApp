import api from '../axios'

export const deleteBookings = async (id: number) => {
  try {
    const response = await api.delete(`reservas/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
