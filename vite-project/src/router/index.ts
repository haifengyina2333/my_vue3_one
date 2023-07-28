
import { cardProps } from "element-plus"
import { createRouter,createWebHashHistory,RouteRecordRaw} from "vue-router"
import Cookie from 'js-cookie';
import {useStore} from "vuex"

const routes:RouteRecordRaw[] = [
    {
        path:"/login",
        name:"login",
        component:() => import("../view/login/login.vue")
    },
    {
        path:'/home',
        name:'home',
        component:()=>import("../view/home/home.vue")
    },

    // {
    //     path:"/pms",
    //     name:'pms',
    //     component:()=>import("../view/home/home.vue"),
    //     children:[
    //         {
    //             path:'product',
    //             name:'product',
    //             component:()=>import("../view/pms/product.vue")
    //         },
    //     ]
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const store = useStore();
    const token = Cookie.get("token"); 
    let menus = store.state.info.menus
    // console.log(store.getters["info/getNewMenus"]);
        if(token && menus.length === 0){
            store.dispatch("info/initMenus").then(()=>{
                
                    genRoutes(store);
      
                    next(to.path); 
              
               
                //  重新进入路由守卫 但是执行下面的
                // 解决了刷新页面空白的问题
            })   
        }
        // 针对性登录时发送的请求继续的二次判断
        else if(token && menus.length != 0 && from.path == '/login' && to.path == '/index'){
            store.dispatch("info/initMenus").then(()=>{
                genRoutes(store);
                next("/home")
            })
        }
        else if(!token && to.path != '/login'){
            next("/login")
        }else if(token && to.path == '/login'){
            next("/")
        }
        else{
            next();
    
        }
    
   
    
    
    // if(token && )
}) 
    
const genRoutes = (store) =>{
    const newMenus = store.getters["info/getNewMenus"];
    newMenus.forEach((element,index)=>{
        const newRouters:RouteRecordRaw[] = []
        newRouters.push({
            path:'/' + element.name,
            name: element.name,
            component:()=>import("../view/home/home.vue"),
            redirect:'/' + element.name + '/' + element.children[0].name,
            children:[]
        })
        element.children.forEach((e)=>{
            newRouters[0].children.push({
                path:e.name,
                name:e.name,
                component:()=>import(`../view/${element.name}/${e.name}.vue`),
            })
        })
        router.addRoute(newRouters[0])
        // addRoutes 在vue-route 4 被舍弃了 该方法传一个对象
    })
    router.addRoute({
        path:'/',
        component:()=>import(`../view/home/home.vue`),
        redirect:'/index',
        children:[{
            path:'/index',
            name:'index',
            component:()=>import(`../view/index/index.vue`),
        }]
    })
}

export const initRouter = (app:any) =>{
    app.use(router)
}
// export default router