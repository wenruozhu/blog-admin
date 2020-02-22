<template>
  <div class="list">
    <div class="breadNav">
      <ul>
        <li>
          <router-link to="/dashboard">我的面板 /</router-link>
        </li>
        <li>文章管理 /</li>
        <li class="cur">文章列表</li>
      </ul>
    </div>
    <div class="filterArticle">
      <ul class="allArticle">
        <li>
          <div class="tagTitle">标签：</div>
          <ul>
            <li v-for="(tag,index) in tags" :key="index" @click="switchArticle()">{{tag}}</li>
          </ul>
        </li>
        <li>
          <div class="tagTitle">分类：</div>
          <ul>
            <li class="cur">全部</li>
            <li>Code</li>
            <li>Life</li>
          </ul>
        </li>
        <li>
          <div class="tagTitle">公开：</div>
          <ul>
            <li class="cur">全部</li>
            <li>公开</li>
            <li>私密</li>
          </ul>
        </li>
        <li>
          <div class="tagTitle">状态：</div>
          <ul>
            <li class="cur">全部</li>
            <li>已发布</li>
            <li>草稿</li>
          </ul>
        </li>
        <li>
          <div class="tagTitle">搜索：</div>
          <div class="searchArticle">
            <input type="text" name="search" placeholder="标题，描述">
            <span>
              <svg-icon icon-class="sousuo"></svg-icon>查询
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="accordArticle">
      <table>
        <thead>
          <tr>
            <td></td>
            <td>文章标题</td>
            <td>发布日期</td>
            <td>分类</td>
            <td>公开</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody style="width:100%">
          <tr>
            <td style="width:10%">
              <svg-icon icon-class="youjiantou"></svg-icon>
            </td>
            <td>你不知道的JavaScript（上卷）</td>
            <td>2019-2-8 12:28</td>
            <td>Code</td>
            <td>公开</td>
            <td>发布</td>
            <td>
              <span>修改</span>
              <span>私密</span>
              <span>草稿</span>
            </td>
            <!-- <ul>
              <li>
                <span>标签</span>
                <span>作用域和闭包</span>
              </li>
              <li>
                <span>关键字</span>
                <span>JavaScript function</span>
              </li>
              <li>
                <span>描述</span>
                <span>作用域是根据名称查找变量的一套规则。</span>
              </li>
            </ul>-->
          </tr>
          <!-- <collapse class="articleDetail" style="width:100%"> -->
          <!-- <table> -->
          <tr>
            <td style="width:10%"></td>
            <td>标签</td>
            <td>作用域和闭包</td>
          </tr>
          <tr>
            <td style="width:10%"></td>
            <td>关键字</td>
            <td>JavaScript function</td>
          </tr>
          <tr>
            <td style="width:10%"></td>
            <td>描述</td>
            <td>作用域是根据名称查找变量的一套规则。</td>
          </tr>
          <!-- </table> -->
          <!-- </collapse> -->
          <tr>
            <td style="width:10%">
              <svg-icon icon-class="youjiantou"></svg-icon>
            </td>
            <td>你不知道的JavaScript（中卷）</td>
            <td>2019-2-8 12:28</td>
            <td>Code</td>
            <td>公开</td>
            <td>发布</td>
            <td>
              <span>修改</span>
              <span>私密</span>
              <span>草稿</span>
            </td>
          </tr>
          <tr>
            <td style="width:10%">
              <svg-icon icon-class="youjiantou"></svg-icon>
            </td>
            <td>你不知道的JavaScript（下卷）</td>
            <td>2019-2-8 12:28</td>
            <td>Code</td>
            <td>公开</td>
            <td>发布</td>
            <td>
              <span>修改</span>
              <span>私密</span>
              <span>草稿</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      tags: ['全部', 'CSS', 'JavaScript', 'Vue', 'React', 'Http', 'Node']
    }
  },
  methods: {
    switchArticle () {

    }
  }
}
</script>

<style lang="less">
@import "./list.less";
</style>
