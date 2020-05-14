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
            <li
              v-for="(tag,index) in tags"
              :key="index"
              :class="{cur: tagIndex == index}"
              @click="tagIndex = index"
            >{{tag}}</li>
          </ul>
        </li>
        <li>
          <div class="tagTitle">分类：</div>
          <ul>
            <li
              v-for="(category,index) in category"
              :key="index"
              :class="{cur: categoryIndex == index}"
              @click="categoryIndex = index"
            >{{category}}</li>
          </ul>
        </li>
        <li>
          <div class="tagTitle">公开：</div>
          <ul>
            <li
              v-for="(item,index) in isPublic"
              :key="index"
              :class="{cur: isPublicIndex == index}"
              @click="isPublicIndex = index"
            >{{item}}</li>
          </ul>
        </li>
        <li>
          <div class="tagTitle">状态：</div>
          <ul>
            <li
              v-for="(item,index) in articleState"
              :key="index"
              :class="{cur: articleStateIndex == index}"
              @click="articleStateIndex = index"
            >{{item}}</li>
          </ul>
        </li>
        <li>
          <div class="tagTitle">搜索：</div>
          <div class="searchArticle">
            <input type="text" name="search" placeholder="标题，描述" />
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
          <tr v-for="(article,index) in allArticles">
            <td style="width:10%">
              <svg-icon icon-class="youjiantou"></svg-icon>
            </td>
            <td>{{article.title}}</td>
            <td>{{article.publishTime.substr(0,19).replace('T',' ')}}</td>
            <td>{{article.category | category}}</td>
            <td>{{article.isPublic | isPublic}}</td>
            <td>{{article.articleState | articleState}}</td>
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
  name: "list",
  data() {
    return {
      allArticles: [],
      tags: ["全部", "CSS", "JavaScript", "Vue", "React", "Http", "Node"],
      tagIndex: 0,
      category: ["全部", "Code", "Life"],
      categoryIndex: 0,
      isPublic: ["全部", "公开", "私密"],
      isPublicIndex: 0,
      articleState: ["全部", "已发布", "草稿"],
      articleStateIndex: 0,
      parameters: {
        tags: "",
        category: "",
        isPublic: "",
        articleState: ""
      } //切换不同状态传的参数
    };
  },
  created() {
    this.getAllAriticles();
  },
  watch: {
    tagIndex: function() {
      this.parameters.tags = this.tagIndex == 0 ? "" : this.tags[this.tagIndex]
      this.queryArticle(this.parameters)
    },
    categoryIndex: function() {
      this.parameters.category = this.categoryIndex == 0 ? "" : this.categoryIndex
      this.queryArticle(this.parameters)
    },
    isPublicIndex: function() {
      this.parameters.isPublic = this.isPublicIndex == 0 ? "" : this.isPublicIndex
      this.queryArticle(this.parameters)
    },
    articleStateIndex: function() {
      this.parameters.articleState = this.articleStateIndex == 0 ? "" : this.articleStateIndex
      this.queryArticle(this.parameters)  
    }
  },
  filters: {
    category(val) {
      switch (val) {
        case 1:
          return "Code";
          break;
        case 2:
          return "Life";
        default:
          break;
      }
    },
    isPublic(val) {
      switch (val) {
        case 1:
          return "公开";
          break;
        case 2:
          return "私密";
        default:
          break;
      }
    },
    articleState(val) {
      switch (val) {
        case 1:
          return "发布";
          break;
        case 2:
          return "草稿";
        default:
          break;
      }
    }
  },
  methods: {
    getAllAriticles() {
      axios
        .get(`/api/v1/articles/getAllArticle`)
        .then(res => {
          this.allArticles = res.data;
        })
        .catch(err => {});
    },
    queryArticle(params) {
      axios
        .post(`/api/v1/articles/queryArticle`, params, {
          headers: {
            Authorization: `Bearer ${localStorage.joeyToken}`
          }
        })
        .then(res => {
          this.allArticles = res.data;
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less">
@import "./list.less";
</style>
