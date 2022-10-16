import Vue from "vue";
import App from "./App.vue"
import {createRouter} from "./router/index.js"
import "./assets/css/base.css"
// import "@/assets/css/base.css"
import test from "./assets/js/test.js"
// const test = require("./assets/js/test.js")
new test().run();
const router = createRouter()
const app = new Vue({
    router,
 //   store,
    render: h => h(App)
})
app.$mount('#root', true)
