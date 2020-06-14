<template>
    <div id="personal">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>管理员信息</span>
                
            </div>
            <div class="text item">
                <p>管理员id：{{id}}</p>
                <p>账号: {{acc}}</p>
                <p>用户组：{{userGroup}}</p>
                <p>创建时间: {{ctime}}</p>
                <p class="img"> 管理员头像：
                    <!-- <img :src="this.imgUrl"> -->
                    <el-upload
                        class="avatar-uploader"
                        action="http://127.0.0.1:5000/users/avatar_upload"
                        :show-file-list="false"
                        :data="data"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imgUrl" :src="imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </p>
            </div>
            
        </el-card>
    </div>
</template>

<script>
import {PERSONAL} from '../api/apis.js'
export default {
    data(){
        return{
           data:{id:localStorage.id},
           id:'',
           acc:'',
           ctime:'',
           imgUrl:'',
           userGroup:'',
           oldimg:'',
           host: "http://127.0.0.1:5000/upload/imgs/accs_img/"
   
        }
    },

    created(){
        //获取保存的id
        this.id = localStorage.getItem("id")
        //渲染页面接口
        PERSONAL(this.id).then(res=>{
            // console.log(this.id)
            console.log(res)
            this.acc = res.data.accountInfo.account
            this.ctime = res.data.accountInfo.ctime
            this.imgUrl = res.data.accountInfo.imgUrl
            this.userGroup = res.data.accountInfo.userGroup
            console.log(this.acc)
        })
    },
    methods:{
         handleAvatarSuccess(res) {
             console.log(res)
             console.log(this.imgUrl)
            this.imgUrl = this.host+res.imgUrl
             console.log(this.imgUrl)
            this.oldimg = res.imgUrl
            window.location.reload()
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
};
</script>

<style lang="less" scoped>
#personal {
  height: 100%;
  background: #fff;
  padding: 10px;
  p{
      height: 60px;
      line-height: 60px;
      display: flex;
      
      align-content: center;
      img{
      width: 60px;
      height: 60px;
    }
  }
  

  

}
 .text {
    font-size: 14px;
    
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    height: 100%;
  }
  }

</style>