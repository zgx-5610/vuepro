import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../Login.vue'
import {CHECKTOKEN} from '../api/apis'


Vue.use(VueRouter);

const router = new VueRouter({
   
    routes: [
        { path: '/',name:'login',component: Login },
        { path: '/index',name:'index',component: ()=>import('../Index.vue'),children:[
            {path:'/index/',component:()=>import('../pages/Home.vue')},
            {path:'/index/order',name:'order',component:()=>import('../pages/Order.vue')},
            // {path:'/index/commodity',name:'commodity',component:()=>import('../pages/Commodity_info.vue')},
            {path:'/index/commodity/commodity_info',name:'commodity_info',component:()=>import('../pages/Commodity_info.vue')},
            {path:'/index/commodity/commodity_add',name:'commodity_add',component:()=>import('../pages/Commodity_add.vue')},
            {path:'/index/commodity/commodity_class',name:'commodity_class',component:()=>import('../pages/Commodity_class.vue')},
            {path:'/index/shop',name:'shop',component:()=>import('../pages/Shop.vue')},
            // {path:'/index/acc',name:'acc',component:()=>import('../pages/Acc_list.vue')},
            {path:'/index/acc/acc_list',name:'acc_list',component:()=>import('../pages/Acc_list.vue')},
            {path:'/index/acc/acc_add',name:'acc_add',component:()=>import('../pages/Acc_add.vue')},
            {path:'/index/acc/acc_fix',name:'acc_fix',component:()=>import('../pages/Acc_fix.vue')},
            // {path:'/index/sales',name:'sales',component:()=>import('../pages/Sales_shop.vue')},
            {path:'/index/sales/sales_shop',name:'sales_shop',component:()=>import('../pages/Sales_shop.vue')},
            {path:'/index/sales/sales_order',name:'sales_order',component:()=>import('../pages/Sales_order.vue')},
            {path:'/index/personal',name:'personal',component:()=>import('../pages/Personal .vue')},

        ] },
       
    ]
});

//路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path != '/'){
        CHECKTOKEN(localStorage.token).then((res)=>{
            console.log(res)
            if(res.data.code==0){
                next()
            }else{
                next('/')
            }
        })
    }else{
        next()
    }
})

export default router;


