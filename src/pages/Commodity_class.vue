<template>
    <div id="commodity_class">
        <h3>商品分类
            <el-button @click="add_class" type="primary">添加分类</el-button>
        </h3>

        
         <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column label="序号" width="180">
                <!-- {{this.index}} -->
            </el-table-column>

            <el-table-column
            prop="cateName"
            label="分类名称"
            width="180">
            </el-table-column>

            <el-table-column
            
            label="是否启用"
            width="180">
              <template slot-scope="scope">
              <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949">
              </el-switch>
              </template>
            </el-table-column>

             <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[6, 12, 24, 36]"
                :page-size="6"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
        </div>

        <!-- 添加分类模态框 -->
         <el-dialog title="添加分类" :visible.sync="dialogFormVisible1">
        <el-form>
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="addinput" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
           <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeadd">取 消</el-button>
          <el-button type="primary" @click="madeadd">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改分类模态框 -->
      <el-dialog title="修改分类" :visible.sync="dialogFormVisible2">
        <el-form>
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="fixinput" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
           <el-switch v-model="fixvalue" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closefix">取 消</el-button>
          <el-button type="primary" @click="madefix">确 定</el-button>
        </div>
      </el-dialog>


    </div>
</template>

<script>
//引入接口
import { CATELIST, ADDCATE, DELCATE, EDITCATE } from "../api/apis.js";

export default {
  data() {
    return {
      tableData: [],
      value: true,
      currentPage: 1,
      sizeChange: 6,
      total: 0,
      dialogFormVisible2: false,
      dialogFormVisible1: false,
      addinput: "",
      fixinput: "",
      fixvalue: true,
      id: "",
      cateName: "",
      formLabelWidth: "120px"
    };
  },
  //初始化
  created() {
    //调用获取页面函数
    this.updata();
  },
  methods: {
    //获取（刷新）页面
    updata() {
      //发送请求
      CATELIST(this.currentPage, this.sizeChange).then(res => {
        // console.log(res);
        //总页数赋值
        this.total = res.data.total;
        //  console.log(this.total)
        //赋值
        this.tableData = res.data.data;
        // this.state = res.data.data.state
        console.log(this.tableData);
        //循环数组
        this.tableData.forEach(item => {
          // console.log(item.state)
          // this.state = item.state
          if (item.state == 1) {
            item.state = true;
          } else {
            item.state = false;
          }

          // console.log(this.state)
        });

        // console.log(this.state)
      });
    },

    //添加分类
    add_class() {
      this.dialogFormVisible1 = true;
    },
    //确认添加
    madeadd() {
      this.$confirm("确认添加?", "提示", {
        confirmButtonText1: "确定",
        cancelButtonText1: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(this.madeadd,toString(this.region))
          //商品分类添加接口
          ADDCATE(this.addinput, String(this.value)).then(res => {
            console.log(res);
            this.addinput = "";
            this.value = "";
            this.updata();
          });
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
      console.log(this.value);
      console.log(String(this.value));
      //影藏模态框
      this.dialogFormVisible1 = false;
    },

    //取消添加
    closeadd() {
      //影藏模态框
      this.dialogFormVisible1 = false;
    },

    //确认修改
    madefix() {
      console.log(this.id, this.cateName, String(this.state));
      this.$confirm("此操作将永久修改该数据, 是否继续?", "提示", {
        confirmButtonText2: "确定",
        cancelButtonText2: "取消",
        type: "warning"
      })
        .then(() => {
          //发送修改分类请求
          EDITCATE(this.id, this.fixinput, String(this.fixvalue)).then(res => {
            console.log(res);
            this.updata();
          });

          this.$message({
            type: "success",
            message: "修改成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
      this.dialogFormVisible2 = false;
    },

    //取消修改
    closefix() {
      // console.log(111)
      this.dialogFormVisible2 = false;
    },

    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.id = row.id;
      this.cateName = row.cateName;
      this.state = row.state;
      console.log(this.id, this.cateName, String(this.state));
      this.dialogFormVisible2 = true;
      this.fixinput = row.cateName;
      this.fixvalue = row.state;
    },

    //删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DELCATE(row.id).then(res => {
            console.log(res);
            this.updata();
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

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.sizeChange = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.updata();
    }
  }
};
</script>

<style lang="less" scoped>
#commodity_class {
  height: 100%;
  background: #fff;
  padding: 10px;
  h3 {
    height: 40px;
    line-height: 40px;
    padding: 10px;
    border-bottom: 1px solid #eceff5;
    position: relative;
    .el-button {
      position: absolute;
      right: 0;
    }
  }

  .block {
    margin: 20px 0;
  }
}
</style>