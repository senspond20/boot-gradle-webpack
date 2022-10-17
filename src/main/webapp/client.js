import { createApp } from './app.js'

const { app, router, store } = createApp()

router.onReady(() => {

    // window.__INITIAL_STATE__
    if (window.__INITIAL_STATE__) {
        store.replaceState(Object.assign(window.__INITIAL_STATE__, { route: store.state.route} ))
    }
    app.$mount('#root', true)
})
