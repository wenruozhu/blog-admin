<template>
  <section class="AppMain">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "appmain",
  computed: {
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style lang="less">
.AppMain {
  min-height: 100%;
  padding-top: 52px;
  padding-left: 180px;
  box-sizing: border-box;
  overflow: hidden;
  @keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale3d(.98, .98, .98);
    }

    to {
        opacity: 1;
        transform: scale3d(1, 1, 1);
    }
  }

  .fade-enter-active {
    animation-name: fadeIn;
    animation-duration: 0.8s;
  }
  @keyframes fadeOut {
    from {
        opacity: 1;
        transform: scale3d(1, 1, 1);
    }

    to {
        opacity: 0;
        transform: scale3d(.98, .98, .98);
    }
  }

  .fade-leave-active {
    animation-name: fadeOut;
    animation-duration: 0.3s;
  }
}
</style>

