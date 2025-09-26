<template>
  <NavbarComponent />
  <v-container>
    <v-row>
      <v-col>
        <div class="mb-4">
          <h1
            class="text-h4 font-weight-bold text-primary mb-2"
          >
            Gerenciamento de Reservas
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Gerencie todas as reservas do sistema
          </p>
        </div>
        <div class="d-flex justify-end mt-5">
          <v-btn
            color="info"
            size="large"
            @click="dialog = true"
          >
            <v-icon start>mdi-plus</v-icon>
            Nova Reserva
          </v-btn>
        </div>
        <v-card class="mt-6" elevation="2">
          <v-card-title class="d-flex align-center pa-6">
            <v-icon class="mr-3" color="info"
              >mdi-calendar</v-icon
            >
            <span class="text-h5 font-weight-bold"
              >Reservas Cadastradas</span
            >
          </v-card-title>
          <v-data-table
            class="border-pacit-100"
            :headers="headers"
            :items="bookings"
          >
            <template #[`item.dateInit`]="{ item }">
              {{ formatDateTime(item.dateInit) }}
            </template>

            <template #[`item.dateEnd`]="{ item }">
              {{ formatDateTime(item.dateEnd) }}
            </template>

            <template #[`item.actions`]="{ item }">
              <v-menu>
                <template #activator="{ props }">
                  <v-btn
                    flat
                    icon
                    size="small"
                    class="text-muted"
                    v-bind="props"
                  >
                    <DotsVerticalIcon size="20" />
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="editBooking(item.id)">
                    <template #prepend>
                      <EditIcon
                        stroke-width="1.5"
                        size="20"
                      />
                    </template>
                    <v-list-item-title
                      class="pl-2 text-body-1"
                    >
                      Editar
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="deleteBooking(item.id)">
                    <template #prepend>
                      <TrashIcon
                        stroke-width="1.5"
                        size="20"
                      />
                    </template>
                    <v-list-item-title
                      class="pl-2 text-body-1"
                    >
                      Deletar
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <CreateBookingComponent
      v-model:dialog="dialog"
      @save-booking="handleCreateBooking"
    />

    <EditBookingComponent
      v-model:dialog="editDialog"
      v-model:name="editBookingData.name"
      v-model:dateInit="editBookingData.dateInit"
      v-model:dateEnd="editBookingData.dateEnd"
      v-model:room_id="editBookingData.room_id"
      :errors="editErrors"
      @submit="handleEditBooking"
    />

    <v-dialog
      v-model="deleteDialog"
      max-width="420"
      persistent
      class="delete-dialog"
    >
      <v-card class="delete-card" elevation="12">
        <div class="dialog-header pa-6 text-center">
          <v-avatar
            color="error"
            size="64"
            class="mb-4 elevation-4"
          >
            <v-icon color="white" size="32"
              >mdi-delete-alert</v-icon
            >
          </v-avatar>
          <h2 class="text-h5 font-weight-bold mb-2">
            Excluir Reserva
          </h2>
          <p class="text-body-1 text-medium-emphasis ma-0">
            Esta ação não pode ser desfeita
          </p>
        </div>

        <v-divider class="mx-6" />

        <v-card-text class="pa-6 text-center">
          <p class="text-body-1 mb-0">
            Tem certeza que deseja excluir esta reserva? Todos
            os dados serão perdidos permanentemente.
          </p>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-btn
            variant="outlined"
            color="grey"
            class="flex-grow-1 mr-3"
            @click="deleteDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="error"
            variant="elevated"
            class="flex-grow-1"
            @click="confirmDelete"
          >
            <v-icon start size="18">mdi-delete</v-icon>
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <ErrorComponent
      v-model:isActive="errorDialog"
      :errorMessage="errorMessage"
      :status="errorStatus"
      :text="errorText"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

import CreateBookingComponent from '@/components/bookings/CreateBookingComponent.vue'
import EditBookingComponent from '@/components/bookings/EditBookingComponent.vue'

import type { BookingsInterface } from '@/interface/bookings/bookingsInterface'
import type { CreateBookingsInterface } from '@/interface/bookings/createBookingsInterface'

import {
  DotsVerticalIcon,
  EditIcon,
  TrashIcon,
} from 'vue-tabler-icons'

import { getBookings } from '@/api/bookings/getBookings'
import { postBookings } from '@/api/bookings/postBookings'
import { putBookings } from '@/api/bookings/putBookings'
import { deleteBookings } from '@/api/bookings/deleteBookings'
import { formatDateTime } from '@/utils/dateFormatter'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const bookings = ref<BookingsInterface[]>([])
const dialog = ref(false)
const editDialog = ref(false)
const deleteDialog = ref(false)
const bookingTodelete = ref<number | null>(null)
const editBookingData = ref({
  id: 0,
  name: '',
  dateInit: '',
  dateEnd: '',
  room_id: null as number | null,
  user_id: 1,
})
const editErrors = ref<{ [key: string]: string[] }>({})

// Estados do ErrorComponent
const errorDialog = ref(false)
const errorMessage = ref('')
const errorStatus = ref(0)
const errorText = ref('')

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Data Ini.', key: 'dateInit' },
  { title: 'Data Fim', key: 'dateEnd' },
  { title: 'Criado Por', key: 'user.name' },
  { title: 'Sala', key: 'room.name' },
  { title: 'Ações', key: 'actions', sortable: false },
]

onMounted(() => {
  loadBookings()
})

const showError = (error: any, operation: string) => {
  errorStatus.value = error.response?.status || 500
  errorMessage.value = error.response?.data?.message || error.message || 'Erro desconhecido'
  errorText.value = `Erro ao ${operation}`
  errorDialog.value = true
}

const loadBookings = async () => {
  try {
    const response = await getBookings()
    bookings.value = response
  } catch (error) {
    console.error(error)
    showError(error, 'carregar reservas')
  }
}

const handleCreateBooking = async (bookingData: CreateBookingsInterface) => {
  try {
    const apiData = {
      ...bookingData,
      user_id: authStore.user.id
    }
    await postBookings(apiData)
    await loadBookings()
    dialog.value = false
  } catch (error) {
    console.error(error)
    showError(error, 'criar reserva')
  }
}

const editBooking = (id: number) => {
  const booking = bookings.value.find((b) => b.id === id)
  if (booking) {
    editBookingData.value = {
      id: booking.id,
      name: booking.name,
      dateInit: booking.dateInit,
      dateEnd: booking.dateEnd,
      room_id: booking.room_id,
      user_id: booking.user_id,
    }
    editDialog.value = true
  }
}

const handleEditBooking = async (
  bookingData: BookingsInterface,
) => {
  try {
    const apiData = {
      ...bookingData,
      user_id: editBookingData.value.user_id
    }
    await putBookings(editBookingData.value.id, apiData)
    await loadBookings()
    editDialog.value = false
  } catch (error) {
    console.error(error)
    showError(error, 'editar reserva')
  }
}

const deleteBooking = async (id: number) => {
  bookingTodelete.value = id
  deleteDialog.value = true
}

const confirmDelete = async () => {
  if (bookingTodelete.value) {
    try {
      await deleteBookings(bookingTodelete.value)
      await loadBookings()
      deleteDialog.value = false
      bookingTodelete.value = null
    } catch (error) {
      console.error(error)
      showError(error, 'excluir reserva')
    }
  }
}
</script>
