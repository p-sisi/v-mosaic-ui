import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import MosaicUI from '@pang/mosaic-ui'
import App from './App.vue'
import Home from './pages/home.vue'
import ButtonDoc from './pages/normal/button.vue'
import InputDoc from './pages/normal/input.vue'
import MessageIndex from './pages/message/index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/normal/button', component: ButtonDoc },
  { path: '/normal/input', component: InputDoc },
  { path: '/message', component: MessageIndex },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.use(MosaicUI)
app.mount('#app')