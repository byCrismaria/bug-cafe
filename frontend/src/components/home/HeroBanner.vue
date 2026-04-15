<template>
  <section id="inicio" data-testid="hero-section">
    <v-carousel
      :height="$vuetify.display.smAndDown ? 300 : 450"
      show-arrows="hover"
      cycle
      hide-delimiter-background
      :continuous="true"
      class="text-center"
      data-testid="hero-carousel"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :data-testid="`hero-slide-${i}`"
      >
        <v-img
          :src="slide.image"
          height="100%"
          cover
          class="d-flex align-center justify-center text-white"
          :data-testid="`hero-image-${i}`"
        >
          <div class="v-overlay-scrim"></div>

          <div class="relative z-10 px-4">
            <h1 class="text-h3 text-md-h3 font-weight-black" :data-testid="`hero-title-${i}`">{{ slide.title }}</h1>
            <p class="mt-4 text-subtitle-1 text-md-h6 drop-shadow-lg" :data-testid="`hero-subtitle-${i}`">{{ slide.subtitle }}</p>
          </div>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Dados do Carrossel (Você pode adicionar mais slides aqui)
const slides = ref([
  {
    title: "Bem-vindo(a) ao Bug Café!",
    subtitle: "Seu código para uma pausa perfeita.",
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Conecte-se com o Melhor Café",
    subtitle: "Do Expresso ao Latte, um sabor para cada linha de código.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Aquele Debug que Merece um Doce",
    subtitle: "Confira nossas sobremesas artesanais.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2940&auto=format&fit=crop",
  },
]);
</script>

<style scoped>
/* Estilos para a sombra e sobreposição */

.v-overlay-scrim {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); /* 50% de opacidade preta */
  z-index: 1;
}

.drop-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}
</style>