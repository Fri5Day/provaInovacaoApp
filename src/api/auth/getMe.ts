import api from '../axios'

export const getMe = async () => {
  try {
    const response = await api.get('/me')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error)
    throw error
  }
}