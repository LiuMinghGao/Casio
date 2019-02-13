// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入mint-ui css 文件
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
//导入 mui 的样式表 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
//导入 mui 的样式表，扩展图标样式，购物车图标
import './lib/mui/css/icons-extra.css'

//引入mint-ui组件库
//1.引入指定组件名
import {Swipe,SwipeItem,Button} from "mint-ui";
//2.注册指定组件（注册一个组件）

Vue.component(Swipe.name,Swipe);//轮播图
Vue.component(SwipeItem.name,SwipeItem);//轮播图子标签
Vue.component(Button.name,Button);//加载按钮
//3.在Home.vue 使用组件

//post请求 引入 qs 
import qs from "qs";
Vue.prototype.qs=qs;

//4.引入axios库
import axios from "axios"
//5.修改配置信息，跨域保存session值
axios.defaults.withCredentials=true
//6.注册组件
Vue.prototype.axios=axios
//7.创建全局日期格式过滤器
Vue.filter("datetimeFilter",function(val){
  //val 当前的日期对象
  //1.创建一个日期的对象
  var date = new Date(val);
  //2.获取年月日时分秒
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDate();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();
  //3.拼接字符串
  m<10&&(m="0"+m); //&&相当于if
  d<10&&(d="0"+d); //&&相当于if
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})
Vue.filter("money",function(val){
  return val.toFixed(2);
})
/*vuex*/
import Vuex from "vuex";
Vue.use(Vuex);
var store=new Vuex.Store({
     state:{cartCount:0},
  mutations:{
    update(state){
      axios.get("http://127.0.0.1:3000/getCount")
      .then(res=>{
       if(res.data.count==null){
          state.cartCount=0;
       }else{
        state.cartCount=res.data.count;
       }
     
      })

    }
  },
  getters:{
    optCartCount:function(state){
      return state.cartCount;
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
