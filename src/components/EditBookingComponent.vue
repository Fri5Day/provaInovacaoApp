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
          <v-avatar color="info" size="48" class="mr-4">
            <v-icon color="white" size="24">mdi-calendar-edit</v-icon>
          </v-avatar>
          <div>
            <h2 class="text-h5 font-weight-bold text-info mb-1">
              Editar Reserva
            </h2>
            <p class="text-body-2 text-medium-emphasis ma-0">
              Atualize os dados da reserva
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
            v-model="firstnameModel"
            :error-messages="errors.name"
            label="Primeiro Nome"
            variant="outlined"
            prepend-inner-icon="mdi-text"
            density="comfortable"
            class="mb-3"
            hide-details="auto"
          />

          <v-text-field
            v-model="lastnameModel"
            :error-messages="errors.dateInit"
            label="Sobrenome"
            variant="outlined"
            prepend-inner-icon="mdi-text"
            density="comfortable"
            class="mb-3"
            hide-details="auto"
          />

          <v-text-field
            v-model="checkinModel"
            :error-messages="errors.dateEnd"
            label="Checkin"
            variant="outlined"
            prepend-inner-icon="mdi-calendar-start"
            density="comfortable"
            type="date"
            class="mb-3"
            hide-details="auto"
          />

          <v-text-field
            v-model="checkoutModel"
            :error-messages="errors.dateEnd"
            label="Checkout"
            variant="outlined"
            prepend-inner-icon="mdi-calendar-end"
            density="comfortable"
            type="date"
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
  firstname: string
  lastname: string
  checkin: string
  checkout: string

  errors: { [key: string]: string[] }
}>()

const emit = defineEmits([
  'update:dialog',
  'update:firstname',
  'update:lastname',
  'update:checkin',
  'update:checkout',
  'submit',
])

const isOpen = computed({
  get: () => props.dialog,
  set: (value) => emit('update:dialog', value),
})

const firstnameModel = computed({
  get: () => props.firstname,
  set: (value) => emit('update:firstname', value),
})

const lastnameModel = computed({
  get: () => props.lastname,
  set: (value) => emit('update:lastname', value),
})

const checkinModel = computed({
  get: () => props.checkin,
  set: (value) => emit('update:checkin', value),
})

const checkoutModel = computed({
  get: () => props.checkout,
  set: (value) => emit('update:checkout', value),
})

const submit = () => {
  emit('submit', {
    firstname: props.firstname,
    lastname: props.lastname,
    checkin: props.checkin,
    checkout: props.checkout
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
