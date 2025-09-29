import { createApp } from 'vue'
import App from './App.vue'

// Importações do Vuetify
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; 
import { createVuetify } from 'vuetify';


import router from './routes';

// Criação da instância do Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#A1887F',
          secondary: '#6D4C41',
          background: '#F9F6F2', 
        },
      },
    },
  },
});

const app = createApp(App);

// Usa os plugins
app.use(vuetify); 
app.use(router); 

app.mount('#app');