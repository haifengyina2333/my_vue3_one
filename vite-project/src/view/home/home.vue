<template>
  <div class="home">
    <div class="home_header">头部</div>
    <div class="home_menu">

          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
            text-color="#fff" @open="handleOpen" @close="handleClose"
            :unique-opened="true" :router="true">
            <!-- 处理了点开一个全部打开的问题，将 menu.id 变成string 类型，避免控制台报错 -->
            <el-sub-menu :index="menu.id + '' " v-for="menu in newMenus" :key="menu.id" >
              <template #title>
                <span> {{ menu.title }}</span>
              </template>
              <template v-for="index in menu.children" :key="index.id">
              <el-menu-item :index="'/'+menu.name + '/' + index.name" v-show="index.hidden==0">{{ index.title }}</el-menu-item>
            </template>
            </el-sub-menu>
          </el-menu>
  

    </div>
    <div class="home_context">右侧内容
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted ,computed } from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
const store = useStore();

const newMenus = computed(()=>
  store.getters['info/getNewMenus']
)

console.log(newMenus.value);

</script>
<style lang="less" scoped>
.home {
  position: relative;
  height: 100vh;

  .home_header {
    height: 70px;
    background-color: #ccc;
  }

  .home_menu {
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 250px;
  }

  .home_context {
    position: absolute;
    top: 70px;
    left: 250px;
    right: 0;
    bottom: 0;
  }
}
</style>