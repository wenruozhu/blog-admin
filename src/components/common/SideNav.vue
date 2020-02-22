<template>
  <div class="sideNav">
    <ul class="one">
      <li>
        <router-link to="/dashboard">
          <div class="menuItem">
            <svg-icon icon-class="shouye"></svg-icon>
            <span>我的面板</span>
          </div>
        </router-link>
      </li>
      <li>
        <div class="menu-title" @click="article = !article" :class="{opened:article}">
          <svg-icon icon-class="guanli"></svg-icon>
          <span>文章管理</span>
          <svg-icon id="arrow" icon-class="downArrow"></svg-icon>
        </div>

        <collapse>
          <div class="submenu" v-show="article">
            <ul>
              <li>
                <router-link to="/article/list">
                  <div class="subMenuItem">
                    <svg-icon icon-class="liebiao"></svg-icon>
                    <span>文章列表</span>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link to="/article/release">
                  <div class="subMenuItem">
                    <svg-icon icon-class="fabu"></svg-icon>
                    <span>发布文章</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </collapse>
      </li>
      <li>
        <router-link to="/tag">
          <div class="menuItem">
            <svg-icon icon-class="biaoqian"></svg-icon>
            <span>文章标签</span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/personal">
          <div class="menuItem">
            <svg-icon icon-class="gerenzhongxin"></svg-icon>
            <span>个人中心</span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/analysis">
          <div class="menuItem">
            <svg-icon icon-class="fenxi"></svg-icon>
            <span>数据分析</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import collapse from '../../assets/js/collapse'

export default {
  name: 'SideNav',
  components: {
    collapse
  },
  data () {
    return {
      article: false
    }
  },
  methods: {}
}
</script>
<style lang="less">
.sideNav {
  width: 180px;
  height: 100%;
  position: fixed;
  top: 52px;
  bottom: 0;
  left: 0;
  background-color: rgb(48, 65, 86);
  ul.one {
    > li {
      width: 100%;
      font-size: 14px;
      line-height: 52px;
      fill: currentColor;
      cursor: pointer;
      box-sizing: border-box;
      a {
        display: block;
        color: rgb(191, 203, 217);
        .menuItem {
          height: 52px;
          transition: background-color 0.8s, color 0.8s;
          padding: 0 20px;
          position: relative;
          .svg-icon {
            margin-right: 16px;
          }
          span {
            vertical-align: middle;
          }
        }
        &.router-link-active {
          color: rgb(64, 158, 255);
        }
      }
      .menu-title {
        height: 52px;
        line-height: 52px;
        color: rgb(191, 203, 217);
        transition: background-color 0.8s, color 0.8s;
        padding: 0 20px;
        position: relative;
        .svg-icon {
          margin-right: 16px;
        }
        span {
          vertical-align: middle;
        }
        &:hover {
          background-color: rgb(38, 52, 69);
        }
        #arrow {
          margin-right: 0;
          position: absolute;
          top: 50%;
          right: 20px;
          margin-top: -7.7px;
          transition: transform 0.3s;
        }
        &.opened {
          #arrow {
            transform: rotateZ(180deg);
          }
        }
      }
      .submenu {
        background-color: #1f2d3d;
        ul {
          .subMenuItem {
            line-height: 52px;
            padding-left: 36px;
            box-sizing: border-box;
            transition: background-color 0.8s, color 0.8s;
            svg {
              margin-right: 16px;
            }
            span {
              vertical-align: middle;
            }
            &:hover {
              background-color: #001528;
            }
          }
        }
      }
      & .menuItem:hover {
        background-color: rgb(38, 52, 69);
      }
    }
  }
}
</style>
