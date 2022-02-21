import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        name: "home",
        path: "",
        component: () => import('../pages/main/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router


