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
          <v-avatar color="success" size="48" class="mr-4">
            <v-icon color="white" size="24">mdi-home-edit</v-icon>
          </v-avatar>
          <div>
            <h2 class="text-h5 font-weight-bold text-success mb-1">
              Editar Sala
            </h2>
            <p class="text-body-2 text-medium-emphasis ma-0">
              Atualize os dados da sala
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
            v-model="nameModel"
            :error-messages="errors.name"
            label="Nome da Sala"
            variant="outlined"
            prepend-inner-icon="mdi-home-variant"
            density="comfortable"
            class="mb-3"
            hide-details="auto"
          />

          <v-text-field
            v-model="sizeModel"
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
            v-model="noteModel"
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

const props = defineProps<{
  dialog: boolean
  name: string
  size: number
  note: string
  errors: { [key: string]: string[] }
}>()

const emit = defineEmits([
  'update:dialog',
  'update:name',
  'update:size',
  'update:note',
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

const sizeModel = computed({
  get: () => props.size,
  set: (value) => emit('update:size', value),
})

const noteModel = computed({
  get: () => props.note,
  set: (value) => emit('update:note', value),
})

const submit = () => {
  emit('submit', {
    name: props.name,
    size: props.size,
    note: props.note,
  })
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
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.05) 0%,
    rgba(76, 175, 80, 0.02) 100%
  );
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
