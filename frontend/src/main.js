import { createApp } from 'vue'
import App from './App.vue'

// 2. Importações do Vuetify
import 'vuetify/styles'; // Importa os estilos principais do Vuetify
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// Importação de ícones (opcional, mas recomendado)
import '@mdi/font/css/materialdesignicons.css'; 
import { createVuetify } from 'vuetify';

// 3. Criação da instância do Vuetify
const vuetify = createVuetify({
  components,
  directives,
  // 4. Configuração do tema e cores (para replicar o Bug Café)
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#A1887F', // Marrom/Ambar do Café (Amber-700 similar)
          secondary: '#6D4C41', // Marrom mais escuro
          background: '#F9FF6F2', // Cor de fundo do protótipo
        },
      },
    },
  },
});

const app = createApp(App);

// 5. Usa o Vuetify
app.use(vuetify); 

app.mount('#app');
