

<template>



  <router-view >

    
  </router-view>
  
</template>

<script setup lang="ts">
import useInfoStore from "./store_pinia/info"
import useTodoStore from "./store_pinia/todo"
let infoStore = useInfoStore()






import {useStore} from "vuex"
let store = useStore()


</script>
<style scoped>



</style>;
