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
          <span>tag：</span>
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
      <froala id="edit" :tag="'textarea'" :config="config" v-model="content"></froala>
    </div>
  </div>
</template>

<script>
import VueFroala from "vue-froala-wysiwyg";
export default {
  name: "release",
  data() {
    return {
      articleId: "", //文章编号
      title: "",
      category: 1, //1 code 2 life
      articleState: 1, //1 发布 2 草稿
      isPublic: 1, //1 公开 2 私密
      tags: [],
      tagList: [],
      content: "say something",
      // 富文本编辑器配置
      config: {
        events: {
          initialized: function() {}
        },
        quickInsertEnabled: false,
        height: 500,
        imageStyles: {
          class1: "Class 1",
          class2: "Class 2"
        },
        imageEditButtons: [
          "imageReplace",
          "imageAlign",
          "imageCaption",
          "imageRemove",
          "|",
          "imageLink",
          "linkOpen",
          "linkEdit",
          "linkRemove",
          "-",
          "imageDisplay",
          "imageStyle",
          "imageAlt",
          "imageSize"
        ],
        toolbarButtons: {
          moreText: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
              "fontFamily",
              "fontSize",
              "textColor",
              "backgroundColor",
              "inlineClass",
              "inlineStyle",
              "clearFormatting"
            ],
            align: "left",
            buttonsVisible: 3
          },
          moreParagraph: {
            buttons: [
              "alignLeft",
              "alignCenter",
              "formatOLSimple",
              "alignRight",
              "alignJustify",
              "formatOL",
              "formatUL",
              "paragraphFormat",
              "paragraphStyle",
              "lineHeight",
              "outdent",
              "indent",
              "quote"
            ],
            align: "left",
            buttonsVisible: 3
          },

          moreRich: {
            buttons: [
              "insertLink",
              "insertImage",
              "insertVideo",
              "insertTable",
              "emoticons",
              "fontAwesome",
              "specialCharacters",
              "embedly",
              "insertFile",
              "insertHR"
            ],
            align: "left",
            buttonsVisible: 3
          },

          moreMisc: {
            buttons: [
              "undo",
              "redo",
              "fullscreen",
              "print",
              "getPDF",
              "spellChecker",
              "selectAll",
              "html",
              "help"
            ],
            align: "right",
            buttonsVisible: 2
          }
        }
      }
    };
  },
  created() {
    this.getAllTag();
    if (this.$route.params.edit) {
      const article = this.$store.state;
      this.articleId = article.id;
      this.title = article.title;
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
        category: this.category,
        articleState: this.articleState,
        isPublic: this.isPublic,
        tags: JSON.stringify(this.tags),
        content: this.content
      };
      if (this.$route.params.edit) {
        axios
          .put(`/api/v1/articles/update/${this.articleId}`, params, {
            headers: {
              Authorization: `Bearer ${localStorage.joeyToken}`
            }
          })
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
        axios
          .post(`/api/v1/articles/`, params, {
            headers: {
              Authorization: `Bearer ${localStorage.joeyToken}`
            }
          })
          .then(res => {
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
      axios
        .get(`/api/v1/tags`, {
          headers: {
            Authorization: `Bearer ${localStorage.joeyToken}`
          }
        })
        .then(res => {
          this.tagList = res.data.tags;
        });
    }
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
      padding-bottom: 28px;
    }
    ul {
      li {
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
      }
    }
    .editor {
      #editor {
        min-height: 520px;
        overflow: auto;
        border: 1px solid #c6c6c6;
        border-top: none;
        .ck-editor__main {
          height: 100%;
          .ck-editor__editable:not(.ck-focused) {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
