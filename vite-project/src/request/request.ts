import axios from "axios"
import Cookie from "js-cookie"
const instance = axios.create({
    baseURL:"http://120.24.64.5:8088/mall-admin",
    timeout:5000
})
// 请求拦截器
instance.interceptors.request.use(config=>{
    let token = Cookie.get("token");
    if(token){
        config.headers["Authorization"] = token;
        // 如果不返回，请求无法继续发送
    }
    return config
},err=>{
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res=>{

    return res.data;
}),err=>{
    return Promise.reject(err)
}

export default instance