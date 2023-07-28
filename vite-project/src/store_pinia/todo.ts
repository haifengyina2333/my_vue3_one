import {defineStore} from "pinia"
import {ref,reactive} from 'vue';
// 组合式小仓库
let useTodoStore = defineStore("todo",()=>{
    let todos =ref(1000000000000000)
    return{
        todos,
        updataTodo(){
            todos.value = 12;
        }
    }
})

export default useTodoStore