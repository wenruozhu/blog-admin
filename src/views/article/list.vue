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
            <input type="text" name="search" v-model="keyword" placeholder="标题，描述" />
            <span @click="searchArticle">
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
            <td>文章标题</td>
            <td>发布日期</td>
            <td>分类</td>
            <td>公开</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody style="width:100%">
          <tr v-for="(article,index) in inf_data" :key="index">
            <td>{{article.title}}</td>
            <td>{{article.publishTime}}</td>
            <td>{{article.category | category}}</td>
            <td>{{article.isPublic | isPublic}}</td>
            <td>{{article.articleState | articleState}}</td>
            <td>
              <span @click="editArticle(article)">修改</span>
              <transition-group name="btn" tag="span">
                <span
                  v-if="article.isPublic == 2"
                  key="1"
                  @click="changeStatus(article.id,'isPublic',1)"
                >公开</span>
                <span v-else key="2" @click="changeStatus(article.id,'isPublic',2)">私密</span>
              </transition-group>
              <transition-group name="btn" tag="span">
                <span
                  v-if="article.articleState == 2"
                  key="1"
                  @click="changeStatus(article.id,'articleState',1)"
                >发布</span>
                <span v-else key="2" @click="changeStatus(article.id,'articleState',2)">草稿</span>
              </transition-group>
              <span @click="deleteArticle(article.id)">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination" v-show="pageNum>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageChange"
        :current-page="currentPage"
        :total="pageNum"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");

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
      }, //切换不同状态传的参数
      keyword: "", //关键字查询
      inf_data: "", //显示数据
      pageNum: 0, //页码数
      pageIdx: 1, //页码索引
      currentPage: 1,
      all_data: "" //所有数据
    };
  },
  created() {
    this.getAllAriticles();
  },
  watch: {
    tagIndex: function() {
      this.parameters.tags = this.tagIndex == 0 ? "" : this.tags[this.tagIndex];
      this.queryArticle(this.parameters);
    },
    categoryIndex: function() {
      this.parameters.category =
        this.categoryIndex == 0 ? "" : this.categoryIndex;
      this.queryArticle(this.parameters);
    },
    isPublicIndex: function() {
      this.parameters.isPublic =
        this.isPublicIndex == 0 ? "" : this.isPublicIndex;
      this.queryArticle(this.parameters);
    },
    articleStateIndex: function() {
      this.parameters.articleState =
        this.articleStateIndex == 0 ? "" : this.articleStateIndex;
      this.queryArticle(this.parameters);
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
          break;
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
          break;
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
        .get(this.IP + `/api/v1/articles/getAllArticle`)
        .then(res => {
          for (const article of res.data) {
            article.publishTime = moment(article.publishTime).format(
              "YYYY年 MMM DD日 HH:mm:ss"
            );
          }
          const paging_data = this.data_paging(res.data, 8);
          this.pageNum = paging_data.total;
          this.currentPage = 1;
          this.inf_data = paging_data.da_ta;
          this.all_data = paging_data.value_data;
          this.pageChange(this.pageIdx);
        })
        .catch(err => {});
    },
    queryArticle(params) {
      this.axios
        .post(this.IP + `/api/v1/articles/queryArticle`, params)
        .then(res => {
          for (const article of res.data) {
            article.publishTime = moment(article.publishTime).format(
              "YYYY年 MMM DD日 HH:mm:ss"
            );
          }
          const paging_data = this.data_paging(res.data, 8);
          this.pageNum = paging_data.total;
          this.currentPage = 1;
          this.inf_data = paging_data.da_ta;
          this.all_data = paging_data.value_data;
          this.pageChange(this.pageIdx);
        })
        .catch(err => {});
    },
    searchArticle() {
      const params = {
        keyword: this.keyword
      };

      if (this.keyword == "") {
        this.$notify({
          title: "提示",
          message: "关键字不能为空！",
          type: "warning"
        });
        return;
      }
      this.axios
        .post(this.IP + `/api/v1/articles/searchArticle`, params)
        .then(res => {
          for (const article of res.data) {
            article.publishTime = moment(article.publishTime).format(
              "YYYY年 MMM DD日 HH:mm:ss"
            );
          }
          const paging_data = this.data_paging(res.data, 8);
          this.pageNum = paging_data.total;
          this.currentPage = 1;
          this.inf_data = paging_data.da_ta;
          this.all_data = paging_data.value_data;
          this.pageChange(this.pageIdx);
        })
        .catch(err => {});
    },
    editArticle(article) {
      // console.log(article)
      this.$store.commit("updateArticle", article);
      this.$router.push({
        name: "articleRelease",
        params: { edit: true }
      });
    },
    changeStatus(id, status, state) {
      const params = {};
      if (status == "isPublic") {
        params.isPublic = state;
      } else {
        params.articleState = state;
      }
      this.axios
        .put(this.IP + `/api/v1/articles/updateStatus/${id}`, params)
        .then(res => {
          if (res.status == 200) {
            this.$notify({
              title: "成功",
              message: "文章状态更新成功",
              type: "success"
            });
          }
          this.getAllAriticles();
        });
    },
    deleteArticle(id) {
      this.axios
        .delete(`/api/v1/articles/${id}`)
        .then(res => {
          if (res.status == 200) {
            this.$notify({
              title: "成功",
              message: "删除文章成功",
              type: "success"
            });
            this.queryArticle(this.parameters);
          }
        })
        .catch(err => {});
    },
    pageChange(pageIdx) {
      this.inf_data = this.all_data[pageIdx - 1];
      this.currentPage = pageIdx;
    }
  }
};
</script>

