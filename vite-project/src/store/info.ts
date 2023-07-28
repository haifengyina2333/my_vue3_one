
import {adminInfoApi} from "../request/api"

interface menusType{
    parentId:number;
    id:number;
    children?:menusType[]
}

export default {
    namespaced:true,
    state:()=>({
        menus:[],
    }),
    mutations:{
        updateMenus(state,menus:menusType[]){
            state.menus = menus
        },
    },
    actions:{
        initMenus(context){
            return new Promise(async (res,rej)=>{
                let Infores = await adminInfoApi()
                if(Infores.code == 200){
                    context.commit("updateMenus",Infores.data.menus)
                    console.log("vuex请求发送成功");
                    res(Infores.data)
                }else{
                    console.log("网络连接错误!");
                    rej(Infores)
                }
            })
           
        }
    },
    
    getters:{
        getNewMenus(state){
            const menus = state.menus;
            // 通过过滤，取出一级菜单
            let fat:menusType[] = menus.filter((item) => {
                return item.parentId == 0;
            })

            // 遍历
            menus.forEach(element => {
                if(element.parentId != 0){
                    fat.forEach(value=>{
                        if(value.id == element.parentId){
                            value.children = value.children || [];
                            value.children.push(element)
                        }
                    })
                }
            });

            // 第二个 for （48）循环有 bug 导致死循环
            // for (let i = 0; i < menus.length; i++) {
            //     if (menus[i].parentId != 0) {
            //         for (let k = 0; i < fat.length; k++) {
            //             if (fat[k].id == menus[i].parentId) {
            //                 fat[k].children = fat[k].children || []
            //                 fat[k].children.push(menus[i])
            //             }
            //         }
            //     }
            // }
            return fat
        }
    }
    
    
}
    
