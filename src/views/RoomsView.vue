<template>
  <NavbarComponent />
  <v-container>
    <v-row>
      <v-col>
        <div class="mb-4">
          <h1
            class="text-h4 font-weight-bold text-primary mb-2"
          >
            Gerenciamento de Salas
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Gerencie as salas disponíveis no sistema
          </p>
        </div>
        <div class="d-flex justify-end mt-5">
          <v-btn
            color="success"
            size="large"
            @click="dialog = true"
          >
            <v-icon start>mdi-plus</v-icon>
            Nova Sala
          </v-btn>
        </div>
        <v-card class="mt-6" elevation="2">
          <v-card-title class="d-flex align-center pa-6">
            <v-icon class="mr-3" color="success"
              >mdi-home-group</v-icon
            >
            <span class="text-h5 font-weight-bold"
              >Salas Cadastradas</span
            >
          </v-card-title>
          <v-data-table
            class="border-pacit-100"
            :headers="headers"
            :items="rooms"
          >
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
                  <v-list-item @click="editRoom(item.id)">
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

                  <v-list-item @click="deleteRoom(item.id)">
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

    <CreateRoomComponent
      v-model:dialog="dialog"
      @save-room="handleCreateRoom"
    />

    <EditRoomComponent
      v-model:dialog="editDialog"
      v-model:name="editRoomData.name"
      v-model:size="editRoomData.size"
      v-model:note="editRoomData.note"
      :errors="editErrors"
      @submit="handleEditRoom"
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
            Excluir Sala
          </h2>
          <p class="text-body-1 text-medium-emphasis ma-0">
            Esta ação não pode ser desfeita
          </p>
        </div>

        <v-divider class="mx-6" />

        <v-card-text class="pa-6 text-center">
          <p class="text-body-1 mb-0">
            Tem certeza que deseja excluir esta sala? Todos
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

import CreateRoomComponent from '@/components/rooms/CreateRoomComponent.vue'
import EditRoomComponent from '@/components/rooms/EditRoomComponent.vue'

import type { RoomsInterface } from '@/interface/rooms/roomsInterface'
import type { CreateRoomsInterface } from '@/interface/rooms/createRoomsInterface'

import {
  DotsVerticalIcon,
  EditIcon,
  TrashIcon,
} from 'vue-tabler-icons'

import { getRooms } from '@/api/rooms/getRooms'
import { putRooms } from '@/api/rooms/putRooms'
import { deleteRooms } from '@/api/rooms/deleteRooms'
import { postRooms } from '@/api/rooms/postRooms'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const rooms = ref<RoomsInterface[]>([])
const dialog = ref(false)
const editDialog = ref(false)
const deleteDialog = ref(false)
const roomTodelete = ref<number | null>(null)
const editRoomData = ref({
  id: 0,
  name: '',
  size: 0,
  note: '',
  user_id: 0,
})
const editErrors = ref<{ [key: string]: string[] }>({})

// Estados do ErrorComponent
const errorDialog = ref(false)
const errorMessage = ref('')
const errorStatus = ref(0)
const errorText = ref('')

const headers = [
  { title: 'Nome da Sala', key: 'name' },
  { title: 'Capacidade', key: 'size' },
  { title: 'Observações', key: 'note' },
  { title: 'Ações', key: 'actions', sortable: false },
]

onMounted(() => {
  loadRooms()
})

const showError = (error: any, operation: string) => {
  errorStatus.value = error.response?.status || 500
  errorMessage.value = error.response?.data?.message || error.message || 'Erro desconhecido'
  errorText.value = `Erro ao ${operation}`
  errorDialog.value = true
}

const loadRooms = async () => {
  try {
    const response = await getRooms()
    rooms.value = response
  } catch (error) {
    console.error(error)
    showError(error, 'carregar salas')
  }
}

const handleCreateRoom = async (
  roomData: CreateRoomsInterface,
) => {
  try {
    const apiData = {
      ...roomData,
      user_id: authStore.user.id,
    }
    await postRooms(apiData)
    await loadRooms()
    dialog.value = false
  } catch (error) {
    console.error(error)
    showError(error, 'criar sala')
  }
}

const editRoom = (id: number) => {
  const room = rooms.value.find((r) => r.id === id)
  if (room) {
    editRoomData.value = {
      id: room.id,
      name: room.name,
      size: room.size,
      note: room.note,
      user_id: room.user_id,
    }
    editDialog.value = true
  }
}

const handleEditRoom = async (
  roomData: CreateRoomsInterface,
) => {
  try {
    const apiData = {
      ...roomData,
      user_id: editRoomData.value.user_id,
    }
    await putRooms(editRoomData.value.id, apiData)
    await loadRooms()
    editDialog.value = false
  } catch (error) {
    console.error(error)
    showError(error, 'editar sala')
  }
}

const deleteRoom = async (id: number) => {
  roomTodelete.value = id
  deleteDialog.value = true
}

const confirmDelete = async () => {
  if (roomTodelete.value) {
    try {
      await deleteRooms(roomTodelete.value)
      await loadRooms()
      deleteDialog.value = false
      roomTodelete.value = null
    } catch (error) {
      console.error(error)
      showError(error, 'excluir sala')
    }
  }
}
</script>
