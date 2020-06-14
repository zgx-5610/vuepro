<template>
    <div id="sales_order">
        <template>
        <div class="block">
            <span class="demonstration">时间范围</span>
            <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" @click="check">查询</el-button>
        </div>
        
        </template>

        <div id="myChart" style="width: 90%;height:400px;"></div>

    </div>
</template>

<script>
import { ORDERTOTAL } from "../api/apis.js";

export default {
  data() {
    return {
      value1: [new Date(2020, 0, 0, 0, 0), new Date(2021, 0, 0, 0, 0)]
    };
  },
  mounted() {
    let arr = [];
    for (let item of this.value1) {
      arr.push(this.resolvingDate(item));
    }
    this.value1 = arr;
    console.log(this.value1);
    this.drawLine();
  },

  methods: {
    check() {
      ORDERTOTAL(JSON.stringify(this.value1)).then(res => {
        console.log(res);
        this.drawLine()
      });
    },
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
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      console.log(JSON.stringify(this.value1));
      ORDERTOTAL(JSON.stringify(this.value1)).then(res => {
        console.log(res);
        var orderAmount = res.data.data.map(i => {
          return i.orderAmount;
        });
        var orderTime = res.data.data.map(i => {
          return i.orderTime;
        });

        var Option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ["蒸发量"]
          },
          xAxis: [
            {
              type: "category",
              data: orderTime,
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "统计数据",
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: "{value} ml"
              }
            }
          ],
          series: [
            {
              name: "时间",
              type: "bar",
              data: orderAmount
            }
          ]
        };
        myChart.setOption(Option);
      });
    }
  }
};
</script>

<style lang="less" scoped>
#sales_order {
  height: 100%;
  background: #fff;
  padding: 10px;
  .block {
    .el-range-editor.el-input__inner {
      margin: 0 10px;
    }
  }
}
</style>