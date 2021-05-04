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
      <div class="tagFn">
        <div class="addTag" @click="addTag">增加标签</div>
        <!-- <div class="searchTag">
          <input type="text" name="search" placeholder="name..." />
          <svg-icon icon-class="sousuo"></svg-icon>
        </div>-->
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="标签名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="标签描述" :label-width="formLabelWidth">
            <el-input v-model="form.description" clearable autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitTag">确 定</el-button>
        </div>
      </el-dialog>
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
          <tr v-for="(tag,index) in tagList" :key="index">
            <td>
              <svg-icon icon-class="name"></svg-icon>
              {{tag.name}}
            </td>
            <td style="width:70%;">
              <svg-icon icon-class="describe"></svg-icon>
              {{tag.description}}
            </td>
            <td>{{tagCount[index][0].num}}</td>
            <td>
              <span @click="alterTag(tag)">修改</span>
              <span @click="deleteTag(tag.id)">删除</span>
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
  name: "articleTags",
  data() {
    return {
      tagCount: [],
      tagList: [],
      dialogFormVisible: false,
      form: {
        name: "",
        description: "",
        tagState: false, //标签的状态 默认为新增
        tagId: ""
      },
      formLabelWidth: "100px",
      title: "添加标签"
    };
  },
  created() {
    this.getAllTag();
  },
  methods: {
    addTag() {
      this.form.tagState = false;
      this.title = "添加标签";
      this.form.name = "";
      this.form.description = "";
      this.dialogFormVisible = true;
    },
    deleteTag(id) {
      this.axios.delete(this.IP + `/api/v1/tags/${id}`).then(res => {
        if (res.status == 200) {
          this.getAllTag();
          this.$notify({
            title: "成功",
            message: "删除标签成功",
            type: "success"
          });
        }
      });
    },
    getAllTag() {
      this.axios.get(this.IP + `/api/v1/tags`).then(res => {
        this.tagCount = res.data.count;
        this.tagList = res.data.tags;
      });
    },
    alterTag(tag) {
      this.form.tagState = true;
      this.title = "修改标签";
      this.form.name = tag.name;
      this.form.description = tag.description;
      this.form.tagId = tag.id;
      this.dialogFormVisible = true;
    },
    submitTag() {
      let params = {
        name: this.form.name,
        description: this.form.description
      };
      if (this.form.name == "") {
        this.$notify({
          title: "警告",
          message: "标签名称不能为空",
          type: "warning"
        });
        return;
      } else if (this.form.description == "") {
        this.$notify({
          title: "警告",
          message: "标签描述不能为空",
          type: "warning"
        });
        return;
      } else {
        if (!this.form.tagState) {
          this.axios
            .post(this.IP + `/api/v1/tags`, params)
            .then(res => {
              const data = res;
              if (res.status == 200) {
                this.getAllTag();
                this.dialogFormVisible = false;
                this.$notify({
                  title: "成功",
                  message: "添加标签成功",
                  type: "success"
                });
              }
            })
            .catch(err => {});
        } else {
          this.axios
            .put(this.IP + `/api/v1/tags/${this.form.tagId}`, params)
            .then(res => {
              if (res.status == 200) {
                this.getAllTag();
                this.dialogFormVisible = false;
                this.$notify({
                  title: "成功",
                  message: "修改标签信息成功",
                  type: "success"
                });
              }
            });
        }
      }
    }
  }
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
      display: flex;
      justify-content: space-between;
      .addTag {
        padding: 6px 12px;
        border: 1px solid #c4c4c4;
        border-radius: 6px;
        text-align: center;
        font-size: 14px;
        color: #1f2b3d;
        cursor: pointer;
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
          height: 38px;
          font-size: 14px;
          color: #3d4757;
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
  }
}
</style>
