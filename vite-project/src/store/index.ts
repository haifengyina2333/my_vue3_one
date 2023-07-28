import { createStore } from "vuex";
import info from "./info"
const store = createStore({
    state(){
        return{
           
        }
    },
    getters:{},
    mutations:{},
    actions:{},
    modules:{
        info
    }
});

export const initStore = (app:any)=>{
    app.use(store)
}