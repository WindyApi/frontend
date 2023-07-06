import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {store} from "./expand/store.js";
import {router} from "./expand/router.js";

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
