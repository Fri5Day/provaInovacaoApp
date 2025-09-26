import api from './api'
import type { AuthInterface } from '../interface/authInterface'

export const postLogin = async (data: AuthInterface) => {
  try {
    const response = await api.post('/login', data)
    return response.data
  } catch (error) {
    console.error('Ocorreu uma falaha durante o login', error)
    throw error
  }
}
