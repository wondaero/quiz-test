import { createApp } from 'vue';
import App from './components/MainPage.vue';
import store from './store';

//css
import "./assets/css/normalize.css";
import "./assets/css/layout.css";
import "swiper/swiper-bundle.css";

createApp(App).use(store).mount('#app');
