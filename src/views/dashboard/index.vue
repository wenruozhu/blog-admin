<template>
  <div class="dashboard">
    <div class="breadNav">
      <ul>
        <li>
          <router-link to="/dashboard">我的面板</router-link>
        </li>
      </ul>
    </div>
    .
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>
<style lang="less">
.dashboard {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  .breadNav {
    ul {
      li {
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        color: #798391;
        margin-right: 3px;
        &.cur {
          color: #a2aec4;
        }
        a {
          color: #5e697c;
        }
      }
    }
  }
}
</style>
