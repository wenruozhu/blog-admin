<template>
  <div class="comments">
    <div class="breadNav">
      <ul>
        <li>
          <router-link to="/dashboard">我的面板 /</router-link>
        </li>
        <li>文章管理 /</li>
        <li class="cur">文章评论</li>
      </ul>
    </div>
    <table>
      <thead>
        <tr>
          <td>名字</td>
          <td>内容</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(comment,index) in commentList" :key="index">
          <td>{{comment.nickname}}</td>
          <td>{{comment.content}}</td>
          <td>
            <span @click="verifyComment(comment.id)">通过</span>
            <span @click="deleteComment(comment.id)">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="pagination" v-show="pageNum>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageChange"
        :current-page="currentPage"
        :total="pageNum"
      ></el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "comments",
  data() {
    return {
      commentList: [] //获取评论列表
    };
  },
  created() {
    this.getComments();
  },

  methods: {
    deleteMessage(messageId) {
      axios
        .delete(`/api/v1/message/${messageId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.joeyToken}`
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.getMessage();
            this.$notify({
              title: "成功",
              message: "删除留言成功",
              type: "success"
            });
          }
        });
    },
    getComments() {
      axios
        .get(`/api/v1/comment`)
        .then(res => {
          this.commentList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    verifyMessage(messageId) {
      axios
        .put(`/api/v1/message/${messageId}`)
        .then(res => {
          if (res.status == 200) {
            this.$notify({
              title: "成功",
              message: "留言审核通过",
              type: "success"
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
.comments {
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
  table {
    width: 100%;
    margin: 12px 0;
    border-collapse: collapse;
    tr {
      td {
        font-size: 14px;
        color: #3d4757;
        outline: 1px solid #e7ecf1;
        text-indent: 15px;
        &:nth-of-type(2n) {
          max-width: 800px;
          padding: 8px;
        }
        span {
          cursor: pointer;
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
        &:last-of-type {
          text-align: center;
        }
      }
    }
    thead {
      background-color: #f2f2f2;
    }
  }
  .pagination {
    margin: 20px 0;
    text-align: center;
  }
  .el-pagination {
    margin: 32px 0;
    text-align: center;
  }
}
</style>