import request from "./request";
interface AdminLoginData {
    password: string,
    username: string
}

interface ManageResult<T= {}> {
    code: number,
    data: T
    // {
    //     token:string,
    //     tokenHead:string;
    // },
    message: string
}

interface AdminLoginRes {
    token: string,
    tokenHead: string;
}
interface AdminInfoRes {
    menus: []
}


type PromiseRes<T> = Promise<ManageResult<T>>
// 登录
export const adminLoginAPI = (params: AdminLoginData): PromiseRes<AdminLoginRes> => request.post("/admin/login", params);
// 用户信息
export const adminInfoApi = (): PromiseRes<AdminInfoRes> => request.get("/admin/info")

export const getuserInfoApi = (data:{
    keyword:string,
    pageNum:number,
    pageSize:number
}):PromiseRes<{list:{}[]}> => request.get("/admin/list",{
params:data
})

export const updateAdminInfoAPI = (id:number,params:AdminObject):Promise<{
    code:number
}> => request.post("/admin/update/" + id,params)
