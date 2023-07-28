import {createPinia} from 'pinia';
// 大仓库
let store = createPinia();
export const initPinia = (app:any) => {
    app.use(store)
    
}
