<template>
  <NavbarComponent />
  <v-container>
    <v-row>
      <v-col>
        <div
          class="d-flex justify-end align-center mt-5"
        >
          <v-btn
            color="primary"
            @click="dialog = true"
            >+ Adiconar Usuário</v-btn
          >
        </div>
        <v-card class="mt-5">
          <v-card-title
            >Tabela de usuários</v-card-title
          >
          <v-data-table
            class="border-pacit-100"
            :headers="headers"
            :items="users"
          >
            <template #[`item.name`]="{ item }">
              {{ item.name }}
            </template>

            <template #[`item.email`]="{ item }">
              {{ item.email }}
            </template>

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

            <template
              #[`item.actions`]="{ item }"
            >
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
                  <v-list-item
                    @click="editUser(item.id)"
                  >
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

                  <v-list-item
                    @click="deleteUser(item.id)"
                  >
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

    <v-dialog
      v-model="deleteDialog"
      max-width="420"
      persistent
      class="delete-dialog"
    >
      <v-card class="delete-card" elevation="12">
        <div
          class="dialog-header pa-6 text-center"
        >
          <v-avatar
            color="error"
            size="64"
            class="mb-4 elevation-4"
          >
            <v-icon color="white" size="32"
              >mdi-delete-alert</v-icon
            >
          </v-avatar>
          <h2
            class="text-h5 font-weight-bold mb-2"
          >
            Excluir Usuário
          </h2>
          <p
            class="text-body-1 text-medium-emphasis ma-0"
          >
            Esta ação não pode ser desfeita
          </p>
        </div>

        <v-divider class="mx-6" />

        <v-card-text class="pa-6 text-center">
          <p class="text-body-1 mb-0">
            Tem certeza que deseja excluir este
            usuário? Todos os dados serão perdidos
            permanentemente.
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
            <v-icon start size="18"
              >mdi-delete</v-icon
            >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'

import type { UserInterface } from '@/interface/users/usersInterface'
import type { CreateUserInterface } from '@/interface/users/createUsersInterface'

import CreateUserComponent from '@/components/users/CreateUserComponent.vue'
import {
  DotsVerticalIcon,
  EditIcon,
  TrashIcon,
} from 'vue-tabler-icons'

import { getUsers } from '@/api/users/getUsers'
import { postUsers } from '@/api/users/postUsers'
import { deleteUsers } from '@/api/users/deleteUsers'

const users = ref<UserInterface[]>([])
const dialog = ref(false)
const deleteDialog = ref(false)
const userToDelete = ref<number | null>(null)

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Perfil', key: 'role' },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
  },
]

onMounted(() => {
  loadUsers()
})

const handleCreateUser = async (
  userData: CreateUserInterface,
) => {
  try {
    await postUsers(userData)
    await loadUsers()
    dialog.value = false
  } catch (error) {
    console.error(error)
    throw error
  }
}

const loadUsers = async () => {
  try {
    const response = await getUsers()
    users.value = response
  } catch (error) {
    console.error(error)
    throw error
  }
}

const editUser = (id: number) => {
  console.log('Editando usuário:', id)
  // Implementar navegação para edição quando criar a página
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
      throw error
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
