// 小仓库
import { defineStore } from "pinia"
// 名字和小仓库配置对象
let useInfoStore = defineStore("info", {
    state: () => {
        return {
            menus: []
        }
    },
    actions: {
        // 没有context ， state
        updataCount(data) {
            this.menus = data;
        }
    },
    getters: {
        getNewMenus() {
            const menus = this.menus;
            let fat = menus.filter((item) => {
                return item.parentId == 0;
            })
            for (let i = 0; i < menus.length; i++) {
                // if (menus[i].parentId != 0) {
                    // 这里写错了
                    // 是 k 不是 i
                //     for (let k = 0; i < fat.length; k++) {
                //         if (fat[k].id == menus[i].parentId) {
                //             fat[k].children = fat[k].children || []
                //             fat[k].children.push(menus[i])
                //         }
                //     }
                // }
                console.log(i);
                
            }
            return fat
        }

    }
})
export default useInfoStore