<template>
    <div id="acc_add">
        <h3>添加账号</h3>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.acc"></el-input>
            </el-form-item>

             <el-form-item label="密码">
                <el-input type="password" v-model="form.pwd"></el-input>
            </el-form-item>

            <el-form-item label="用户组">
                <el-select v-model="form.region" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="管理员" value="管理员"></el-option>
                </el-select>
            </el-form-item>

  
            <el-form-item>
                <el-button type="primary" @click="click_add">立即添加</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {ACCOUND_ADD} from "../api/apis.js"
  export default {
    data() {
      return {
        form: {
          acc: '',
          pwd: '',
          region:''
         
         
        }
      }
    },
    methods: {
      //添加
      click_add(){
        console.log(11)
        //调用账号添加接口
        ACCOUND_ADD(this.form.acc,this.form.pwd,this.form.region).then((res)=>{
          console.log(res)
           this.$message({
              message: '添加成功',
              type: 'success'
            });
           this.form.acc='',
           this.form.pwd='',
           this.form.region=''
        })
      },
      reset(){
        this.form.acc='',
        this.form.pwd='',
        this.form.region=''
      }
    }
  }
</script>

<style lang="less" scoped>
#acc_add {
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