<style lang="less">
.btn-enter-active,
.btn-leave-active {
  transition: all 0.5s;
}

.btn-enter,
.btn-leave-active {
  opacity: 0;
  transform: translateX(30px);
}

.btn-move {
  transition: all 0.5s;
}

.btn-leave-active {
  position: absolute;
}
.list {
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

  .filterArticle {
    margin: 10px 0;
    background-color: #fff;
    border-radius: 6px;

    ul.allArticle {
      padding: 8px 20px;

      > li {
        padding: 8px 0;
        border-bottom: 1px dashed #d6d6d6;

        &:last-of-type {
          line-height: 36px;
          border-bottom: none;
        }

        .tagTitle {
          display: inline-block;
          font-size: 14px;
          color: #5e5e5e;
        }

        ul {
          display: inline-block;
          margin-left: 10px;

          li {
            display: inline-block;
            padding: 0 8px;
            margin-right: 18px;
            line-height: 32px;
            font-size: 14px;
            color: #000d21;
            letter-spacing: 1px;
            cursor: pointer;

            &.cur {
              color: #e5e6e6;
              border-radius: 6px;
              background-color: #24292e;
            }
          }
        }

        .searchArticle {
          display: inline-block;
          margin-left: 10px;

          [type="text"] {
            width: 248px;
            height: 30px;
            text-indent: 8px;
            font-size: 14px;
            color: #9ba8c0;
            border: 1px solid #d3dae5;
            border-radius: 6px;
            box-sizing: border-box;
          }

          span {
            display: inline-block;
            width: 66px;
            height: 30px;
            background: #24292e;
            border-radius: 6px;
            font-size: 14px;
            color: #f4f4f5;
            text-align: center;
            line-height: 30px;
            margin-left: 8px;
            cursor: pointer;

            svg {
              margin-right: 3px;
            }
          }
        }
      }
    }
  }

  .accordArticle {
    padding: 12px;
    border-radius: 6px;
    background-color: #fff;

    table {
      width: 100%;
      border-collapse: collapse;

      thead {
        line-height: 36px;
        background-color: #f2f2f2;

        tr {
          td {
            font-size: 14px;
            color: #414b5a;
            text-align: center;
            outline: 1px solid #f3f5f9;
            border: 1px solid #e4e8ed;
          }
        }
      }

      tbody {
        position: relative;

        tr {
          position: relative;

          td {
            line-height: 36px;
            font-size: 14px;
            color: #4c5563;
            text-align: center;
            outline: 1px solid #f3f5f9;
            border: 1px solid #e4e8ed;

            span {
              display: inline-block;
              width: 39px;
              height: 24px;
              line-height: 24px;
              margin-right: 8px;
              font-size: 12px;
              font-weight: 400;
              color: #fff;
              background-color: #5ac1dd;
              border-radius: 5px;
              cursor: pointer;

              &:nth-of-type(2n) {
                span {
                  background-color: #409eff;
                }
              }

              &:nth-of-type(3n) {
                span {
                  background-color: orange;
                }
              }

              &:last-of-type {
                background-color: #f56c6c;
              }
            }
          }
        }
      }
    }
  }
  .el-pagination {
    margin: 32px 0;
    text-align: center;
  }
}
</style>
