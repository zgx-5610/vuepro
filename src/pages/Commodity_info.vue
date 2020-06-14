<template>
    <div id="commodity_info">
        <h3>商品列表</h3>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="props">
              <!-- v-for="item in tableData" :key="item.index" -->
                <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称" >
                    <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="商品销量">
                    <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="时间">
                    <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                    <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                    <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                    <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                    <span>
                      <img :src="host+props.row.imgUrl" width="100px">
                    </span>
                </el-form-item>
                <el-form-item label="商品评价">
                    <span>{{ props.row.rating }}</span>
                </el-form-item>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column
            label="商品名称 "
            prop="name">
            </el-table-column>
            <el-table-column
            label="所属分类"
            prop="category"> 
            </el-table-column>
            <el-table-column
            label="商品价格"
            prop="price">
            </el-table-column>
            <el-table-column
            label="商品图片"
            prop="imgUrl"
           
            >
            <template slot-scope="props">
              <img :src="host+props.row.imgUrl" width="60px">
            </template>
            </el-table-column>
            <el-table-column
            label="商品描述"
            prop="goodsDesc">
            </el-table-column>
            <el-table-column label="操作">
                <template class="form-button" slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 编辑商品模态框 -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="商品名称" label-width="80px">
              <el-input v-model="form.name" autocomplete="off"></el-input>
              <!-- {{this.form.name}} -->
            </el-form-item>
            <el-form-item label="商品分类" label-width="80px">
              <el-select v-model="form.category" placeholder="请选择">
                <el-option :label="item.cateName" :value="item.cateName" v-for="item in categories" :key="item.index"></el-option>
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="商品价格" label-width="80px">
                <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" label-width="80px">
                <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" width="80px">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
             <el-form-item label="商品描述" label-width="80px">
               <el-input type="textarea" v-model="form.goodsDesc"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closefix">取 消</el-button>
            <el-button type="primary" @click="madefix">确 定</el-button>
          </div>
        </el-dialog>

        <div class="block">
          
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
//引入接口
import { GOODLIST, GOODSDEL, CATEGORIES, GOODSEDIT } from "../api/apis.js";

export default {
  data() {
    return {
      tableData: [],
      categories: [],
      currentPage: 1,
      pagesize: 6,
      total: 0,
      host: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      dialogFormVisible: false,
      form: {
        name: "",
        category: "",
        price: 0,
        imgUrl: "",
        goodsDesc: "",
        id: "",
        oldimg: "",
      
      }
    };
  },

  //初始化
  created() {
    // console.log(this.currentPage,this.pagesize)
    //调用获取商品列表方法
    this.updata_list();
  },
  methods: {
    //封装获取商品列表方法
    updata_list() {
      //调用接口
      GOODLIST(this.currentPage, this.pagesize).then(res => {
        console.log(res);
        //将响应的数据保存给tableData
        this.tableData = res.data.data;
        console.log(this.tableData);
        console.log(res);
        console.log(res.data.total);
        //保存总条数
        this.total = res.data.total;
      });
    },

    //商品编辑
    handleEdit(row) {
      console.log(row);
      this.dialogFormVisible = true;
      CATEGORIES().then(res => {
        console.log(res.data.categories);
        this.categories = res.data.categories;
        console.log(this.form.category);
      });
      this.form.name = row.name;
      this.form.category = row.category;
      this.form.price = row.price;
      this.form.oldimg = row.imgUrl;
      this.form.imgUrl = this.host+row.imgUrl;
      this.form.goodsDesc = row.goodsDesc;
      this.form.id = row.id;
      console.log(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.oldimg,
        this.form.imgUrl,
        this.form.goodsDesc,
        this.form.id
      );
    },
    //取消编辑模态框
    closefix() {
      this.dialogFormVisible = false;
    },
    //确认修改
    madefix() {
      GOODSEDIT(
        this.form.id,
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.oldimg,
        this.form.goodsDesc
      ).then(res => {
       this.updata_list();
        console.log(res);
        this.dialogFormVisible = false;

      });
    },

    //商品删除
    handleDelete(row) {
      console.log(row.id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          GOODSDEL(row.id).then(res => {
            console.log(res);
            this.updata_list();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.updata_list();
    },
    //当前页码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.updata_list();
    },

    //上传图片
    handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.form.oldimg = res.imgUrl;
      this.form.imgUrl = this.host+res.imgUrl
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
#commodity_info {
  height: 100%;
  background: #fff;
  padding: 10px;
  h3 {
    height: 40px;
    line-height: 40px;
    padding: 10px;
    border-bottom: 1px solid #eceff5;
  }
  .block {
    margin: 20px 0;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>