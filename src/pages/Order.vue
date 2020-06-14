<template>
    <div id="order">
        <el-form ref="form" :model="sizeForm" >
            <div>
                 <el-form-item label="订单号">
                <el-input v-model="sizeForm.orderNo"></el-input>
                </el-form-item>
                <el-form-item label="收件人">
                    <el-input v-model="sizeForm.consignee"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="sizeForm.phone"></el-input>
                </el-form-item>   
            </div>
           

            <el-form-item label="订单状态">
                <el-select v-model="sizeForm.orderState" placeholder="请选择活动区域">
                <el-option label="已完成" value="已完成"></el-option>
                <el-option label="派送中" value="派送中"></el-option>
                <el-option label="已受理" value="已受理"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="选择时间">
                <el-date-picker
                  v-model="value"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
 
 
            <el-form-item size="large">
                <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
        </el-form>

         <el-table
            :data="tableData"
            border
            style="width: 100%"
            >
            <el-table-column
              fixed
              prop="orderNo"
              label="订单号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="orderTime"
              label="下单时间"
              width="120">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="consignee"
              label="收货人"
              width="120">
            </el-table-column>
            <el-table-column
              prop="deliverAddress"
              label="配送地址"
              width="200">
            </el-table-column>
            <el-table-column
              prop="deliveryTime"
              label="送达时间"
              width="120">
            </el-table-column>
             <el-table-column
              prop="remarks"
              label="用户备注"
              width="120">
            </el-table-column>
             <el-table-column
              prop="orderAmount"
              label="订单金额"
              width="120">
            </el-table-column>
            <el-table-column
              prop="orderState"
              label="订单状态"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="fixClick(scope.row)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="block">
          
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="sizePage"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>


          <!-- 查看/编辑模态框 -->
          <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
              <el-form :model="check">
                <el-form-item label="订单号" :label-width="formLabelWidth">
                   <p v-if="ischeck">{{check.orderNo}}</p>
                  <el-input v-else v-model="check.orderNo" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="下单时间" :label-width="formLabelWidth">
                  <p v-if="ischeck">{{check.orderTime}}</p>
                  <el-input  v-else v-model="check.orderTime" autocomplete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="联系电话" :label-width="formLabelWidth">
                  <p v-if="ischeck">{{check.phone}}</p>
                  <el-input v-else v-model="check.phone" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="收货人" :label-width="formLabelWidth">
                  <p v-if="ischeck">{{check.consignee}}</p>
                  <el-input v-else v-model="check.consignee" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="送货地址" :label-width="formLabelWidth">
                  <p v-if="ischeck">{{check.deliverAddress}}</p>
                  <el-input v-else v-model="check.deliverAddress" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="送达时间" :label-width="formLabelWidth">
                  <p v-if="ischeck">{{check.deliveryTime}}</p>
                  <el-input v-else v-model="check.deliveryTime" autocomplete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="备注" :label-width="formLabelWidth">
                  <p v-if="ischeck">{{check.remarks}}</p>
                  <el-input v-else v-model="check.remarks" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="订单金额" :label-width="formLabelWidth">
                  <p v-if="ischeck">{{check.orderAmount}}</p>
                  <el-input v-else v-model="check.orderAmount" autocomplete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="订单状态" :label-width="formLabelWidth" disabled>
                  <p v-if="ischeck">{{check.orderState}}</p>
                  <el-select v-else v-model="check.orderState" placeholder="请选择活动区域">
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="派送中" value="派送中"></el-option>
                    <el-option label="已受理" value="已受理"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="closecheck">取 消</el-button>
                <el-button v-if="isfix" type="primary" @click="madecheck(check)">编辑</el-button>
              </div>
          </el-dialog>


            </div>
        </template>

<script>
import { ORDERLIST, ORDERSEARCH, ORDERDETAIL,ORDEREDIT } from "../api/apis.js";
export default {
  data() {
    return {
      sizeForm: {
        orderNo: "",
        phone: "",
        consignee: "",
        orderState: ""
        // value: ''
      },

      dialogFormVisible: false,
      check: {},
      formLabelWidth: "120px",
      currentPage: 1,
      sizePage: 6,
      total: 0,
      tableData: [],
      
      ischeck: false,
      isfix: false,

      value: [new Date(2020, 0, 0, 0, 0), new Date(2021, 0, 0, 0, 0)]
    };
  },

  created() {
    //初始化
    this.updata();
 
  },

  methods: {
      resolvingDate(date) {
      //date是传入的时间
      let d = new Date(date);

      let month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

      let times =
        d.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        min +
        ":" +
        sec;

      return times;
    },

    updata() {
      //获取订单列表接口
      ORDERLIST(this.currentPage, this.sizePage).then(res => {
        console.log(res);
        for(let item of res.data.data){
          item.deliveryTime = this.resolvingDate(item.deliveryTime)
          item.orderTime = this.resolvingDate(item.orderTime)
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
        
        console.log(this.tableData)
      
      });
    },

    //查询
    query() {
      //调用查询接口
      ORDERSEARCH(
        this.currentPage,
        this.sizePage,
        this.sizeForm.orderNo,
        this.sizeForm.consignee,
        this.sizeForm.phone,
        this.sizeForm.orderState,
        this.sizeForm.value
      ).then(res => {
        console.log(res);
        this.tableData = res.data.data;
      });
      // console.log(this.currentPage,this.sizePage,this.sizeForm.orderNo,this.sizeForm.consignee,this.sizeForm.phone,this.sizeForm.orderState,this.sizeForm.value)
    },

    //查看
    handleClick(row) {
      console.log(row);
      //产看模式显示
      this.ischeck = true;
      //编辑按钮影藏
      this.isfix = false;
      //产看接口
      ORDERDETAIL(row.id).then(res => {
        this.check = res.data.data;
        this.check.deliveryTime= this.resolvingDate(res.data.data.deliveryTime)
        this.check.orderTime = this.resolvingDate(res.data.data.orderTime)
      });
      this.dialogFormVisible = true;
    },
    //取消
    closecheck() {
      this.dialogFormVisible = false;
    },
    //确认编辑信息
    madecheck(row) { 
      //查看接口
      ORDEREDIT(
        row.id,
        row.orderNo,
        this.check.orderTime,
        row.phone,
        row.consignee,
        row.deliverAddress,
        this.check.orderTime,
        row.remarks,
        row.orderAmount,
        row.orderState
      ).then(res => {
        console.log(res)
        this.updata();
      });
      this.dialogFormVisible = false;
    },

    //编辑
    fixClick(row) {
      console.log(row);
      //编辑模式显示
      this.ischeck = false;
      //编辑按钮显示
      this.isfix = true;
      this.dialogFormVisible = true;
      //编辑接口
      ORDERDETAIL(row.id).then(res => {
        this.check = res.data.data;
        this.check.deliveryTime= this.resolvingDate(res.data.data.deliveryTime)
        this.check.orderTime = this.resolvingDate(res.data.data.orderTime)
        console.log(this.check);
      });
    },

    //每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.sizePage = val;
      this.updata();
    },

    // 当前页码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.updata();
    }
  }
};
</script>

<style lang="less" scoped>
.el-form-item__content {
  margin-left: 0;
}
#order {
  height: 100%;
  background: #fff;
  .el-form {
    background: #fff;
    padding: 10px;
    div {
      display: flex;
      // justify-content: space-around;s
      .el-form-item {
        margin-left: 10px;
      }
    }
  }
}
</style>