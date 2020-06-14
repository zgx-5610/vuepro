<template>
    <div id="acc_list">
         <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">

            <el-table-column
            type="selection"
            width="55">
            </el-table-column>

            <el-table-column
            prop="account"
            label="账号"
            width="120">
            </el-table-column>

            <el-table-column
            prop="userGroup"
            label="用户组"
            width="120">
            </el-table-column>

            <el-table-column
            prop="ctime"
            label="创建时间"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column label="操作">
            <template slot-scope="scope">
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

        <div style="margin-top: 20px">
            <el-button @click="toggleRowSelection(multipleSelection)">批量删除</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>

        <div class="block">
       
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentChange"
          :page-sizes="[6, 12, 18, 24]"
          :page-size="sizeChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      
      

      <!-- Form -->
      <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

      <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="fixinput" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组" :label-width="formLabelWidth">
            <el-select v-model="region" placeholder="请选择">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="管理员" value="管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="madefix">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
//引入接口
import { ACCOUND_LIST } from "../api/apis.js";
import { ACCOUND_DEL } from "../api/apis.js";
import { ACCOUND_ALLDEL } from "../api/apis.js";
import { ACCOUND_EDIT } from "../api/apis.js";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      //  currentPage1: 4,
      currentChange: 1,
      sizeChange: 6,
      total: 0,
      fixinput: "",
      region: "",

      dialogFormVisible: false,

      formLabelWidth: "120px"
    };
  },

  //初始化
  created() {
    //调用封装账号列表请求函数
    this.acc_list();
  },

  methods: {
    //封装账号列表请求函数
    acc_list() {
      ACCOUND_LIST(this.currentChange, this.sizeChange).then(res => {
        // console.log(res.status)
        //  console.log(res)
        this.tableData = res.data.data;
        this.total = res.data.total;
        // console.log(this.total)
        // console.log(this.tableData)
        // console.log(this.tableData.index)
        // console.log(this.tableData)
      });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //多选框事件
    handleSelectionChange(val) {
      //将被选择的多选框赋值给空数组
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },

    //批量删除
    toggleRowSelection(selected) {
      // this.multipleSelection
      // console.log(selected)
      let ids = [];
      //遍历作为参数传过来的被选择的数组
      for (let obj of selected) {
        // console.log(obj.id)
        //将被选择的多选框的数组的id追加到数组
        ids.push(obj.id);
      }
      // console.log(ids)

      //发送请求
      ACCOUND_ALLDEL(JSON.stringify(ids)).then(res => {
        console.log(res);
        //刷新列表
        this.acc_list();
      });
    },
    // 每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.sizeChange = val;
      this.acc_list();
    },
    // 当前页页码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentChange = val;
      this.acc_list();
    },

    //编辑
    handleEdit(row) {
      console.log(row.id, row.account, row.userGroup);
      //将当前id保存到data中
      this.id = row.id;
      //展示模态框
      this.dialogFormVisible = true;

      //将数据放到模态框中
      this.fixinput = row.account;
      this.region = row.userGroup;
    },
    //确认修改
    madefix() {

       this.$confirm('此操作将永久?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //发送请求修改数据
            ACCOUND_EDIT(this.id, this.fixinput, this.region).then(res => {
              console.log(res);
              //刷新列表
              this.acc_list();
            });
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
    
      //影藏模态框
      this.dialogFormVisible = false;
    },

    close() {
      //影藏模态框
      this.dialogFormVisible = false;
    },

    //删除
    handleDelete(row) {
      console.log(row);

       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送请求
             ACCOUND_DEL(row.id).then(res => {
              console.log(res);
              if (res.data.code === 0) {
                this.acc_list();
              }
            });
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


     

      
       
    },
    

  }
};
</script>

<style lang="less" scoped>
#acc_list {
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
 
}
</style>