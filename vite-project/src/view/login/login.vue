<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="pwd">
        <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="loginFn()">登录</el-button>

      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, getCurrentInstance,ref } from 'vue'
import {adminLoginAPI,adminInfoApi} from "../../request/api"
import Cookie from "js-cookie"
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import useInfoStore from '../../store_pinia/info';
const router = useRouter();
const store = useStore();
const piniaInfo = useInfoStore();

const data = reactive({
  ruleForm: {
    username: 'admin',
    pwd: '123456',
  },
})
let ruleFormRef = ref();
// 写在前面
const validatepwd = (rule:unknown,value:string | undefined,cb:(msg?:string)=>void) => {
  if(!value){
    cb('密码不能为空');
  }else{
    cb();
  }
}

const rules = reactive({
  username: [{
    required: true,
    trigger: "change",
    message: "用户名不能为空"
  }],
  pwd: [{
    validator: validatepwd,
    trigger: "change"
  }]
})

 const loginFn = () => {
  // console.log("123");
  ruleFormRef.value.validate().then(async()=>{
    console.log(data);
    
    let res = await adminLoginAPI({
      "password":data.ruleForm.pwd,
      "username":data.ruleForm.username
    })
    if(res.code == 200){
      Cookie.set("token",res.data.tokenHead + res.data.token,{expires:7});

      // let Infores = await adminInfoApi();
      // console.log(res);
      // console.log(Infores);

      //这里的请求,导致动态路由出现问题,导致vuex先有数据,就不会进入第一个路由伤卫，可以去掉这个请求，也可以在路由守卫进行二次判断
      store.dispatch("info/initMenus").then(res=>{

      //   console.log(res);
        router.push("/index")


      }).catch();
      
      

      // store.commit("info/updateMenus",Infores.data.menus)
      // piniaInfo.menus = Infores.data.menus;
      // console.log("载入成功");
    }

    
  }).catch(()=>{
    console.log("err");
    
  })
}


// 解构出去,暴露出去给外面使用 或者是上面的ruleForm改成，data.ruleForm
let { ruleForm } = toRefs(data);





</script>

<style lang="less" scoped></style>