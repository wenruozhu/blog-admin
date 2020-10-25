<template>
  <div class="personal">
    <div class="breadNav">
      <ul>
        <li>
          <router-link to="/dashboard">我的面板 /</router-link>
        </li>
        <li class="cur">文章标签</li>
      </ul>
    </div>
    <div class="basisInfo">
      <h6>基本信息</h6>
      <ul>
        <li>
          <span>标题：</span>
          <input type="text" name="title" v-model="basicInfo.title" placeholder="自由de气息" />
        </li>
        <li>
          <span>关键词：</span>
          <input type="text" v-model="basicInfo.keyword" placeholder="前端开发，JavaScript，Node" />
        </li>
        <li>
          <span>站点地址：</span>
          <input type="text" v-model="basicInfo.address" placeholder="https://ziyuzhu.com" />
        </li>
        <li class="textarea">
          <span>站点描述：</span>
          <textarea
            cols="30"
            rows="10"
            v-model="basicInfo.description"
            placeholder="希望是美好的，也许是人间至善，而美好的事物永不消失。"
          ></textarea>
        </li>
        <li>
          <span>电子邮件：</span>
          <input type="text" v-model="basicInfo.email" placeholder="ziyu@gmail.com" />
        </li>
        <li>
          <span>ICP备案号：</span>
          <input type="text" v-model="basicInfo.icp" placeholder="88888888" />
        </li>
        <li>
          <span class="save" @click="changeBasicInfo">保存</span>
        </li>
      </ul>
    </div>
    <div class="personalInfo">
      <h6>个人信息</h6>
      <ul>
        <li class="avatarLi">
          <span>头像</span>
          <div class="avatar">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              @change="avatarChange"
              name="avatar"
              id="avatar"
            />
            <label for="avatar"></label>
            <img :src="userInfo.avatarUrl" alt="我的头像" />
            <div class="mask">
              <div class="mask-area"></div>
              <div class="mask-content">
                <svg-icon icon-class="camera"></svg-icon>
                <p>修改我的头像</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <span>用户名</span>
          <input type="text" v-model="userInfo.username" placeholder="自由de气息" />
        </li>
        <!-- <li>
          <span>姓名</span>
          <input type="text" placeholder="文若" />
        </li>-->
        <li>
          <span>个性签名</span>
          <input type="text" v-model="userInfo.signature" placeholder="希望至善" />
        </li>
        <li>
          <span>原密码</span>
          <input type="password" v-model="userInfo.oldPassword" placeholder="原密码" />
        </li>
        <li>
          <span>新密码</span>
          <input type="password" v-model="userInfo.newPassword" placeholder="新密码" />
        </li>
        <li>
          <span>确认密码</span>
          <input type="password" v-model="userInfo.surePassword" placeholder="确认密码" />
        </li>
        <li>
          <span @click="changeUserInfo" class="change">更改</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  name: "personal",
  data() {
    return {
      basicInfo: {
        title: "",
        keyword: "",
        address: "",
        description: "",
        email: "",
        icp: ""
      },
      userInfo: {
        avatarUrl: "",
        userId: "",
        username: "",
        signature: "",
        curPassword: "", //当前数据库存储的密码
        oldPassword: "", //个人信息中输入的原密码
        newPassword: "",
        surePassword: ""
      }
    };
  },
  created() {
    this.getBasicInfo();
    this.getUserInfo();
  },
  methods: {
    getBasicInfo() {
      axios
        .get(`/api/v1/personal/basicInfo`)
        .then(res => {
          const basicInfo = res.data[0];
          this.basicInfo.title = basicInfo.title;
          this.basicInfo.keyword = basicInfo.keyword;
          this.basicInfo.address = basicInfo.address;
          this.basicInfo.description = basicInfo.description;
          this.basicInfo.email = basicInfo.email;
          this.basicInfo.icp = basicInfo.icp;
        })
        .catch(err => {});
    },
    changeBasicInfo() {
      const params = {
        title: this.basicInfo.title,
        keyword: this.basicInfo.keyword,
        address: this.basicInfo.address,
        description: this.basicInfo.description,
        email: this.basicInfo.email,
        icp: this.basicInfo.icp
      };
      axios
        .post(`/api/v1/personal/basicInfo`, params, {
          headers: {
            Authorization: `Bearer ${localStorage.joeyToken}`
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.$notify({
              title: "成功",
              message: "修改基本信息成功",
              type: "success"
            });
          }
        })
        .catch(err => {});
    },
    getUserInfo() {
      axios
        .get(`/api/v1/personal/userInfo`)
        .then(res => {
          const userInfo = res.data[0];
          this.userInfo.userId = userInfo.id;
          this.userInfo.username = userInfo.username;
          this.userInfo.avatarUrl = userInfo.avatar;
          this.userInfo.curPassword = userInfo.password;
          this.userInfo.signature = userInfo.signature;
        })
        .catch(err => {});
    },
    changeUserInfo() {
      if (this.userInfo.curPassword != md5(this.userInfo.oldPassword)) {
        this.$notify({
          title: "提示",
          message: "原密码错误",
          type: "warning"
        });
      } else if (this.userInfo.newPassword != this.userInfo.surePassword) {
        this.$notify({
          title: "提示",
          message: "新密码与确认密码不一致",
          type: "warning"
        });
      } else {
        const params = {
          userId: this.userInfo.userId,
          username: this.userInfo.username,
          signature: this.userInfo.signature,
          password: md5(this.userInfo.newPassword)
        };
        axios
          .post(`/api/v1/personal/userInfo`, params, {
            headers: {
              Authorization: `Bearer ${localStorage.joeyToken}`
            }
          })
          .then(res => {
            if (res.status == 200) {
              this.$notify({
                title: "成功",
                message: "修改基本信息成功",
                type: "success"
              });
            }
          })
          .catch(err => {});
      }
    },
    avatarChange() {
      const h = this.$createElement;
      const avatarFile = document.getElementById("avatar");
      const fileObj = avatarFile.files[0];
      const fileName = fileObj.name;
      const windowURL = window.URL || window.webkitURL;
      let dataURl;
      if (avatarFile && fileObj) {
        dataURl = windowURL.createObjectURL(fileObj);
      }
      this.$msgbox({
        title: "修改头像预览",
        message: h("p", null, [
          h(
            "img",
            {
              style: { width: "100%" },
              attrs: { src: dataURl, alt: fileName }
            },
            null
          )
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(action => {
          this.submitAvatar();
          avatarFile.value = "";
          this.$notify({
            title: "成功",
            message: "修改头像成功",
            type: "success"
          });
        })
        .catch(() => {
          avatarFile.value = "";
          this.$notify({
            title: "提示",
            message: "取消修改头像",
            type: "warning"
          });
        });
    },
    submitAvatar() {
      const fileList = document.getElementById("avatar").files;
      const formData = new FormData();
      formData.append("avatar", fileList[0]);
      axios
        .post(`/api/v1/upload/uploadAvatar`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.joeyToken}`,
            "Content-type": "multipart/form-data"
          }
        })
        .then(res => {
          this.userInfo.avatarUrl = res.data;
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less">
.personal {
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
  .basisInfo {
    width: 70%;
    float: left;
    padding: 18px;
    margin: 10px 0;
    border-radius: 6px;
    background-color: #fff;
    box-sizing: border-box;

    ul {
      margin-top: 16px;
      li {
        height: 50px;
        line-height: 50px;
        position: relative;
        span {
          font-size: 12px;
          color: #8f97a4;
        }
        input {
          width: 87%;
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
        input[name="title"] {
          width: 248px;
        }
        &.textarea {
          position: relative;
          min-height: 118px;
          textarea {
            width: 87%;
            height: 100px;
            text-indent: 8px;
            line-height: 28px;
            position: absolute;
            left: 72px;
            border: 1px solid #d2d9e4;
            border-radius: 6px;
            padding: 0;
            resize: none;
          }
        }
        span.save {
          display: block;
          width: 48px;
          height: 28px;
          padding-right: 0;
          color: #353f4f;
          position: absolute;
          top: 0;
          left: 72px;
          bottom: 0;
          margin: auto;
          border: 1px solid #d8d8d8;
          border-radius: 6px;
          text-align: center;
          line-height: 28px;
          cursor: pointer;
        }
      }
    }
  }
  .personalInfo {
    width: 28%;
    float: right;
    padding: 18px;
    margin: 10px 0;
    border-radius: 6px;
    background-color: #fff;
    box-sizing: border-box;
    ul {
      li {
        position: relative;
        height: 50px;
        span {
          font-size: 12px;
          color: #28374f;
        }
        input {
          width: 77%;
          height: 28px;
          border: 1px solid #e6eaf0;
          border-radius: 6px;
          position: absolute;
          left: 64px;
          text-indent: 8px;
        }
        .avatar {
          width: 50%;
          position: relative;
          left: 64px;
          border: 3px solid #fff;
          font-size: 0;
          border-radius: 8px;
          overflow: hidden;
          input {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            clip: rect(0, 0, 0, 0);
          }
          label {
            position: absolute;
            width: 100%;
            height: 100%;
            cursor: pointer;
            z-index: 1;
          }
          img {
            width: 100%;
            border-radius: 6px;
          }
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            font-size: 16px;
            color: #fff;
            text-align: center;
            opacity: 0;
            transition: opacity 0.2s ease-in;
            .mask-area {
              width: 100%;
              height: 100%;
              background-color: #1a1a1a;
              opacity: 0.4;
            }
            .mask-content {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              svg {
                font-size: 32px;
                margin-bottom: 12px;
              }
              p {
                white-space: nowrap;
              }
            }
          }
          &:hover {
            .mask {
              opacity: 1;
            }
          }
        }
        &.avatarLi {
          height: auto;
          padding-bottom: 32px;
        }
        span.change {
          display: block;
          width: 48px;
          height: 28px;
          padding-right: 0;
          color: #353f4f;
          position: absolute;
          left: 64px;
          border: 1px solid #d8d8d8;
          border-radius: 6px;
          text-align: center;
          line-height: 28px;
          cursor: pointer;
        }
      }
    }
  }
  h6 {
    padding-bottom: 18px;
    font-size: 16px;
    font-weight: 400;
    color: #6b6b6b;
  }
}
</style>
