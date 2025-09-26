<template>
  <v-dialog v-model="isOpen" max-width="520" persistent>
    <v-card elevation="12">
      <div class="dialog-header pa-6 pb-4">
        <div class="d-flex align-center">
          <v-avatar
            color="info"
            size="48"
            class="mr-4"
          >
            <v-icon color="white" size="24"
              >mdi-calendar-plus</v-icon
            >
          </v-avatar>
          <div>
            <h2
              class="text-h5 font-weight-bold text-info mb-1"
            >
              Nova Reserva
            </h2>
            <p
              class="text-body-2 text-medium-emphasis ma-0"
            >
              Preencha os dados para criar uma nova reserva
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
            label="Título da Reserva"
            variant="outlined"
            prepend-inner-icon="mdi-text"
            density="comfortable"
            class="mb-3"
            hide-details="auto"
          />

          <v-autocomplete
            v-model="room_id"
            :error-messages="errors.room_id"
            label="Selecione a Sala"
            variant="outlined"
            prepend-inner-icon="mdi-home-variant"
            density="comfortable"
            :items="rooms"
            item-title="name"
            item-value="id"
            class="mb-3"
            hide-details="auto"
          />

          <v-text-field
            v-model="dateInit"
            :error-messages="errors.dateInit"
            label="Data e Hora Inicial"
            variant="outlined"
            prepend-inner-icon="mdi-calendar-start"
            density="comfortable"
            type="datetime-local"
            class="mb-3"
            hide-details="auto"
          />

          <v-text-field
            v-model="dateEnd"
            :error-messages="errors.dateEnd"
            label="Data e Hora Final"
            variant="outlined"
            prepend-inner-icon="mdi-calendar-end"
            density="comfortable"
            type="datetime-local"
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
          color="info"
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
import { computed, ref, onMounted } from 'vue'
import { useField, useForm } from 'vee-validate'
import { bookingSchema } from '@/utils/validationSchemas'
import { getRooms } from '@/api/rooms/getRooms'
import type { RoomsInterface } from '@/interface/rooms/roomsInterface'

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:dialog', 'save-booking'])

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: bookingSchema,
})

const { value: name } = useField('name')
const { value: room_id } = useField('room_id')
const { value: dateInit } = useField('dateInit')
const { value: dateEnd } = useField('dateEnd')

const rooms = ref<RoomsInterface[]>([])

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
  emit('save-booking', values)
  resetForm()
})

onMounted(async () => {
  try {
    const response = await getRooms()
    rooms.value = response
  } catch (error) {
    console.error('Error fetching rooms:', error)
    throw error
  }
})
</script>

<style scoped>
.dialog-header {
  background: linear-gradient(
    135deg,
    rgba(156, 39, 176, 0.05) 0%,
    rgba(156, 39, 176, 0.02) 100%
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
