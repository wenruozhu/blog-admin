<template>
  <div class="headNav">
    <div class="userName">
      <h1>自由de气息</h1>
    </div>
    <div class="otherFn">
      <ul class="clear">
        <li class="fullScreen">
          <svg-icon icon-class="quanping"></svg-icon>
        </li>
        <li class="message">
          <svg-icon icon-class="message"></svg-icon>
          <span class="number">10+</span>
        </li>
        <li class="avatarList">
          <div class="avatar">
            <span>
              <img src="../../assets/img/avatar.jpg" alt>
            </span>
          </div>
          <div class="userMenu">
              <div class="user">
                  <h6>用户中心</h6>
                  <ul>
                      <li>个人信息</li>
                      <li @click="logout">退出登录</li>
                  </ul>
              </div>
              <div class="config">
                  <h6>设置中心</h6>
                  <ul>
                      <li>个人设置</li>
                      <li>系统设置</li>
                  </ul>
              </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "headNav",
  methods:{
      logout(){
          localStorage.removeItem('joeyToken');
          this.$router.push('/login')
      }
  }
};
</script>
<style lang="less">
.headNav {
  width: 100%;
  height: 52px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgb(48, 65, 86);
  .userName {
    padding-left: 18px;
    float: left;
    h1 {
      font-size: 22px;
      color: #fff;
      line-height: 52px;
    }
  }
  .otherFn {
    float: right;
    >ul {
      >li {
        height: 100%;
        line-height: 52px;
        float: left;
        padding: 0 20px;
        cursor: pointer;
        .avatar {
          height: 52px;
          padding: 0 20px;
          position: relative;
          display: block;
          white-space: nowrap;
          span {
            display: inline-block;
            width: 40px;
            height: 40px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            img {
              width: 100%;
              overflow: hidden;
              border-radius: 50%;
            }
          }
        }
      }
      .message {
        position: relative;
        margin-right: 12px;
        padding-left: 10px;
        .number {
          display: block;
          width: 38px;
          height: 18px;
          border-radius: 8px;
          position: absolute;
          top: 8px;
          right: -16px;
          line-height: 18px;
          text-align: center;
          background-color: rgb(245, 34, 45);
          font-size: 12px;
          color: #fff;
        }
      }
      .avatarList{
          position: relative;
          .userMenu{
              width: 120px;
              max-height: 0;
              overflow: hidden;
              background-color: #fff;
              border-radius: 6px;
              position: absolute;
              right: 0;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
              transition: max-height .8s;
              .user,.config{
                  h6{
                      font-size: 12px;
                      color: rgba(0, 0, 0, 0.5);
                      line-height: 1.5;
                      padding: 8px 16px;
                  }
                  ul{
                      li{
                          font-size: 12px;
                          color: rgba(0, 0, 0, 0.6);
                          cursor: pointer;
                          line-height: 40px;
                          padding-left: 24px;
                          padding-right: 28px;
                          &:hover{
                              color: rgba(0, 0, 0, 1);
                          }
                      }
                  }
              }
          }
          &:hover{
            .userMenu{
              max-height: 230px;
            }
          }
      }
    }
  }
}
</style>
