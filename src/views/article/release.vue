<template>
  <div class="release">
    <div class="articleInfo">
      <h6>发布文章</h6>
      <ul>
        <li>
          <span>标题：</span>
          <input type="text" name="title" v-model="title" placeholder="文章标题" />
        </li>
        <li>
          <span>摘要：</span>
          <textarea name="descript" v-model="descript" cols="30" rows="3"></textarea>
        </li>
        <li>
          <span>分类：</span>
          <div class="category">
            <input type="radio" name="category" checked value="1" v-model="category" id="code" />
            <label for="code">Code</label>
            <input type="radio" name="category" value="2" v-model="category" id="life" />
            <label for="life">Life</label>
          </div>
        </li>
        <li>
          <span>公开：</span>
          <div class="public">
            <input type="radio" name="public" checked value="1" v-model="isPublic" id="public" />
            <label for="public">公开</label>
            <input type="radio" name="public" value="2" v-model="isPublic" id="private" />
            <label for="private">私密</label>
          </div>
        </li>
        <li>
          <span>状态：</span>
          <div class="state">
            <input
              type="radio"
              name="published"
              checked
              value="1"
              v-model="articleState"
              id="published"
            />
            <label for="published">发布</label>
            <input type="radio" name="draft" value="2" v-model="articleState" id="draft" />
            <label for="draft">草稿</label>
          </div>
        </li>
        <li>
          <span>标签：</span>
          <div class="tag">
            <ul>
              <li v-for="(tag,index) in tagList">
                <input type="checkbox" name="tag" :value="tag.name" :id="tag.name" v-model="tags" />
                <label :for="tag.name">{{tag.name}}</label>
              </li>
            </ul>
          </div>
        </li>
        <li class="btn">
          <button @click="publishArticle">发布</button>
        </li>
      </ul>
      <mavon-editor ref="md" @imgAdd="$imgAdd" v-model="content"></mavon-editor>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "release",
  data() {
    return {
      articleId: "", //文章编号
      title: "", //标题
      descript: "", //摘要
      category: 1, //1 code 2 life
      articleState: 1, //1 发布 2 草稿
      isPublic: 1, //1 公开 2 私密
      tags: [],
      tagList: [],
      content: ""
    };
  },
  created() {
    this.getAllTag();
    if (this.$route.params.edit) {
      const article = this.$store.state;
      this.articleId = article.id;
      this.title = article.title;
      this.descript = article.descript;
      this.category = article.category;
      this.articleState = article.articleState;
      this.isPublic = article.isPublic;
      this.tags = JSON.parse(article.tags);
      this.content = article.content;
    }
  },
  methods: {
    publishArticle() {
      const params = {
        articleId: this.articleId,
        title: this.title,
        descript: this.descript,
        category: this.category,
        articleState: this.articleState,
        isPublic: this.isPublic,
        tags: JSON.stringify(this.tags),
        content: this.content
      };
      if (this.$route.params.edit) {
        this.axios
          .put(this.IP + `/api/v1/articles/update/${this.articleId}`, params)
          .then(res => {
            if (res.status == 200) {
              this.$router.push("/article/list");
              setTimeout(() => {
                this.$notify({
                  title: "成功",
                  message: "文章更新成功",
                  type: "success"
                });
              }, 300);
            }
          });
      } else {
        if (!this.title) {
          this.$notify({
            title: "提示",
            message: "标题不能为空",
            type: "warning"
          });
          return;
        }
        this.axios.post(this.IP + `/api/v1/articles/`, params).then(res => {
          if (res.status == 200) {
            this.$notify({
              title: "成功",
              message: "文章发布成功",
              type: "success"
            });
            this.$router.push("/article/list");
          }
        });
      }
    },
    getAllTag() {
      this.axios.get(this.IP + `/api/v1/tags`).then(res => {
        this.tagList = res.data.tags;
      });
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formData = new FormData();
      formData.append("image", $file);
      this.axios
        .post(this.IP + `/api/v1/upload/uploadPic`, formData, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        })
        .then(res => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, res.data);
        });
    }
  },
  components: {
    mavonEditor
  }
};
</script>

<style lang="less">
.release {
  padding: 16px;
  min-height: 100%;
  .articleInfo {
    position: relative;
    background-color: #fff;
    border-radius: 6px;
    padding: 28px;
    h6 {
      font-size: 16px;
      font-weight: 400;
      color: #6b6b6b;
    }
    ul {
      margin: 18px 0;
      li {
        display: flex;
        line-height: 50px;
        position: relative;
        .category,
        .public,
        .state,
        .tag {
          position: absolute;
          top: 0;
          left: 72px;
          label {
            margin: 12px;
          }
          ul {
            li {
              display: inline-block;
            }
          }
        }
        span {
          font-size: 12px;
          color: #8f97a4;
        }
        input[type="text"] {
          width: 320px;
          height: 28px;
          text-indent: 8px;
          position: absolute;
          top: 0;
          left: 72px;
          bottom: 0;
          margin: auto;
          border: 1px solid #d2d9e4;
          border-radius: 6px;
          box-sizing: border-box;
        }
        textarea {
          width: 320px;
          height: 80px;
          line-height: 1.5;
          position: absolute;
          top: 0;
          left: 72px;
          bottom: 0;
          margin: auto;
          resize: none;
          padding: 0.3rem 0.5rem;
          border: 1px solid #d2d9e4;
          color: #24292e;
          border-radius: 6px;
          box-sizing: border-box;
        }
        &.btn {
          input,
          button {
            font-size: 12px;
            padding: 8px 28px;
            color: #fff;
            border-radius: 6px;
            background-color: #f56c6c;
            cursor: pointer;
            margin-right: 12px;
          }
          button {
            background-color: #409eff;
          }
        }
        &:nth-of-type(2) {
          align-items: center;
          line-height: 90px;
        }
      }
    }
  }
}
</style>
