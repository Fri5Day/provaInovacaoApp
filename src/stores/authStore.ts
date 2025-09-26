import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const token = ref<string | null>(null)
  const user = ref<any>(null)

  const initAuth = async () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      isAuthenticated.value = true
    }
  }

  const login = async (authToken: string) => {
    token.value = authToken
    isAuthenticated.value = true
    localStorage.setItem('token', authToken)
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
