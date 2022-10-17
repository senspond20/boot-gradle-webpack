import { createApp } from './app.js'
import renderVueComponentToString from 'vue-server-renderer/basic';
const { app, router, store } = createApp()

router.push(route)

router.onReady(() => {
    renderVueComponentToString(app, (err, res) => {
        rendered = String(res)
    })
})

/*
new Promise((resolve, reject) => {
    router.push(context.url);
    router.onReady(() => {
        // const matchedComponents = router.getMatchedComponents();
        // if (!matchedComponents.length) {
        //     return reject({ code: 404 });
        // }
        resolve(app);
    }, reject);
})
    .then(app => {
        renderVueComponentToString(app, (err, res) => {
            if (err) throw new Error(err);

            dispatch(res);
        });
    });

 */