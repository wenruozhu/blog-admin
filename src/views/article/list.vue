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
              @click="switchTag(index)"
            >{{tag}}</li>
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
      tagIndex: 0
    };
  },
  created() {
    this.getAllAriticles();
  },
  filters: {
    publishTime(val) {
      console.log(typeof val);
      let time = val;
      time.substr(0, 19);
      // console.log(time)
      time.replace("T", " ");
      // console.log(time)
      return time;
    },
    category(val) {
      switch (val) {
        case 0:
          return "Code";
          break;
        case 1:
          return "Life";
        default:
          break;
      }
    },
    isPublic(val) {
      switch (val) {
        case 0:
          return "公开";
          break;
        case 1:
          return "私密";
        default:
          break;
      }
    },
    articleState(val) {
      switch (val) {
        case 0:
          return "发布";
          break;
        case 1:
          return "草稿";
        default:
          break;
      }
    }
  },
  methods: {
    switchTag(index) {
      this.tagIndex = index;
      let tags = index == 0 ? "" : this.tags[index];
      axios
        .get(`/api/v1/articles/queryArticle?tags=${tags}`)
        .then(res => {
          this.allArticles = res.data;
        })
        .catch(err => {});
    },
    getAllAriticles() {
      axios
        .get(`/api/v1/articles/getAllArticle`)
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
