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
            v-model="nameModel"
            :error-messages="errors.name"
            label="Título da Reserva"
            variant="outlined"
            prepend-inner-icon="mdi-text"
            density="comfortable"
            class="mb-3"
            hide-details="auto"
          />

          <v-autocomplete
            v-model="roomModel"
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
            clearable
          />

          <v-text-field
            v-model="dateInitModel"
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
            v-model="dateEndModel"
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
import { computed, ref, watch, onMounted } from 'vue'
import { getRooms } from '@/api/rooms/getRooms'
import { formatToDatetimeLocal, formatToISO } from '@/utils/dateFormatter'

const rooms = ref([])

const props = defineProps<{
  dialog: boolean
  name: string
  dateInit: string
  dateEnd: string
  room_id: number | null | undefined

  errors: { [key: string]: string[] }
}>()

const emit = defineEmits([
  'update:dialog',
  'update:name',
  'update:dateInit',
  'update:dateEnd',
  'update:room_id',
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

const dateInitModel = computed({
  get: () => formatToDatetimeLocal(props.dateInit),
  set: (value) => emit('update:dateInit', formatToISO(value)),
})

const dateEndModel = computed({
  get: () => formatToDatetimeLocal(props.dateEnd),
  set: (value) => emit('update:dateEnd', formatToISO(value)),
})

const roomModel = computed({
  get: () => props.room_id as any,
  set: (value) => emit('update:room_id', value),
})

const loadRooms = async () => {
  try {
    const response = await getRooms()
    rooms.value = response
  } catch (error) {
    console.error('Erro ao carregar salas:', error)
  }
}

onMounted(() => {
  loadRooms()
})

watch(() => props.dialog, async (newValue) => {
  if (newValue && rooms.value.length === 0) {
    await loadRooms()
  }
})

const submit = () => {
  emit('submit', {
    name: props.name,
    dateInit: props.dateInit,
    dateEnd: props.dateEnd,
    room_id: props.room_id
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
