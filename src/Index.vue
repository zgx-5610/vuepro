<template>

    <div id="index">
        <el-container>
            <el-aside width="20%">
                <div id="left">
                   
                    <el-col>

                        <el-menu
                        :default-active="defaultActive"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#2d3a4b"
                        text-color="#fff"
                        unique-opened
                        router
                        active-text-color="#ffd04b">

                         <div class="left_head">
                            <div>
                                <img src="./assets/images/外卖 .png" alt="">
                            </div>
                            <h3>小样后台</h3>
                        </div>

                        <div v-for="item in newtreeList" :key="item.index">

                             <el-submenu v-if="item.children" :index="item.index">
                                <template slot="title">
                                <i :class="item.class"></i>
                                <span>
                                    {{item.title}}
                                </span>
                                </template>
                                <el-menu-item-group v-for="child in item.children" :key="child.index">

                                    <el-menu-item :index="child.toindex">{{child.context}}</el-menu-item>
                                  
                                </el-menu-item-group>
                         
                            </el-submenu>

                             <el-menu-item v-else :index='item.index'>
                                    <i :class="item.class"></i>
                                    <span slot="title">
                                        {{item.title}}
                                    </span>
                            </el-menu-item>
                        </div>
                        </el-menu>
                    </el-col>

                  
                </div>
            </el-aside>
            
            <el-container>
                <el-header>
                    <!-- 面包屑导航 -->
                    <el-breadcrumb v-for="item in breadList" :key="item.index" separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{item}}</el-breadcrumb-item>
                      
                    </el-breadcrumb>

                    <!-- 个人中心 -->
                    <div class="personal">
                      <router-link to="/index/personal">
                       <span>欢迎你，{{acc}}</span>
                       <div class="personal_img">
                         <img :src="img">
                       </div>
                      </router-link>
                    </div>


                   
                </el-header>
                <el-main>
                     <div id="right">
                        <router-view/>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
</template>

<script>
import { CHECKTOKEN, PERSONAL } from "./api/apis.js";
export default {
  data() {
    return {
      treeList: [
        {
          index: "/index",
          class: "el-icon-s-home",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/index/order",
          class: "el-icon-s-order",
          title: "订单管理",
          role: ["super"]
        },
        {
          index: "/index/commodity",
          class: "el-icon-menu",
          title: "商品管理",
          children: [
            { toindex: "/index/commodity/commodity_info", context: "商品列表" },
            { toindex: "/index/commodity/commodity_add", context: "商品添加" },
            { toindex: "/index/commodity/commodity_class", context: "商品分类" }
          ],
          role: ["super", "normal"]
        },
        {
          index: "/index/shop",
          class: "el-icon-menu",
          title: "店铺管理",
          role: ["super", "normal"]
        },
        {
          index: "/index/acc",
          class: "el-icon-user",
          title: "账号管理",
          children: [
            { toindex: "/index/acc/acc_list", context: "账号列表" },
            { toindex: "/index/acc/acc_add", context: "添加账号" },
            { toindex: "/index/acc/acc_fix", context: "修改密码" }
          ],
          role: ["super"]
        },
        {
          index: "/index/sales",
          class: "el-icon-s-data",
          title: "销售统计",
          children: [
            { toindex: "/index/sales/sales_shop", context: "商品统计" },
            { toindex: "/index/sales/sales_order", context: "订单统计" }
          ],
          role: ["super", "normal"]
        }
      ],
      breadList: ["后台首页"],
      defaultActive: "",
      acc: "",
      token: "",
      // message:'欢迎你',
      role: "",
      img: ""
    };
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route: {
      handler: val => {
        window.__indexthis.changeBreadlist(val.path);
      },
      // 深度观察监听
      deep: true
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeBreadlist(hash) {
      let arr = [];
      switch (hash) {
        case "/index":
          arr = ["后台首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/commodity":
          arr = ["商品管理"];
          break;
        case "/index/commodity/commodity_info":
          arr = ["商品管理/商品列表"];
          break;
        case "/index/commodity/commodity_add":
          arr = ["商品管理/商品添加"];
          break;
        case "/index/commodity/commodity_class":
          arr = ["商品管理/商品分类"];
          break;
        case "/index/shop":
          arr = ["店铺管理"];
          break;
        case "/index/acc":
          arr = ["账号管理"];
          break;
        case "/index/acc/acc_list":
          arr = ["账号管理/账号列表"];
          break;
        case "/index/acc/acc_add":
          arr = ["账号管理/添加账号"];
          break;
        case "/index/acc/acc_fix":
          arr = ["账号管理/修改密码"];
          break;
        case "/index/sales":
          arr = ["销售统计"];
          break;
        case "/index/sales/sales_shop":
          arr = ["销售统计/商品统计"];
          break;
        case "/index/sales/sales_order":
          arr = ["销售统计/订单统计"];
          break;
        case "/index/personal":
          arr = ["后台首页/个人中心"];
          break;
      }
      this.breadList = arr;
    }
  },
  created() {
    this.id = localStorage.getItem("id");
    PERSONAL(this.id).then(res => {
      this.img = res.data.accountInfo.imgUrl;
      console.log(res.data.accountInfo.imgUrl);
    });
    this.role = localStorage.getItem("role");
    console.log(this.role);
    this.token = localStorage.getItem("token");
    CHECKTOKEN(this.token).then(res => {
      console.log(res);
      if (res.data.code === 0) {
        return false;
      } else {
        // this.message = '<a href="/Login">登录过期，请重新登录</a>'
      }
    });

    let hash = this.$route.path;
    this.defaultActive = hash;
    this.changeBreadlist(hash);

    this.acc = localStorage.getItem("acc");

    window.__indexthis = this;
  },
  computed: {
    newtreeList() {
      //权限
      return this.treeList.filter(i => i.role.includes(this.role));
    }
  }
};
</script>

<style lang="less" scoped>
@base: #2d3a4b;

#index {
  width: 100%;
  height: 100%;
  //   position: fixed;
  .el-container {
    height: 100%;
    .el-aside {
      //   position: fixed;

      height: 100%;
      border: none;
      background: #2d3a4b;
      #left {
        width: 100%;
        // height: 100%;
        .el-col {
          .el-menu {
            border: none;
          }
        }
        .left_head {
          padding: 20px 0 0 8px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          div {
            width: 30px;
            height: 30px;
            padding: 8px;
            background: skyblue;
            border-radius: 50%;
            img {
              width: 100%;
              border-radius: 50%;
            }
          }
          h3 {
            margin-left: 10px;
          }
        }
        div {
          color: #8b95a0;
          line-height: 60px;
          //   margin: 10px;
          //   font-size: 14px;
          .el-menu {
            background: #2d3a4b;
            color: #fff;
            .el-menu-item {
              color: #fff;
            }
          }
        }
      }
    }
    .el-header {
      display: flex;
      justify-content: space-between;

      .el-breadcrumb {
        height: 60px;
        line-height: 60px;
      }
      .personal {
        height: 60px;
        line-height: 60px;
        a {
          text-decoration: none;
          color: #000;
          display: flex;
          align-items: center;
        }
        .personal_img {
          width: 40px;
          height: 40px;
          // background: rgb(201, 110, 110);
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
    .el-main {
      // width: 100%;
      height: 100%;
      background: #f0f2f5;
      padding: 20px;
      #right {
      }
    }
  }
}
</style>