<template>
  <div class="articleTags">
    <div class="breadNav">
      <ul>
        <li>
          <router-link to="/dashboard">我的面板 /</router-link>
        </li>
        <li class="cur">文章标签</li>
      </ul>
    </div>
    <div class="tags">
      <div class="tagFn clear">
        <div class="addTag">
          <span>增加标签</span>
        </div>
        <div class="searchTag">
          <input type="text" name="search" placeholder="name...">
          <svg-icon icon-class="sousuo"></svg-icon>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>名称</td>
            <td>描述</td>
            <td>文章</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <svg-icon icon-class="name"></svg-icon>
              CSS
            </td>
            <td>
              <svg-icon icon-class="describe"></svg-icon>
              CSS世界</td>
            <td>
              <svg-icon icon-class="number"></svg-icon>
              1</td>
            <td>
              <span>修改</span>
              <span>删除</span>
              <svg-icon icon-class="drag"></svg-icon>
            </td>
          </tr>
          <tr>
            <td>
              <svg-icon icon-class="name"></svg-icon>
              React
            </td>
            <td>
              <svg-icon icon-class="describe"></svg-icon>
              前端框架</td>
            <td>
              <svg-icon icon-class="number"></svg-icon>
              0</td>
            <td>
              <span>修改</span>
              <span>删除</span>
              <svg-icon icon-class="drag"></svg-icon>
            </td>
          </tr>
          <tr>
            <td>
              <svg-icon icon-class="name"></svg-icon>
              Http
            </td>
            <td>
              <svg-icon icon-class="describe"></svg-icon>
              Http相关</td>
            <td>
              <svg-icon icon-class="number"></svg-icon>
              0</td>
            <td>
              <span>修改</span>
              <span>删除</span>
              <svg-icon icon-class="drag"></svg-icon>
            </td>
          </tr>
          <tr>
            <td>
              <svg-icon icon-class="name"></svg-icon>
              Node
            </td>
            <td>
              <svg-icon icon-class="describe"></svg-icon>
              RESTful API，koa</td>
            <td>
              <svg-icon icon-class="number"></svg-icon>
              0</td>
            <td>
              <span>修改</span>
              <span>删除</span>
              <svg-icon icon-class="drag"></svg-icon>
            </td>
          </tr>
          <tr>
            <td>
              <svg-icon icon-class="name"></svg-icon>
              Vue
            </td>
            <td>
              <svg-icon icon-class="describe"></svg-icon>
              世界上最好的框架</td>
            <td>
              <svg-icon icon-class="number"></svg-icon>
              0</td>
            <td>
              <span>修改</span>
              <span>删除</span>
              <svg-icon icon-class="drag"></svg-icon>
            </td>
          </tr>
          <tr>
            <td>
              <svg-icon icon-class="name"></svg-icon>
              JavaScript
            </td>
            <td>
              <svg-icon icon-class="describe"></svg-icon>
              JavaScript基础及深入</td>
            <td>
              <svg-icon icon-class="number"></svg-icon>
              0</td>
            <td>
              <span>修改</span>
              <span>删除</span>
              <svg-icon icon-class="drag"></svg-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "articleTags"
};
</script>

<style lang="less">
.articleTags {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
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
  .tags {
    background-color: #fff;
    border-radius: 6px;
    padding: 12px;
    box-sizing: border-box;
    margin: 10px 0;
    .tagFn {
      .addTag {
        float: left;
        font-size: 14px;
        color: #1f2b3d;
        span {
          display: block;
          padding: 5px 8px;
          border: 1px solid #c4c4c4;
          border-radius: 6px;
          text-align: center;
          box-sizing: border-box;
        }
      }
      .searchTag {
        width: 176px;
        height: 32px;
        float: right;
        text-align: right;
        border-radius: 5px;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          border: 1px solid #cfd7e3;
          border-radius: 5px;
          box-sizing: border-box;
          text-indent: 8px;
        }
        svg {
          position: absolute;
          top: 0;
          right: 8px;
          bottom: 0;
          margin: auto;
        }
      }
    }
    table {
      width: 100%;
      margin: 12px 0;
      border-collapse: collapse;
      tr {
        td {
          font-size: 14px;
          color: #3d4757;
          height: 32px;
          outline: 1px solid #e7ecf1;
          border: 1px solid #ebeff3;
          text-indent: 15px;
          svg{
            vertical-align: -3px;
          }
          &:last-of-type span {
            display: inline-block;
            width: 38px;
            height: 24px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 24px;
            border-radius: 5px;
            background-color: #5ac1dd;
            text-indent: 0;
            margin-right: 12px;
            &:last-of-type {
              background-color: #d9544e;
            }
          }
        }
      }
      thead {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>

