import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import store from "./store";
import axios from "axios";
import Home from "@/views/Home.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [{ name: "Home", path: "/", component: Home }];

const router = new VueRouter({
    routes,
    mode: "history"
});

export let client;
(async function() {
    const response = await axios.get("/appSettings.json");
    const appSettings = response.data;
    client = axios.create({
        baseURL: appSettings.apiUrl
    });
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app");
})();
