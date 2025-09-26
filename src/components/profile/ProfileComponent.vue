<template>
  <v-dialog
    v-model="isOpen"
    max-width="400"
    class="profile-dialog"
  >
    <v-card class="profile-card" elevation="8">
      <div class="profile-header pa-6 text-center">
        <v-avatar color="primary" size="80" class="mb-4 elevation-4">
          <span class="text-h4 font-weight-bold text-white">
            {{ getInitials(authStore.user?.name) }}
          </span>
        </v-avatar>
        <h2 class="text-h5 font-weight-bold mb-1">
          {{ authStore.user?.name || 'Carregando...' }}
        </h2>
        <p class="text-body-2 text-medium-emphasis ma-0">
          {{ authStore.user?.email || 'Carregando...' }}
        </p>
      </div>

      <v-divider />

      <v-card-text class="pa-6">
        <div class="profile-info text-center">
          <div class="info-row d-flex align-center justify-center">
            <v-icon color="primary" class="mr-3">mdi-shield-account</v-icon>
            <div>
              <div class="text-caption text-medium-emphasis mb-1">
                Perfil de Acesso
              </div>
              <v-chip
                :color="authStore.user?.role === 'Administrador' ? 'primary' : 'success'"
                variant="tonal"
                size="small"
              >
                {{ authStore.user?.role || 'Carregando...' }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn
          color="primary"
          variant="elevated"
          @click="isOpen = false"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  dialog: boolean
}>()

const emit = defineEmits(['update:dialog'])

const authStore = useAuthStore()

const isOpen = computed({
  get: () => props.dialog,
  set: (value) => emit('update:dialog', value),
})

const getInitials = (name: string | undefined): string => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
</script>

<style scoped>
.profile-dialog {
  backdrop-filter: blur(4px);
}

.profile-card {
  border-radius: 16px;
  overflow: hidden;
}

.profile-header {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.08) 0%,
    rgba(var(--v-theme-primary), 0.03) 100%
  );
  border-bottom: 1px solid rgba(var(--v-border-color), 0.08);
}

.info-row {
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(var(--v-theme-surface), 0.5);
  border: 1px solid rgba(var(--v-border-color), 0.08);
  transition: all 0.2s ease;
}

.info-row:hover {
  background: rgba(var(--v-theme-primary), 0.02);
  border-color: rgba(var(--v-theme-primary), 0.12);
}
</style>