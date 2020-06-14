<template>
    <div id="commodity_add">
        <h3>商品列表</h3>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select v-model="form.region" placeholder="请选择" >
                <el-option label="" :value="item.cateName" v-for="item in categories " :key="item.index"></el-option>
                
                </el-select>
            </el-form-item>
            <el-form-item label="商品价格">
                 <template>
                    <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                </template>
            </el-form-item>

            <el-form-item label="商品图片">
                <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:5000/goods/goods_img_upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="nowimageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

             <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
      
            <el-form-item>
                <el-button type="primary" @click="madeadd">确认添加</el-button>
               
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
//引入接口
import { CATEGORIES, GOODSADD } from "../api/apis.js";
// GOODSADD
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        desc: ""
      },
      num: 1,
      imageUrl: "",
      nowimageUrl: "",
      categories: [],
      host: "http://127.0.0.1:5000/upload/imgs/goods_img/"
    };
  },
  //初始化
  created() {
    //调用接口，查询所有分类名称
    CATEGORIES().then(res => {
      console.log(res.data.categories);
      //将响应的categories赋值
      this.categories = res.data.categories;
    });
  },
  methods: {
    //添加商品
    madeadd() {
      //调用商品添加接口
      GOODSADD(
        this.form.name,
        this.form.region,
        this.num,
        this.imageUrl,
        this.form.desc
      ).then(res => {
        console.log(res);
         this.form.name=''
        this.form.region=''
        this.num=''
         this.form.desc=''
          this.$message('添加成功');
      });
    },

    handleChange(value) {
      console.log(value);
    },
    
    handleAvatarSuccess(res) {
      // console.log(this.imageUrl)
      //响应回来的图片地址
      this.imageUrl = res.imgUrl;
      //将响应回来的图片地址拼接
      this.nowimageUrl = this.host + this.imageUrl;
      // console.log(URL.createObjectURL(file.raw))
      console.log(this.imageUrl);
    },
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
    }
  }
};
</script>

<style lang="less" scoped>
#commodity_add {
  height: 100%;
  background: #fff;
  padding: 10px;
  h3 {
    height: 40px;
    line-height: 40px;
    padding: 10px;
    border-bottom: 1px solid #eceff5;
  }
  .el-form {
    padding: 20px;
    .avatar-uploader .el-upload {
      border: 1px dashed #585151;
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
</style>