<template>
  <NavbarComponent />
  <v-container>
    <v-row>
      <v-col>
        <div class="mb-4">
          <h1
            class="text-h4 font-weight-bold text-primary mb-2"
          >
            Gerenciamento de Usuários
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Gerencie os usuários do sistema
          </p>
        </div>
        <div class="d-flex justify-end mt-5">
          <v-btn
            color="primary"
            size="large"
            @click="dialog = true"
          >
            <v-icon start>mdi-plus</v-icon>
            Novo Usuário
          </v-btn>
        </div>
        <v-card class="mt-6" elevation="2">
          <v-card-title class="d-flex align-center pa-6">
            <v-icon class="mr-3" color="primary"
              >mdi-account-group</v-icon
            >
            <span class="text-h5 font-weight-bold"
              >Usuários Cadastrados</span
            >
          </v-card-title>
          <v-data-table
            class="border-pacit-100"
            :headers="headers"
            :items="users"
          >
            <template #[`item.role`]="{ item }">
              <v-chip
                :color="
                  item.role === 'Administrador'
                    ? 'primary'
                    : 'success'
                "
                variant="tonal"
                size="small"
              >
                {{ item.role }}
              </v-chip>
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
                  <v-list-item @click="editUser(item.id)">
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

                  <v-list-item @click="deleteUser(item.id)">
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

    <CreateUserComponent
      v-model:dialog="dialog"
      @save-user="handleCreateUser"
    />

    <EditUserComponent
      v-model:dialog="editDialog"
      v-model:name="editUserData.name"
      v-model:email="editUserData.email"
      v-model:password="editUserData.password"
      v-model:role="editUserData.role"
      :errors="editErrors"
      @submit="handleEditUser"
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
            Excluir Usuário
          </h2>
          <p class="text-body-1 text-medium-emphasis ma-0">
            Esta ação não pode ser desfeita
          </p>
        </div>

        <v-divider class="mx-6" />

        <v-card-text class="pa-6 text-center">
          <p class="text-body-1 mb-0">
            Tem certeza que deseja excluir este usuário?
            Todos os dados serão perdidos permanentemente.
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

import type { UserInterface } from '@/interface/users/usersInterface'
import type { CreateUserInterface } from '@/interface/users/createUsersInterface'

import CreateUserComponent from '@/components/users/CreateUserComponent.vue'
import EditUserComponent from '@/components/users/EditUserComponent.vue'

import {
  DotsVerticalIcon,
  EditIcon,
  TrashIcon,
} from 'vue-tabler-icons'

import { getUsers } from '@/api/users/getUsers'
import { postUsers } from '@/api/users/postUsers'
import { deleteUsers } from '@/api/users/deleteUsers'
import { putUsers } from '@/api/users/putUsers'

const users = ref<UserInterface[]>([])
const dialog = ref(false)
const deleteDialog = ref(false)
const editDialog = ref(false)
const userToDelete = ref<number | null>(null)
const editUserData = ref({
  id: 0,
  name: '',
  email: '',
  password: '',
  role: 'Usuário',
})
const editErrors = ref<{
  [key: string]: string[]
}>({})

// Estados do ErrorComponent
const errorDialog = ref(false)
const errorMessage = ref('')
const errorStatus = ref(0)
const errorText = ref('')

const headers = [
  { title: 'Nome Completo', key: 'name' },
  { title: 'E-mail', key: 'email' },
  { title: 'Perfil', key: 'role' },
  { title: 'Ações', key: 'actions', sortable: false },
]

onMounted(() => {
  loadUsers()
})

const showError = (error: any, operation: string) => {
  errorStatus.value = error.response?.status || 500
  errorMessage.value = error.response?.data?.message || error.message || 'Erro desconhecido'
  errorText.value = `Erro ao ${operation}`
  errorDialog.value = true
}

const handleCreateUser = async (
  userData: CreateUserInterface,
) => {
  try {
    await postUsers(userData)
    await loadUsers()
    dialog.value = false
  } catch (error) {
    console.error(error)
    showError(error, 'criar usuário')
  }
}

const loadUsers = async () => {
  try {
    const response = await getUsers()
    users.value = response
  } catch (error) {
    console.error(error)
    showError(error, 'carregar usuários')
  }
}

const editUser = (id: number) => {
  const user = users.value.find((u) => u.id === id)
  if (user) {
    editUserData.value = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    }
    editDialog.value = true
  }
}

const handleEditUser = async (
  userData: CreateUserInterface,
) => {
  try {
    await putUsers(editUserData.value.id, userData)
    await loadUsers()
    editDialog.value = false
  } catch (error) {
    console.error(error)
    showError(error, 'editar usuário')
  }
}

const deleteUser = (id: number) => {
  userToDelete.value = id
  deleteDialog.value = true
}

const confirmDelete = async () => {
  if (userToDelete.value) {
    try {
      await deleteUsers(userToDelete.value)
      await loadUsers()
      deleteDialog.value = false
      userToDelete.value = null
    } catch (error) {
      console.error(error)
      showError(error, 'excluir usuário')
    }
  }
}
</script>

<style scoped>
.delete-dialog {
  backdrop-filter: blur(4px);
}

.delete-card {
  border-radius: 16px;
  overflow: hidden;
}

.dialog-header {
  background: linear-gradient(
    135deg,
    rgba(244, 67, 54, 0.05) 0%,
    rgba(244, 67, 54, 0.02) 100%
  );
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
</style>
