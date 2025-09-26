import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMe } from '@/api/auth/getMe'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const token = ref<string | null>(null)
  const user = ref<any>(null)

  const initAuth = async () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      isAuthenticated.value = true

      if (!user.value) {
        try {
          user.value = await getMe()
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error)
          logout()
        }
      }
    }
  }

  const login = async (authToken: string) => {
    token.value = authToken
    isAuthenticated.value = true
    localStorage.setItem('token', authToken)

    try {
      user.value = await getMe()
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error)
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
  }

  return {
    isAuthenticated,
    token,
    user,
    initAuth,
    login,
    logout
  }
})
