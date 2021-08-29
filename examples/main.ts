import { createApp } from 'vue';
import App from './App.vue';
import VueKoalaCarousel from 'vue-koala-carousel';

const app = createApp(App);
app.use(VueKoalaCarousel);

app.mount('#app');
