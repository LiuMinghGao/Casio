<template>
  <div class="app-container">
    <div class="header">
      <div class="casio-logo">
         <router-link to="/Home"><img id="mylogo" src="./img/casio-logo.png" alt=""></router-link>
         <em>CHINA</em>
         <img id="caidan" @click="showmeun" src="./img/caidan.png" alt="">
      </div>
      <div v-show="isshow" class="navlan">
          <div><router-link to="/Login">登录</router-link></div>
          <div><router-link to="/Register">注册</router-link></div>
      </div>
    </div>
    <div class="myfixed">
        <a href=""><img src="./img/kf.png" alt=""></a>
    </div>
    <div id="target"></div>
    <div v-if="myfixed" class="myfixed2">
        <span @click="top">∧</span>
    </div>
    <!--子组件 router-view-->
    <router-view></router-view>
    
    <!--底部导航栏-->
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item mui-active" to="/Home">
            <img src="./img/sy7.png" alt="">
            <p class="mui-tab-label">首页</p>
        </router-link>
        <router-link class="mui-tab-item" to="/shopFl">
            <img src="./img/sb1.png" alt="">
            <p class="mui-tab-label">商品</p>
        </router-link>
        <router-link class="mui-tab-item" to="/Login">
            <img src="./img/gr2.png" alt="">
            <p class="mui-tab-label">个人</p>
        </router-link>
        <router-link class="mui-tab-item myrela" to="/shopList">
            <img src="./img/gwc2.png" alt=""><p class="shopCount">{{$store.getters.optCartCount}}</p>
            <p class="mui-tab-label">购物车</p>
        </router-link>
        
    </nav>
  </div>
</template>
    
<script>
export default {
    name: 'App',
    data(){
      return{
        isshow:false,
        myfixed:false
      }
    },
    mounted(){
        window.addEventListener('scroll', this.scrollToTop)
    },
    
    methods: {
        top(){
          target.scrollIntoView();  
        },
        scrollToTop() { 
　　            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
　　           if(scrollTop>150){
                this.myfixed=true
               }else{
                this.myfixed=false  
               }
        },
        showmeun(){
           if(!this.isshow){
               this.isshow=true;
           }else{
               this.isshow=false;
           }
        }
    },
}
</script>

<style>
.header{
    background: #fff;
    width:100%;
    z-index: 1;
    position: fixed;
}
.casio-logo{
    height:60px;
    padding-top:1rem;
    padding-bottom: 1rem;
}
#mylogo{
    vertical-align: middle;
    margin-left: 5px;
}
  .casio-logo em{
    font-size: 12px;
    margin-left:.25em;
    margin-top:10px;
    padding-left: .5em;
    font-style: normal;
    font-weight: 200;
    line-height: 2em;
    color: #5977b3;
    border-left: 1px solid #dae0f2;
  }
  #caidan{
      position: absolute;top:14px;right:8px;
      z-index: 10;
      height:35px;
      width:35px;
  }
  .myfixed{
      position: fixed;top:380px;right:0;
  }
  .myfixed a img{
      width:1.8rem;
      height:6.3rem;
  }
  .mui-tab-item img{
      width:28px;
      height:28px;
      position: relative;
  }
  .mui-tab-item p{
      margin: 0;
      color:#003296;
  }
  .mui-bar-tab .mui-tab-item{
      height:4rem;
  }
  .shopCount{
      color:#fff !important;
      width:18px;
      height:20px;
      border-radius: 10px;
      background: red;
      position: absolute;
      top:2px;
      left: 50%;
  }
  .myrela{
      position: relative;
  }
  .myfixed2{
      width:29px;
      height:28px;
      background: #7a7a7a;
      position: fixed;
      top:490px;
      right: 0;
      z-index: 1;
      text-align: center;
  }
  
  .navlan{
      width:60px;
      height:70px;
      background:#fff;
      position: fixed;
      top:50px;
      right:0;
      text-align: center;
      padding: 5px 10px;
      border-radius: 10px
  }
  .navlan div{
      padding: 5px 0;
  }
  .navlan div a{
     color:#000;
     font-size: 14px;
  }

</style>
