
import axios from "axios";

export const APIS = "http://localhost:5000"

//图片上传地址
export const ADDRESS_API = APIS+"/upload/shop/"

//图片上传接口
export const UPDATA_API = APIS+"/shop/upload"

// const dd = APIS+""

axios.defaults.baseURL = "http://localhost:5000"

//登录接口
//account 账号
//password 密码
export const LOGIN = (account,password)=>axios.post('/users/checkLogin',{account,password})

//添加账号
//account 账号
//password 密码
//userGroup  用户组
export const ACCOUND_ADD = (account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})

//获取账号列表
//currentPage  当前页码
//pageSize  每页条数
export const ACCOUND_LIST = (currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})

//删除账号
//id
//要删除账号的id
export const ACCOUND_DEL = (id)=>axios.get('/users/del',{params:{id}})

//批量删除
//ids
//要删除数据的id组成的数组（字符串格式的数组，如: ‘[1, 2, 3]’,需要转为字符串格式）
export const ACCOUND_ALLDEL = (ids)=>axios.get('/users/batchdel',{params:{ids}})

//修改账号
//id   要修改账号的id
//account   账号
//userGroup  用户组
export const ACCOUND_EDIT = (id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup})

//检查旧密码是否正确
//id   旧密码
//oldPwd    帐号id
export const ACCOUND_CHECK = (id,oldPwd)=>axios.get('/users/checkoldpwd',{params:{id,oldPwd}})

//修改密码
//id   帐号id
//newPwd    新密码
export const ACCOUND_FIX = (id,newPwd)=>axios.post('/users/editpwd',{id,newPwd})

//获取账号（个人中心）信息
//id    帐号id
export const PERSONAL = (id)=>axios.get('/users/accountinfo',{params:{id}})
// export const PERSONAL = (id)=>axios.get('/users/accountinfo',{params:{id}})

//头像上传接口
//id    账号id
export const AVATAR = (id)=>axios.post('/users/avatar_upload',{id})


//验证token是否过期
//token    令牌
export const CHECKTOKEN = (token)=>axios.get('/users/checktoken',{params:{token}})

//获取分类
//currentPage    当前页
//pageSize    每页条数
export const CATELIST = (currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})

//添加分类
//cateName    分类名称
//state    是否启用
export const ADDCATE = (cateName,state)=>axios.post('/goods/addcate',{cateName,state})

//删除分类
//id  分类id
export const DELCATE = (id)=>axios.get('/goods/delcate',{params:{id}})

//修改分类
//id    分类id
//cateName    分类名称
export const EDITCATE = (id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state})

//查询所有分类名称
export const CATEGORIES = ()=>axios.get('/goods/categories')


//添加商品
//name   商品名称
//category   商品分类
//price    商品价格
//imgUrl    商品图片地址
//goodsDesc    商品描述
export const GOODSADD = (name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

//获取商品列表
// currentPage    当前页码
// pageSize     每页条数
export const GOODLIST = (currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}})

//删除商品
//id   要删除商品的id
export const GOODSDEL = (id)=>axios.get('/goods/del',{params:{id}})

//修改商品
// name   商品名称
// category   商品分类
// price    商品价格
// imgUrl   商品图片地址
// goodsDesc   商品描述
//id   商品ID
export const GOODSEDIT = (id,name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/edit',{id,name,category,price,imgUrl,goodsDesc})

//获取订单列表(带查询功能)
//currentPage    当前页码
// pageSize    每页条数
// orderNo   订单号
// consignee    收货人
// phone    手机号
// orderState    订单状态
//date    时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
export const ORDERLIST = (currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get('/order/list',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})

//查询
//currentPage    当前页码
// pageSize    每页条数
// orderNo   订单号
// consignee    收货人
// phone    手机号
// orderState    订单状态
//date    时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
export const ORDERSEARCH = (currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get('/order/search',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})

//获取订单详情
//id   订单id
export const ORDERDETAIL = (id)=>axios.get('/order/detail',{params:{id}})

//修改订单
//id    要修改账号的id
// orderNo    订单号
// orderTime    下单时间
// phone    电话
// consignee    收货人
// deliverAddress    送货地址
// deliveryTime   送达时间
// remarks    备注
// orderAmount    订单金额
// orderState    订单状态
export const ORDEREDIT = (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})

//获取店铺详情
export const SHOPINFO = ()=>axios.get('/shop/info')

//店铺内容修改
//id   店铺id
// name   店铺名称
// bulletin   店铺公告
// avatar   店铺头像
// deliveryPrice    起送价格
// deliveryTime   送达时间
// description   店铺描述
// score    店铺好评率
// sellCount    店铺销量
// supports    活动支持
// date     营业时间
// pics    图片
export const SHOPEDIT = (params)=>axios.post('/shop/edit',params)


// 首页报表接口
export const ORDERTOTALDATA = ()=>axios.get('/order/totaldata')

//订单报表接口
//date    字符串格式数组，如["2019-10-01 00:00:00", "2019-10-10 00:00:00"]
export const ORDERTOTAL = (date)=>axios.get('/order/ordertotal',{params:{date}})