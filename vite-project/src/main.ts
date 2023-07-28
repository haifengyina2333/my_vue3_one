import { createApp } from 'vue'
// import './style.css'
import "./assets/style/base.less"
import App from './App.vue'
import { initRouter } from './router/index'
import {initStore} from './store/index';
import { initPinia } from './store_pinia/index';
const app = createApp(App)
initRouter(app);
initStore(app);
initPinia(app)
app.mount('#app');
