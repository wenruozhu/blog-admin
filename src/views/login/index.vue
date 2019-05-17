<template>
    <div class="login">
        <div class="login-container">
        <header>
            <p>自由de气息</p>
        </header>
        <section class="form">
            <div class="user">
                <input type="text" id="user" placeholder="账号" v-model="username">
            </div>
            <div class="password">
                <input type="password" id="password" placeholder="密码" v-model="password" @keyup.enter="login">
            </div>
            <div class="submit">
                <input type="submit" value="登录" @click="login">
            </div>
        </section>
        </div>
    </div>
</template>
<script>
import md5 from 'md5';
import axios from 'axios';
export default {
    name: "login",
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        login(){
            axios.post(
                '/api/v1/tokens',
                {
                    username: this.username,
                    password: md5(this.password)
                }
            ).then(res => {
                const data = res.data
                localStorage.setItem('joeyToken',data)
                this.$router.push('/')
            }).catch((err) => {
                const errorMsg = err.response.data.error
                alert(errorMsg)
            });
        }
    }
};
</script>
<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #2d3a4b;
  .login-container {
    width: 280px;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-50%);
    header {
      width: 100%;
      p {
        font-size: 28px;
        font-weight: bold;
        color: #fff;
        text-align: center;
      }
    }
    .form {
      margin: 20px auto;
      p {
        font-size: 22px;
        color: #fff;
        text-align: center;
      }
      input {
        width: 100%;
        height: 32px;
        font-size: 16px;
        color: #9ca9c1;
        border: 1px solid #bfc9d9;
        border-radius: 6px;
        padding-left: 8px;
        margin-bottom: 18px;
        box-sizing: border-box;
        background-color: #fff;
        outline: 0;
        &:focus {
          border-color: orange;
        }
      }
      .submit {
          input {
          cursor: pointer;
          font-size: 20px;
          height: 36px;
          color: #000;
        }
      }
    }
  }
}
</style>
