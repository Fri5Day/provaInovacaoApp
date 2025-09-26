import api from '../axios'
import type { CreateUserInterface } from '@/interface/users/createUsersInterface'

export const putUsers = async (
  id: number,
  data: CreateUserInterface,
) => {
  try {
    const response = await api.patch(`/user/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}
