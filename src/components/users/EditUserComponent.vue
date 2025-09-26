<template>
  <v-dialog
    v-model="isOpen"
    max-width="520"
    persistent
    class="edit-user-dialog"
  >
    <v-card class="edit-user-card" elevation="12">
      <div class="dialog-header pa-6 pb-4">
        <div class="d-flex align-center">
          <v-avatar color="primary" size="48" class="mr-4">
            <v-icon color="white" size="24">mdi-account-edit</v-icon>
          </v-avatar>
          <div>
            <h2 class="text-h5 font-weight-bold text-primary mb-1">
              Editar Usuário
            </h2>
            <p class="text-body-2 text-medium-emphasis ma-0">
              Atualize os dados do usuário
            </p>
          </div>
        </div>
      </div>

      <v-divider class="mx-6" />

      <v-card-text class="pa-6">
        <v-form class="form-container" @submit.prevent="submit">
          <v-text-field
            v-model="nameModel"
            :error-messages="errors.name"
            label="Nome completo"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            density="comfortable"
            class="mb-3"
            hide-details="auto"
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
            hide-details="auto"
          />

          <v-select
            v-model="roleModel"
            :error-messages="errors.role"
            label="Perfil"
            variant="outlined"
            prepend-inner-icon="mdi-shield-account"
            density="comfortable"
            :items="['Administrador', 'Usuário']"
            class="mb-3"
            hide-details="auto"
          />

          <v-text-field
            v-model="passwordModel"
            :error-messages="errors.password"
            label="Nova Senha (opcional)"
            placeholder="Deixe em branco para manter a senha atual"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            density="comfortable"
            type="password"
            class="mb-3"
            hide-details="auto"
          />

        </v-form>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn
          variant="outlined"
          color="grey"
          class="mr-3"
          @click="isOpen = false"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          class="px-6"
          type="submit"
          :disabled="Object.keys(errors).length > 0"
          @click="submit"
        >
          <v-icon start size="18">mdi-content-save</v-icon>
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
  const userData: any = {
    name: props.name,
    email: props.email,
    role: props.role,
  }
  
  // Só inclui senha se foi preenchida
  if (props.password && props.password.trim() !== '') {
    userData.password = props.password
  }
  
  emit('submit', userData)
}
</script>

<style scoped>
.edit-user-dialog {
  backdrop-filter: blur(4px);
}

.edit-user-card {
  border-radius: 16px;
  overflow: hidden;
}

.dialog-header {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.form-container {
  max-width: 100%;
}

.v-text-field, .v-select {
  transition: all 0.3s ease;
}

.v-text-field:hover, .v-select:hover {
  transform: translateY(-1px);
}

</style>
