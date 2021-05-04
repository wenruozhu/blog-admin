<template>
  <div class="book">
    <div class="breadNav">
      <ul>
        <li>
          <router-link to="/dashboard">我的面板 /</router-link>
        </li>
        <li class="cur">阅读列表</li>
      </ul>
    </div>
    <div class="books">
      <div class="bookFn">
        <div class="addBook" @click="addBook">添加书籍</div>
        <!-- <div class="searchTag">
          <input type="text" name="search" placeholder="name..." />
          <svg-icon icon-class="sousuo"></svg-icon>
        </div>-->
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="书籍名称" clearable :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="书籍作者" clearable :label-width="formLabelWidth">
            <el-input v-model="form.author" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="书籍评分" clearable :label-width="formLabelWidth">
            <el-input v-model="form.score" autocomplete="off"></el-input>
            <!-- <el-rate v-model="form.score" :colors="form.colors"></el-rate> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitChange">确 定</el-button>
        </div>
      </el-dialog>
      <table>
        <thead>
          <tr>
            <td>名称</td>
            <td>作者</td>
            <td>评分</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book,index) in inf_data" :key="index">
            <td>
              <svg-icon icon-class="name"></svg-icon>
              {{book.name}}
            </td>
            <td>
              <svg-icon icon-class="describe"></svg-icon>
              {{book.author}}
            </td>
            <td>
              <svg-icon icon-class="number"></svg-icon>
              {{book.score}}
            </td>
            <td>
              <span @click="editBook(book)">修改</span>
              <span @click="deleteBook(book.id)">删除</span>
              <svg-icon icon-class="drag"></svg-icon>
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>

<script>
export default {
  name: "book",
  data() {
    return {
      bookList: "",
      dialogFormVisible: false,
      form: {
        bookId: "",
        name: "",
        author: "",
        score: "",
        bookState: false //记录书籍编辑状态 false为新增 true为修改
      },
      formLabelWidth: "100px",
      title: "添加书籍",
      inf_data: "", //显示数据
      pageNum: 0, //页码数
      pageIdx: 1, //页码索引
      currentPage: 1,
      all_data: "" //所有数据
    };
  },
  created() {
    this.getAllBook();
  },
  methods: {
    addBook() {
      this.form.name = "";
      this.form.author = "";
      this.form.score = "";
      this.title = "添加书籍";
      this.form.bookState = false;
      this.dialogFormVisible = true;
    },
    deleteBook(bookId) {
      this.axios.delete(this.IP + `/api/v1/book/${bookId}`).then(res => {
        if (res.status == 200) {
          this.getAllBook();
          this.$notify({
            title: "成功",
            message: "删除书籍成功",
            type: "success"
          });
        }
      });
    },
    getAllBook() {
      this.axios
        .get(this.IP + `/api/v1/book`)
        .then(res => {
          const paging_data = this.data_paging(res.data, 8);
          this.pageNum = paging_data.total;
          this.currentPage = 1;
          this.inf_data = paging_data.da_ta;
          this.all_data = paging_data.value_data;
          this.pageChange(this.pageIdx);
        })
        .catch(err => {});
    },
    editBook(book) {
      this.dialogFormVisible = true;
      this.form.bookState = true;
      this.form.bookId = book.id;
      this.form.name = book.name;
      this.form.author = book.author;
      this.form.score = book.score;
      this.title = "修改书籍信息";
    },
    submitChange() {
      let params = {
        name: this.form.name,
        author: this.form.author,
        score: this.form.score
      };
      if (this.form.name == "") {
        this.$notify({
          title: "警告",
          message: "书籍名称不能为空",
          type: "warning"
        });
        return;
      } else if (this.form.author == "") {
        this.$notify({
          title: "警告",
          message: "书籍作者不能为空",
          type: "warning"
        });
        return;
      } else if (this.form.score == "") {
        this.$notify({
          title: "警告",
          message: "书籍评分不能为空",
          type: "warning"
        });
        return;
      } else {
        if (!this.form.bookState) {
          this.axios
            .post(this.IP + `/api/v1/book`, params)
            .then(res => {
              if (res.status == 200) {
                this.getAllBook();
                this.dialogFormVisible = false;
                this.$notify({
                  title: "成功",
                  message: "添加书籍成功",
                  type: "success"
                });
              }
            })
            .catch(err => {});
        } else {
          this.axios
            .put(this.IP + `/api/v1/book/${this.form.bookId}`, params)
            .then(res => {
              if (res.status == 200) {
                this.getAllBook();
                this.dialogFormVisible = false;
                this.$notify({
                  title: "成功",
                  message: "修改书籍信息成功",
                  type: "success"
                });
              }
            })
            .catch(err => {});
        }
      }
    },
    pageChange(pageIdx) {
      this.inf_data = this.all_data[pageIdx - 1];
      this.currentPage = pageIdx;
    }
  }
};
</script>

<style lang="less">
.book {
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
  .books {
    background-color: #fff;
    border-radius: 6px;
    padding: 12px;
    box-sizing: border-box;
    margin: 10px 0;
    .bookFn {
      display: flex;
      justify-content: space-between;
      .addBook {
        padding: 6px 12px;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        color: #1f2b3d;
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
          height: 38px;
          outline: 1px solid #e7ecf1;
          border: 1px solid #ebeff3;
          text-indent: 15px;
          svg {
            vertical-align: -3px;
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
}
</style>