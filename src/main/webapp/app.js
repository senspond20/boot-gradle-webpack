import Vue from 'vue'
import { createRouter } from './router/router.js'
import store from './store/store.js'
import App from './App.vue'

export function createApp() {

    const router = createRouter()

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return { app, router, store }
}