<template>
    <!-- 原来是v-model 必须改成 model-value，因为是props传递的，不能修改 -->
     <el-dialog :model-value="visible" title="Shipping address" :before-close="close">
    <el-form :model="newForm" :label-width="formLabelWidth">
      <el-form-item label="账号" >
        <el-input v-model="newForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" >
        <el-input v-model="newForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" >
        <el-input v-model="newForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" >
        <el-input v-model="newForm.password" type="password"
        autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注：" >
        <el-input v-model="newForm.note" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用" >
        <el-radio :label="1" size="large" v-model="newForm.status">是</el-radio>
        <el-radio :label="0" size="large" v-model="newForm.status">否</el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click=" close">取消</el-button>
        <el-button type="primary" @click="modifyAdmin">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, watch } from 'vue'
import {updateAdminInfoAPI} from "../../../request/api"
const props = defineProps<{
    visible:boolean,
    form:AdminObject,
}>();


const state = reactive<{
    formLabelWidth:string,
    newForm:AdminObject
}>({
    formLabelWidth:"120px",
    newForm:{}
})

watch(()=>props.form,()=>{
    // 让父组件的 from 不受到子组件的影响
    // 传递的不是基本数据类型，子组件要做浅拷贝
    newForm.value = {...props.form}
})

const {formLabelWidth,newForm} = toRefs(state)
const emits = defineEmits<{(event:'close',r?:"reload"):void}>();
// 取消的方法
const close = (r?:"reload")  => {

    emits("close",r)
}
// 提交的方法
const modifyAdmin = async () =>{
    let res = await updateAdminInfoAPI(newForm.value.id as number,newForm.value); 
    if(res.code == 200){
        console.log("修改中。。。");
        
        close("reload")
    }
}
</script>
<style lang="less" scoped>
</style>