<template>
  <v-dialog
    v-model="isOpen"
    max-width="520"
    persistent
    class="create-user-dialog"
  >
    <v-card
      class="create-user-card"
      elevation="12"
    >
      <div class="dialog-header pa-6 pb-4">
        <div class="d-flex align-center">
          <v-avatar
            color="primary"
            size="48"
            class="mr-4"
          >
            <v-icon color="white" size="24"
              >mdi-account-plus</v-icon
            >
          </v-avatar>
          <div>
            <h2
              class="text-h5 font-weight-bold text-primary mb-1"
            >
              Novo Usuário
            </h2>
            <p
              class="text-body-2 text-medium-emphasis ma-0"
            >
              Preencha os dados para criar um novo
              usuário
            </p>
          </div>
        </div>
      </div>

      <v-divider class="mx-6" />

      <v-card-text class="pa-6">
        <v-form>
          <v-text-field
            v-model="name"
            :error-messages="errors.name"
            label="Nome completo"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            density="comfortable"
            class="mb-3"
          />

          <v-text-field
            v-model="email"
            :error-messages="errors.email"
            label="E-mail"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            density="comfortable"
            type="email"
            class="mb-3"
          />

          <v-select
            v-model="role"
            :error-messages="errors.role"
            label="Perfil"
            variant="outlined"
            prepend-inner-icon="mdi-shield-account"
            density="comfortable"
            :items="['Administrador', 'Usuário']"
            class="mb-3"
          />

          <v-text-field
            v-model="password"
            :error-messages="errors.password"
            label="Senha"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            density="comfortable"
            type="password"
            class="mb-3"
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
          :disabled="Object.keys(errors).length > 0"
          @click="saveUser"
        >
          <v-icon start size="18"
            >mdi-content-save</v-icon
          >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import { userSchema } from '@/utils/validationSchemas'

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:dialog',
  'save-user',
])

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: userSchema,
})

const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: role } = useField<string>('role')

const isOpen = computed({
  get: () => props.dialog,
  set: (values) => {
    emit('update:dialog', values)
    if (!values) resetForm()
  },
})

const saveUser = handleSubmit((values) => {
  emit('save-user', values)
  resetForm()
})
</script>

<style scoped>
.create-user-dialog {
  backdrop-filter: blur(4px);
}

.create-user-card {
  border-radius: 16px;
  overflow: hidden;
}

.dialog-header {
  background: linear-gradient(
    135deg,
    rgba(25, 118, 210, 0.05) 0%,
    rgba(25, 118, 210, 0.02) 100%
  );
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
</style>
