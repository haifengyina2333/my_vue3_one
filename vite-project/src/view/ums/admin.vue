<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="180" />
        <el-table-column prop="username" label="账号" width="180" />
        <el-table-column prop="nickName" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="createTime" label="添加数据">
            <template v-slot:default="scope">
                <!--scope.row  该行的数据对象  -->
                {{ formateDate(scope.row.createTime) }}
            </template>
        </el-table-column>
        <el-table-column prop="loginTime" label="最后登录">
            <template v-slot:default="scope">
                <!--scope.row  该行的数据对象  -->
                {{ formateDate(scope.row.loginTime) }}
            </template>
        </el-table-column>

        <el-table-column prop="status" label="是否启用">
            <template v-slot:default="scope">
                <!--scope.row  该行的数据对象  -->
                <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" />
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-button type="text">分配角色</el-button>
                <el-button type="text" @click="editAdmin(row)">编辑</el-button>
            </template>
        </el-table-column>

    </el-table>
    <EditAdmin :visible="visible" @close="closeDialog" :form="rowData"></EditAdmin>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue'
import { getuserInfoApi } from "../../request/api"
import EditAdmin from "./components/Dialog.vue"
const state = reactive<{
    tableData: {}[],
    visible: boolean,
    rowData: AdminObject
}>({
    tableData: [],
    visible: false,
    rowData: {}
})
const { tableData, visible, rowData } = toRefs(state)
console.log(tableData);

const getInfo = () => {
    getuserInfoApi({
        keyword: '',
        pageNum: 1,
        pageSize: 10
    }).then(res => {
        if (res.code == 200) {
            tableData.value = res.data.list
        }
    })
    console.log("获取表格数据中。。。。");
    
}
getInfo();

// 时间初始化功能
const formateDate = (time?: string) => {
    if (!time) return '';
    const date = new Date(time);
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDay() + 1);
    let hour = addZero(date.getHours());
    let min = addZero(date.getMinutes());
    let sec = addZero(date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

const addZero = (num: number) => {
    return num > 9 ? num : "0" + num
}
// 编辑按钮功能
const editAdmin = (row: AdminObject) => {
    visible.value = !visible.value
    rowData.value = row
}
const closeDialog = (r?: "reload") => {
    visible.value = false
    if (r == "reload") {
        // 更新表格
        getInfo();
    }
}
</script>
<style lang="less" scoped></style>
