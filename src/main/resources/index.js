import router from './routes/index.js'
let isFirst = true;
let isOnlySPA = false;
const navigateTo = async (url) => {
    history.pushState(null, null, url);
    await router();
};

const navlinkHandler =(e)=>{
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.href);
    }
}
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", async () => {
    document.body.addEventListener("click", navlinkHandler);
    if(isOnlySPA && isFirst) { // 첫 요청에 SSR 이후 SPA
        isFirst = false;
    }
    if(isOnlySPA) await router();
});

