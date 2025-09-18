<template>
  <v-container class="mt-15">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-form @submit.prevent="submit">
            <v-card-title
              >Adicionar usuario</v-card-title
            >
            <v-text-field
              v-model="name"
              :error-messages="errors.name"
              label="Nome"
              density="comfortable"
            />

            <v-text-field
              v-model="email"
              :error-messages="errors.email"
              label="E-mail"
              density="comfortable"
            />

            <v-card-actions>
              <v-btn
                color="primary"
                type="submit"
                :disabled="
                  Object.keys(errors).length > 0
                "
                >Adicionar</v-btn
              >

              <v-btn
                color="error"
                @click="cancel()"
                >Cancelar</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>

        <v-card class="mt-4">
          <v-card-title
            >Lista de usuários</v-card-title
          >
          <v-list>
            <v-list-item
              v-for="user in users"
              :key="user.id"
              :title="user.name"
              :subtitle="user.email"
            >
              <template #append>
                <v-btn
                  color="secondary"
                  size="small"
                  class="mr-2"
                  @click="editUser(user.id)"
                >
                  Editar
                </v-btn>

                <v-btn
                  color="error"
                  size="small"
                  @click="deleteUser(user.id)"
                >
                  Deletar
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { userSchema } from '@/utils/validationSchemas'
import { postUsers } from '@/api/users/postUsers'
import { getUsers } from '@/api/users/getUsers'
import { deleteUsers } from '@/api/users/deleteUsers'
import type { UserInterface } from '@/interface/users/usersInterface'

const users = ref<UserInterface[]>([])

const { handleSubmit, errors, resetForm } =
  useForm<UserInterface>({
    validationSchema: userSchema,
  })

const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')

const submit = handleSubmit(async (values) => {
  try {
    await postUsers({
      name: values.name,
      email: values.email,
    })
    users.value = await getUsers()
    resetForm()
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao adicionar usuário')
  }
})

const cancel = () => {
  resetForm()
}

onMounted(async () => {
  try {
    users.value = await getUsers()
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao buscar usuários')
  }
})

const deleteUser = async (id: number) => {
  try {
    await deleteUsers(id)
    users.value = await getUsers()
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao deletar usuário')
  }
}
</script>
