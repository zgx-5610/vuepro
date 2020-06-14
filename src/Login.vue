<template>
    <div id="login">
        <form>
            <h2>小样外卖后台管理系统</h2>
            <el-input class="input" v-model="acc" placeholder="请输入用户名"></el-input>
            <el-input class="input" type="password" v-model="pass" placeholder="请输入密码"></el-input>
            <el-button @click="clickLogin" type="primary">登录</el-button>
        </form>
    </div>
</template>

<script>
import { LOGIN } from "./api/apis.js";
export default {
  data() {
    return {
      id: "",
      acc: "",
      pass: "",
      token: "",
      role: "",
      isquer: true
    };
  },
  methods: {
    clickLogin() {
      //标杆为false,return
      if (this.isquer == false) return;
      //将标杆改为false
      this.isquer = false;
      //发送请求
      LOGIN(this.acc, this.pass).then(res => {
        //  console.log(res)
        if (res.data.code == 0) {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          // console.log(res)
          this.id = res.data.id;
          this.role = res.data.role;
          this.token = res.data.token;
          //保存登录的id
          localStorage.setItem("id", JSON.stringify(this.id));
          //保存登录的用户名
          localStorage.setItem("acc", JSON.stringify(this.acc));
          //保存登录的token
          localStorage.setItem("token", this.token);
          //保存登录的role
          localStorage.setItem("role", this.role);
          setTimeout(() => {
            this.$router.push("/index");
          }, 1000);
        } else {
          this.$message.error("用户名或密码错误");
        }
      });
      //三秒后将标杆改为true
      setTimeout(() => {
        this.isquer = true;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
#login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("./assets/images/beijing.jpg") center no-repeat;
  form {
    width: 400px;
    height: 400px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    h2 {
      margin: 20px;
      text-align: center;
      color: #fff;
    }
    .el-input {
      margin-bottom: 40px;
    }
    button {
      width: 400px;
    }
  }
}
</style>