import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/es/components/loading/style/css'
import './assets/main.css'

import App from './App'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
