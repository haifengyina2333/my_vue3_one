
import { cardProps } from "element-plus"
import { createRouter,createWebHashHistory,RouteRecordRaw} from "vue-router"



const routes:RouteRecordRaw[] = [
    {
        path:"/login",
        name:"login",
        component:() => import("../view/login/login.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router