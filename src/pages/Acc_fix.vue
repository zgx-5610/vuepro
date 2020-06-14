<template>
    <div id="acc_fix">
        <h3>修改密码</h3>

        <el-form status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码">
                <el-input type="password" v-model="old"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input type="password" v-model="pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input type="password" v-model="checkPass" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import {ACCOUND_CHECK} from '../api/apis.js'
import {ACCOUND_FIX} from '../api/apis.js'

  export default {
    data() {
   
      return {
          pass: '',
          checkPass: '',
          old:"",
          id:'',
        rules: {
       
        }
      };
    },

    created(){
      // console.log(localStorage.getItem("id"))
      //获取本地存储的id
      this.id = localStorage.getItem("id")
      console.log(this.id)
    },
    methods: {
      //提交
      submitForm() {
        // this.old = Number(this.old)
        console.log(this.old)
        //旧密码验证请求
          ACCOUND_CHECK(this.id,this.old).then((res)=>{
            console.log(res)
            //旧密码验证成功时
            if(res.data.code===0){
              //调用修改密码接口
              this.$confirm('此操作将修改密码, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  ACCOUND_FIX(this.id,this.pass).then((res)=>{
                  console.log(res)
                  this.$router.push("/");
                })
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
              
            }else{
              alert('原密码不正确')
              return false
            }
          })


      },
      //重置
      resetForm() {
        this.old = ''
        this.pass=''
        this.checkPass=''
      }
    }
  }
</script>

<style lang="less" scoped>
#acc_fix {
  height: 100%;
  background: #fff;
  padding: 10px;
  h3 {
    height: 40px;
    line-height: 40px;
    padding: 10px;
    border-bottom: 1px solid #eceff5;
  }
  .el-form{
      padding: 20px;
      .el-input{
      width: 50%;
  }
  }
  

}
</style>