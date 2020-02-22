<template>
  <div class="personal clear">
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
          <input type="text" name="title" placeholder="自由de气息">
        </li>
        <li>
          <span>副标题：</span>
          <input type="text" name="title" placeholder="joey">
        </li>
        <li>
          <span>关键词：</span>
          <input type="text" placeholder="前端开发，JavaScript，Node">
        </li>
        <li>
          <span>站点地址：</span>
          <input type="text" placeholder="https://wenruo.cn">
        </li>
        <li class="textarea">
          <span>站点描述：</span>
          <textarea cols="30" rows="10" placeholder="希望是美好的，也许是人间至善，而美好的事物永不消失。"></textarea>
        </li>
        <li>
          <span>电子邮件：</span>
          <input type="text" placeholder="wenruo@gmail.com">
        </li>
        <li>
          <span>ICP备案号：</span>
          <input type="text" placeholder="88888888">
        </li>
        <li>
          <span class="save">保存</span>
        </li>
      </ul>
    </div>
    <div class="personalInfo">
      <h6>个人信息</h6>
      <ul>
        <li class="avatarLi">
          <span>头像</span>
          <div class="avatar">
              <input type="file" name="avatar">
              <img src="../../assets/img/avatar.jpg" alt="">
          </div>
        </li>
        <li>
          <span>用户名</span>
          <input type="text" placeholder="自由de气息">
        </li>
        <li>
          <span>姓名</span>
          <input type="text" placeholder="文若">
        </li>
        <li>
          <span>个性签名</span>
          <input type="text" placeholder="希望至善">
        </li>
        <li>
          <span>原密码</span>
          <input type="text" placeholder="原密码">
        </li>
        <li>
          <span>新密码</span>
          <input type="text" placeholder="新密码">
        </li>
        <li>
          <span>确认密码</span>
          <input type="text" placeholder="确认密码">
        </li>
        <li>
          <span class="change">更改</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personal'
}
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
          left: 100px;
          border: 1px solid #d2d9e4;
          border-radius: 6px;
        }
        input[name="title"] {
          width: 248px;
        }
        &.textarea {
          position: relative;
          span {
            position: absolute;
            top: 10px;
            left: 0;
          }
          min-height: 118px;
          textarea {
            width: 87%;
            height: 100px;
            text-indent: 8px;
            line-height: 28px;
            position: absolute;
            left: 100px;
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
          left: 100px;
          border: 1px solid #d8d8d8;
          border-radius: 6px;
          text-align: center;
          line-height: 28px;
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
    ul{
        li{
            position: relative;
            height: 50px;
            span{
                font-size: 12px;
                color: #28374f;
            }
            input{
                width: 77%;
                height: 28px;
                border: 1px solid #e6eaf0;
                border-radius: 6px;
                position: absolute;
                left: 64px;
                text-indent: 8px;
            }
            .avatar{
                width: 50%;
                position: relative;
                margin: 0 auto;
                input{
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    opacity: 0;
                    z-index: 1;
                }
                img{
                    width: 100%;
                    border-radius: 6px;
                }
            }
            &.avatarLi{
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
            }
        }
    }
  }
  h6 {
    font-size: 16px;
    font-weight: 400;
    color: #6b6b6b;
  }
}
</style>
