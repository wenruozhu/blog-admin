<template>
    <div class="layout">
        <head-nav></head-nav>
        <side-nav></side-nav>
        <app-main></app-main>
    </div>
</template>

<script>
import HeadNav from '@/components/common/HeadNav.vue'
import SideNav from '@/components/common/SideNav.vue'
import AppMain from './components/AppMain.vue'
export default {
  name: 'layout',
  components: {
    HeadNav,
    SideNav,
    AppMain
  }
}
</script>

<style>
.layout{
    min-height: 100%;
    background-color: #f2f2f2;
}
</style>
