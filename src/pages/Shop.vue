<template>
    <div id="shop">
        <div class="title">
            <h3>店铺管理</h3>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
        
        <div class="shop_form">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="店铺名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="店铺公告">
                    <el-input type="textarea" v-model="form.bulletin" rows="8"></el-input>
                </el-form-item>
                <el-form-item label="店铺头像">
                    <el-upload
                    class="avatar-uploader"
                    :action="upload_api"
                    :show-file-list="true"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.avatar" :src="form.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-form-item>

                 <el-form-item label="店铺图片">
                     <div>
                         <el-upload
                            :action="upload_api"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :file-list="fileList">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                     </div>
                    
                        
                        
                </el-form-item>

                <el-form-item label="配送费">
                    <el-input v-model="form.deliveryPrice"></el-input>
                </el-form-item>
                <el-form-item label="配送时间">
                    <el-input v-model="form.deliveryTime"></el-input>
                </el-form-item>
                <el-form-item label="配送描述">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="店铺评分">
                    <el-input v-model="form.score"></el-input>
                </el-form-item>
                <el-form-item label="销量">
                    <el-input v-model="form.sellCount"></el-input>
                </el-form-item>
               
                
                <el-form-item label="活动时间">
                    <el-date-picker
                        v-model="form.date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.supports">
                        <el-checkbox :label="item" name="type" v-for="item in checkboxs" :key="item.index"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                
                
            </el-form>
        </div>
    </div>  
</template>

<script>
import { SHOPINFO, SHOPEDIT, ADDRESS_API, UPDATA_API } from "../api/apis.js";

export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        date: "",
        bulletin: "",
        avatar: "",
        cost: "",
        deliveryPrice: "",
        deliveryTime: 0,
        description: "",
        score: "",
        sellCount: "",
        supports: "",
        pics: "",
        minPrice: ""
      },
      checkboxs: [
        "在线支付满28减5",
        "VC无限橙果汁全场8折",
        "单人精彩套餐",
        "特价饮品",
        "单人特色套餐"
      ],
      fileList: [],

      upload_api: UPDATA_API, //图片上传接口
      adderss_api: ADDRESS_API, //图片上传地址

      dialogVisible: false,
      dialogImageUrl: "",
     
    };
  },
  created() {
    this.updata();
  },

  methods: {
    updata() {
      

      //页面渲染
      SHOPINFO().then(res => {
        // console.log(res);
        //将获取店铺详情接口响应回来的数据赋给form
        this.form = res.data.data;
     
       
        this.form.avatar = res.data.data.avatar;
        

        this.fileList = res.data.data.pics.map(i => {
          return { url: this.adderss_api + i };
        });
      });
    },
    //保存
    save() {
      let newobj = {...this.form}
        newobj.pics = JSON.stringify(newobj.pics);
        newobj.supports = JSON.stringify(newobj.supports)
        newobj.date = JSON.stringify(newobj.date)

    
      
      //保存接口
      SHOPEDIT(newobj).then(res => {
        console.log(res);
        // this.updata()
      });
    },
    //商家头像上传成功的函数
    handleAvatarSuccess(res) {
      console.log(res.imgUrl);
      //拼接后的图片地址，用于渲染
      this.form.avatar = this.adderss_api + res.imgUrl;
      //拼接前的图片地址，用于传参
      this.oldavatar = res.imgUrl;
    },
    //商家头像上传前的函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //删除图片的函数
    handleRemove(file) {
        this.form.pics.splice(this.form.pics.indexOf(file.url.substr(file.url.lastIndexOf("/")+1)),1)
    },
    //图片上传成功的函数
    handleSuccess(res) {
      console.log(res);
      //将原pics中的数组与新添加的图片进行拼接，赋给pics
      this.form.pics = this.form.pics.concat(res.imgUrl);
      // this.updata()
    },
    //商品图片
    handlePictureCardPreview(res) {
      console.log(res);

      //图片放大
      this.dialogImageUrl = res.url;

      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
#shop {
  height: 100%;
  background: #fff;
  padding: 10px;
  .title {
    display: flex;
    justify-content: space-between;
    align-content: center;
    h3 {
      height: 40px;
      line-height: 40px;
      padding: 10px;
      border-bottom: 1px solid #eceff5;
    }
  }

  .shop_form {
    height: 100%;
    margin: 20px;
    .el-form {
      color: #afaaa2;
      .el-form-item {
        .el-input {
          width: 50%;
        }
        .el-textarea {
          width: 50%;
        }
      }

      .avatar-uploader .el-upload {
        border: 5px sol #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>