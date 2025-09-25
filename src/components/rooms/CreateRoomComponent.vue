<template>
  <v-dialog
    v-model="isOpen"
    max-width="520"
    persistent
  >
    <v-card elevation="12">
      <div class="dialog-header pa-6 pb-4">
        <div class="d-flex align-center">
          <v-avatar color="success" size="48" class="mr-4">
            <v-icon color="white" size="24">mdi-home-plus</v-icon>
          </v-avatar>
          <div>
            <h2
              class="text-h5 font-weight-bold text-success mb-1"
            >
              Nova Sala
            </h2>
            <p
              class="text-body-2 text-medium-emphasis ma-0"
            >
              Preencha os dados para criar uma nova sala
            </p>
          </div>
        </div>
      </div>

      <v-divider class="mx-6" />

      <v-card-text class="pa-6">
        <v-form
          class="form-container"
          @submit.prevent="submit"
        >
          <v-text-field
            v-model="name"
            :error-messages="errors.name"
            label="Nome da Sala"
            variant="outlined"
            prepend-inner-icon="mdi-home-variant"
            density="comfortable"
            class="mb-3"
            hide-details="auto"
          />

          <v-text-field
            v-model="size"
            :error-messages="errors.size"
            label="Capacidade (pessoas)"
            variant="outlined"
            prepend-inner-icon="mdi-account-group"
            density="comfortable"
            type="number"
            min="1"
            class="mb-3"
            hide-details="auto"
          />

          <v-textarea
            v-model="note"
            :error-messages="errors.note"
            label="Observações"
            variant="outlined"
            prepend-inner-icon="mdi-note-text"
            density="comfortable"
            rows="3"
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
          color="success"
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
import { useField, useForm } from 'vee-validate'
import { roomSchema } from '@/utils/validationSchemas'

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:dialog', 'save-room'])

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: roomSchema,
})

const { value: name } = useField('name')
const { value: size } = useField('size')
const { value: note } = useField('note')

const isOpen = computed({
  get: () => props.dialog,
  set: (values) => {
    emit('update:dialog', values)
    if (!values) {
      resetForm()
    }
  },
})

const submit = handleSubmit((values) => {
  emit('save-room', values)
  resetForm()
})
</script>

<style scoped>
.dialog-header {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.form-container {
  max-width: 100%;
}

.v-text-field,
.v-select,
.v-textarea {
  transition: all 0.3s ease;
}

.v-text-field:hover,
.v-select:hover,
.v-textarea:hover {
  transform: translateY(-1px);
}
</style>
