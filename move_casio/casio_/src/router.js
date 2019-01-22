import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//1.首页
import Home from "./components/tabbar/Home.vue";
import Login from "./components/tabbar/Login.vue";
import Register from "./components/tabbar/Register.vue";
import NewsList from "./components/home/NewsList.vue";
import NewsInfo from "./components/home/NewsInfo.vue";
import GoodsList from "./components/goods/GoodsList.vue";
import GoodsInfo from "./components/goods/GoodsInfo.vue";
import shopList from "./components/tabbar/shopList.vue";


Vue.use(Router)

export default new Router({
  routes: [
    /*用户访问 / 重新定位 /Home Home显示*/
    {path:'/',redirect:"/Home"},
    {path:'/Home',component:Home},
    {path:'/Login',component:Login},
    {path:'/Register',component:Register},
    {path:'/NewsList',component:NewsList},
    {path:'/NewsInfo',component:NewsInfo},
    {path:'/GoodsList',component:GoodsList},
    {path:'/GoodsInfo',component:GoodsInfo},
    {path:'/shopList',component:shopList}
   
  ]
})