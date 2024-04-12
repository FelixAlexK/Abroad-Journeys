import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { login as loginCall } from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref([])
  const session_token = ref('')
  async function login(email: string, password: string) {
    const response = await loginCall(email, password)
    currentUser.value = response.data
  }

  const getSessionToken = computed(() => currentUser.value)
  return { currentUser, session_token, login, getSessionToken }
})

