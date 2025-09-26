<template>
  <v-container class="mt-15">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <div class="text-center">
          <v-img
            class="mx-auto mb-6"
            max-width="228"
            :src="logoCompleta"
          ></v-img>

          <v-card
            class="pa-12 pb-8"
            elevation="8"
            rounded="lg"
          >
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Email
            </div>

            <v-text-field
              v-model="email"
              density="compact"
              placeholder="Digite seu e-mail"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
            ></v-text-field>

            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Senha

              <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                Esqueceu a senha?</a
              >
            </div>

            <v-text-field
              v-model="password"
              :append-inner-icon="
                visible ? 'mdi-eye' : 'mdi-eye-off'
              "
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Digite sua senha"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              @keyup.enter="login"
            ></v-text-field>

            <v-btn
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              block
              :loading="loading"
              @click="login"
            >
              Entrar
            </v-btn>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <ErrorComponent
    v-model:isActive="errorDialog"
    :errorMessage="errorMessage"
    :status="errorStatus"
    :text="errorText"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { postLogin } from '@/api/auth/postLogin'
import ErrorComponent from '@/components/ErrorComponent.vue'
import logoCompleta from '@/assets/images/TekLogoCompleta.png'

const visible = ref(false)
const email = ref('')
const password = ref('')
const loading = ref(false)

// Estados do ErrorComponent
const errorDialog = ref(false)
const errorMessage = ref('')
const errorStatus = ref(0)
const errorText = ref('')

const router = useRouter()
const authStore = useAuthStore()

const showError = (error: any, operation: string) => {
  errorStatus.value = error.response?.status || 500
  errorMessage.value = error.response?.data?.message || error.message || 'Erro desconhecido'
  errorText.value = `Erro ao ${operation}`
  errorDialog.value = true
}

const login = async () => {
  loading.value = true
  try {
    const response = await postLogin({
      email: email.value,
      password: password.value
    })

    if (response.accessToken) {
      await authStore.login(response.accessToken)
      router.push({ name: 'home' })
    }
  } catch (error) {
    console.error('Erro no login:', error)
    showError(error, 'fazer login')
  } finally {
    loading.value = false
  }
}
</script>
