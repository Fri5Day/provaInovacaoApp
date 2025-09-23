<template>
  <v-btn
    icon
    variant="elevated"
    color="white"
    @click="drawer = !drawer"
    :class="[
      'menu-toggle',
      { 'menu-toggle--shifted': drawer },
    ]"
    size="small"
    elevation="4"
  >
    <v-icon color="grey-darken-2">{{
      drawer ? 'mdi-close' : 'mdi-menu'
    }}</v-icon>
  </v-btn>

  <v-navigation-drawer
    v-model="drawer"
    app
    :width="drawer ? 250 : 0"
    elevation="2"
  >
    <div class="drawer-header">
      <div class="d-flex align-center pa-4">
        <v-avatar
          color="primary"
          class="mr-3"
          size="40"
        >
          <v-icon
            color="white"
            icon="mdi-store"
          />
        </v-avatar>
        <div>
          <div class="text-h6 font-weight-bold">
            TekRoom
          </div>
          <div
            class="text-caption text-medium-emphasis"
          >
            Sistema de reservas
          </div>
        </div>
      </div>
    </div>

    <v-divider />

    <v-list class="pa-2" nav>
      <v-list-item
        :to="{ name: 'home' }"
        link
        prepend-icon="mdi-view-dashboard"
        title="Home"
        class="mb-1"
        rounded="lg"
      />

      <v-list-item
        :to="{ name: 'users' }"
        link
        prepend-icon="mdi-account"
        title="Usuários"
        class="mb-1"
        rounded="lg"
      />

      <v-list-item
        link
        prepend-icon="mdi-home"
        title="Salas"
        class="mb-1"
        rounded="lg"
      />

      <v-list-item
        link
        prepend-icon="mdi-calendar-check"
        title="Reservas"
        class="mb-1"
        rounded="lg"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const drawer = ref(true)
</script>

<style scoped>
.menu-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  transition: all 0.3s
    cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
}

.menu-toggle--shifted {
  left: 270px;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.drawer-header {
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-surface)) 0%,
    rgba(var(--v-theme-primary), 0.05) 100%
  );
  border-bottom: 1px solid
    rgba(var(--v-border-color), 0.12);
}

.v-list-item--active {
  background-color: rgba(
    var(--v-theme-primary),
    0.1
  );
  color: rgb(var(--v-theme-primary));
}
</style>
