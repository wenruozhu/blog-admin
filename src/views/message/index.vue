<template>
  <div class="message">
    <div class="breadNav">
      <ul>
        <li>
          <router-link to="/dashboard">我的面板 /</router-link>
        </li>
        <li class="cur">留言列表</li>
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
        <tr v-for="(message,index) in messageList" :key="index">
          <td>{{message.name}}</td>
          <td>{{message.message}}</td>
          <td>
            <!-- <span @click="editMessage(message)">修改</span> -->
            <span @click="deleteMessage(message.id)">删除</span>
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
    </div>-->
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      messageList: [] //获取留言列表
    };
  },
  created() {
    this.getMessage();
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
    getMessage() {
      axios
        .get(`/api/v1/message`)
        .then(res => {
          this.messageList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
.message {
  height: 100%;
  padding: 16px;
  background-color: #fff;
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
}
</style>