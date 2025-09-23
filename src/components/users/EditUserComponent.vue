<template>
  <v-container class="mt-15">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-dialog
          v-model="isOpen"
          max-width="600px"
          persistent
        >
          <v-card class="pa-4">
            <v-form @submit.prevent="submit">
              <v-card-title
                >Editar Usuário</v-card-title
              >
              <v-text-field
                v-model="nameModel"
                :error-messages="errors.name"
                label="Nome completo"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                density="comfortable"
                class="mb-3"
              />

              <v-text-field
                v-model="emailModel"
                :error-messages="errors.email"
                label="E-mail"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                density="comfortable"
                type="email"
                class="mb-3"
              />

              <v-select
                v-model="roleModel"
                :error-messages="errors.role"
                label="Perfil"
                variant="outlined"
                prepend-inner-icon="mdi-shield-account"
                density="comfortable"
                :items="[
                  'Administrador',
                  'Usuário',
                ]"
                class="mb-3"
              />

              <v-text-field
                v-model="passwordModel"
                :error-messages="errors.password"
                label="Senha"
                variant="outlined"
                prepend-inner-icon="mdi-lock"
                density="comfortable"
                type="password"
                class="mb-3"
              />

              <v-card-actions>
                <v-btn
                  color="primary"
                  type="submit"
                  :disabled="
                    Object.keys(errors).length > 0
                  "
                  >Salvar</v-btn
                >

                <v-btn
                  color="error"
                  @click="isOpen = false"
                  >Fechar</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  dialog: boolean
  name: string
  email: string
  password: string
  role: string
  errors: { [key: string]: string[] }
}>()

const emit = defineEmits([
  'update:dialog',
  'update:name',
  'update:email',
  'update:password',
  'update:role',
  'submit',
])

const isOpen = computed({
  get: () => props.dialog,
  set: (value) => emit('update:dialog', value),
})

const nameModel = computed({
  get: () => props.name,
  set: (value) => emit('update:name', value),
})

const emailModel = computed({
  get: () => props.email,
  set: (value) => emit('update:email', value),
})

const passwordModel = computed({
  get: () => props.password,
  set: (value) => emit('update:password', value),
})

const roleModel = computed({
  get: () => props.role,
  set: (value) => emit('update:role', value),
})

const submit = () => {
  emit('submit', {
    name: props.name,
    email: props.email,
    password: props.password,
    role: props.role,
  })
}
</script>
