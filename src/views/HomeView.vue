<template>
  <div class="home-container">
    <NavbarComponent />
    <div class="hero-section">
      <v-container class="fill-height">
        <v-row
          justify="center"
          align="center"
          class="fill-height"
        >
          <v-col cols="12" lg="10">
            <div class="text-center mb-12">
              <div class="hero-avatar mb-6">
                <v-avatar size="120" class="elevation-8">
                  <img
                    :src="logo"
                    alt="TekRoom Logo"
                    style="
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                    "
                  />
                </v-avatar>
              </div>

              <h1 class="hero-title mb-4">
                Bem-vindo ao
                <span class="text-primary">TekRoom!</span>
              </h1>

              <p class="hero-subtitle mb-8">
                Sistema inteligente de gerenciamento de
                reservas de salas
              </p>
            </div>

            <div class="feature-cards-container mb-8">
              <v-row justify="center" class="feature-cards">
                <v-col cols="12" sm="6" md="4" lg="3">
                  <v-card
                    class="feature-card pa-6 text-center"
                    elevation="2"
                    hover
                    @click="$router.push({ name: 'users' })"
                  >
                    <div class="feature-icon mb-4">
                      <v-avatar
                        color="primary"
                        size="64"
                        class="elevation-2"
                      >
                        <v-icon color="white" size="32"
                          >mdi-account-group</v-icon
                        >
                      </v-avatar>
                    </div>
                    <h3
                      class="text-h6 font-weight-bold mb-2"
                    >
                      Usuários
                    </h3>
                    <p
                      class="text-body-2 text-medium-emphasis mb-4"
                    >
                      Gerencie usuários
                    </p>
                    <v-btn
                      color="primary"
                      variant="text"
                      size="small"
                    >
                      Acessar
                      <v-icon end size="16"
                        >mdi-arrow-right</v-icon
                      >
                    </v-btn>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4" lg="3">
                  <v-card
                    class="feature-card pa-6 text-center"
                    elevation="2"
                    hover
                    @click="$router.push({ name: 'rooms' })"
                  >
                    <div class="feature-icon mb-4">
                      <v-avatar
                        color="success"
                        size="64"
                        class="elevation-2"
                      >
                        <v-icon color="white" size="32"
                          >mdi-home</v-icon
                        >
                      </v-avatar>
                    </div>
                    <h3
                      class="text-h6 font-weight-bold mb-2"
                    >
                      Salas
                    </h3>
                    <p
                      class="text-body-2 text-medium-emphasis mb-4"
                    >
                      Cadastre e gerencie salas
                    </p>
                    <v-btn
                      color="success"
                      variant="text"
                      size="small"
                    >
                      Acessar
                      <v-icon end size="16"
                        >mdi-arrow-right</v-icon
                      >
                    </v-btn>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="4" lg="3">
                  <v-card
                    class="feature-card pa-6 text-center"
                    elevation="2"
                    hover
                    @click="
                      $router.push({ name: 'bookings' })
                    "
                  >
                    <div class="feature-icon mb-4">
                      <v-avatar
                        color="info"
                        size="64"
                        class="elevation-2"
                      >
                        <v-icon color="white" size="32"
                          >mdi-calendar-check</v-icon
                        >
                      </v-avatar>
                    </div>
                    <h3
                      class="text-h6 font-weight-bold mb-2"
                    >
                      Reservas
                    </h3>
                    <p
                      class="text-body-2 text-medium-emphasis mb-4"
                    >
                      Controle de reservas
                    </p>
                    <v-btn
                      color="info"
                      variant="text"
                      size="small"
                    >
                      Acessar
                      <v-icon end size="16"
                        >mdi-arrow-right</v-icon
                      >
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import logo from '@/assets/images/Tek.png'
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #f8fafc 0%,
    #e2e8f0 100%
  );
  position: relative;
}

.hero-section {
  position: relative;
  z-index: 1;
  padding: 2rem 0;
}

.hero-avatar {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

.feature-cards {
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.feature-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.feature-icon {
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.cta-button {
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(25, 118, 210, 0.3);
}

@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}
</style>
