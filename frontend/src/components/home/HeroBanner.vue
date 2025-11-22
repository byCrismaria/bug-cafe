<template>
  <section id="inicio">
    <v-carousel
      height="450"
      show-arrows="hover"
      cycle
      hide-delimiter-background
      :continuous="true"
      class="text-center"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-img 
          :src="slide.image" 
          height="100%" 
          cover 
          class="d-flex align-center justify-center text-white"
        >
          <div class="v-overlay-scrim"></div>
          
          <div class="relative z-10 px-4">
            <h1 class="text-h3 text-md-h3 font-weight-black">{{ slide.title }}</h1>
            <p class="mt-4 text-subtitle-1 text-md-h6 drop-shadow-md">{{ slide.subtitle }}</p>
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
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2940&auto=format&fit=crop", // Imagem do protótipo
  },
  {
    title: "Conecte-se com o Melhor Café",
    subtitle: "Do Expresso ao Latte, um sabor para cada linha de código.",
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Aquele Debug que Merece um Doce",
    subtitle: "Confira nossas sobremesas artesanais.",
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2940&auto=format&fit=crop",
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