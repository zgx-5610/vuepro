<template>
    <div id="home">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple icon">
                    <img src="../assets/images/dt_icon_16.png" alt="">
                    <div>
                        <h4>总订单</h4>
                        <p>{{this.totalOrder}}</p>
                    </div>
                </div>
            </el-col>
           <el-col :span="6">
                <div class="grid-content bg-purple icon">
                    <img src="../assets/images/金币.png" alt="">
                    <div>
                        <h4>总销售额</h4>
                        <p>{{totalOrder}}</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple icon">
                    <img src="../assets/images/order_unread.png" alt="">
                    <div>
                        <h4>今日订单数</h4>
                        <p>{{totalOrder}}</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple icon">
                    <img src="../assets/images/美元.png" alt="">
                    <div>
                        <h4>今日销售额</h4>
                        <p>{{totayAmount}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div id="myChart" style="width: 90%;height:400px;"></div>
    </div>
</template>

<script>
import {ORDERTOTALDATA} from '../api/apis.js'
export default {
    data(){
        return{
            todayOrder:'',
            totalAmount:'',
            totalOrder:'',
            totayAmount:''
        }
    },
    mounted(){
        this.drawLine();
    },
    methods:{
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            ORDERTOTALDATA().then((res)=>{
                console.log(res)
                this.todayOrder = res.data.todayOrder
                this.totalAmount = res.data.totalAmount
                this.totalOrder = res.data.totalOrder
                this.totayAmount = res.data.totayAmount
                 var Option = {
                title: {
                    text: '数据统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['订单数据', '金额数据']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: res.data.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '订单数据',
                        type: 'line',
                        stack: '总量',
                        data: res.data.amountData
                    },
                    {
                        name: '金额数据',
                        type: 'line',
                        stack: '总量',
                        data: res.data.orderData
                    },
                 
                ]
            }
                
            
            myChart.setOption(Option)

            })
          


        }
    }

};
</script>

<style lang="less" scoped>
#home {
    width: 100%;
    // background: #cfd3d6;
  .el-row {
      display: flex;
      justify-content: space-around;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
      margin: 10px;
      height: 100px;
    background: #fff;
    border-radius: 4px;
    .icon {
      display: flex;
      justify-content: space-between;
      padding: 20px 10px;
      img {
        width: 50px;
      }
      div {
        h4 {
          color: #ccc;
        }
      }
    }
  }
}
</style>