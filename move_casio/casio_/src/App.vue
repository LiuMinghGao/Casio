<template>
  <div class="app-container">
    <div class="header">
      <div class="casio-logo">
         <router-link to="/Home"><img id="mylogo" src="./img/casio-logo.png" alt=""></router-link>
         <em>CHINA</em>
         <img id="caidan" src="./img/caidan.png" alt="">
      </div>
    </div>
    <div class="myfixed">
        <a href=""><img src="./img/kf.png" alt=""></a>
    </div>
    <!--子组件 router-view-->
    <router-view></router-view>
    
    <!--底部导航栏-->
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item mui-active" to="/Home">
            <img src="./img/sy7.png" alt="">
            <p class="mui-tab-label">首页</p>
        </router-link>
        <router-link class="mui-tab-item" to="/GoodsList">
            <img src="./img/sb1.png" alt="">
            <p class="mui-tab-label">商品</p>
        </router-link>
        <router-link class="mui-tab-item" to="/Login">
            <img src="./img/gr2.png" alt="">
            <p class="mui-tab-label">个人</p>
        </router-link>
        <router-link class="mui-tab-item" to="/shopList">
            <img src="./img/gwc2.png" alt="">
            <p class="mui-tab-label">购物车</p>
        </router-link>
        
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App'
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
      position: fixed;top:420px;right:0;
  }
  .myfixed a img{
      width:1.8rem;
      height:6.3rem;
  }
  .mui-tab-item img{
      width:28px;
      height:28px;
  }
  .mui-tab-item p{
      margin: 0;
      color:#003296;
  }
  .mui-bar-tab .mui-tab-item{
      height:4rem;
  }
</style>
