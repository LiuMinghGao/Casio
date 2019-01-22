<template>
  <div class="app-home">
    <table></table>
    <!-- 轮播 -->
       <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in list" :key="item.id">
            <img :src="item.img">
        </mt-swipe-item>
       </mt-swipe>
         <!-- 子组件产品列表 -->
       <productTitle-box></productTitle-box>
       <div class="recommend">
          <span>热门推荐</span>
       </div>  
       <!-- 大整体内容 -->
       <div class="index_content">
         <!-- 第一个div -->
           <div>
               <div class="myimg2"><img src="../../img/1.gif" alt="">
               </div>
               <div class="customization">
                  <p>官方商城</p>
                  <h6>个性定制服务</h6>
                  <p></p>
                <span class="myspan">官方商城</span><span><img src="../../img/small-logo.png" alt=""></span>
            </div>
           </div>
           <div>
              <div class="myimg2"><img src="../../img/list_b.jpg" alt="">
              </div>
              <div class="customization">
                <p class="small-title">事件・宣传活动</p>
                <h6>个性定制服务CITY BATTLE 街头制霸 城市对抗赛</h6>
                <p></p>
                <span class="myspan">手表</span><span><img src="../../img/g-shock.png" alt=""></span>
              </div>
           </div>
           <div>
              <div class="myimg2"><img src="../../img/list_b.jpg" alt="">
              </div>
              <div class="customization">
                 <p>官方商城</p>
                 <h6>个性定制服务</h6>
                 <p></p>
                 <span class="myspan">官方商城</span><span><img src="../../img/small-logo.png" alt=""></span>
              </div>
       </div>
   </div>     
       <div class="information">
            <div><span>资讯</span></div>
            <div>
               <ul class="product-news">
                 <li v-for="p in list2" :key="p.id" class="news-item">
                   <router-link :to="'/NewsInfo?id='+p.id">
                      <p><span>{{p.ctime | datetimeFilter }}</span><span class="colortitle">{{p.classify}}</span></p>
                      <p>{{p.title}}</p>
                   </router-link>
                 </li>
               </ul>
               <div class="more"><router-link to="/NewsList">>更多</router-link></div>
            </div>
      </div>
      <!-- 尾部子组件 -->
      <footer-box></footer-box>
  </div>
</template>
<script> 
import productTitle from "../sub/product_title.vue";
import footer from "../sub/footer.vue";
  export default {
     components:{
       "productTitle-box":productTitle,
       "footer-box":footer
    },
    created(){
        this.getImgs();
        this.getnews();
    },
    data(){
      return {
         list:[],
         list2:[]
      }
    },
    methods:{
        getImgs(){
          this.axios.get("http://127.0.0.1:3000/carousel")
          .then(res=>{
             this.list=res.data;
             console.log(res.data[0].img);
             
          })
        },
        getnews(){
          this.axios.get("http://127.0.0.1:3000/getnews")
          .then(res=>{
             this.list2=(res.data.data).slice(1,4);
          })
      }
    }
  }
</script>
<style>

.mint-swipe{
  margin-top:60px;
}
 div.app-home{
     height:14.3rem;
     width:100%;
     background: #fff;
 }
 .mint-swipe-item>img{
     width:100%;
 }
  .recommend{
    height:6rem;
    background:#f5f5f5;
    padding: 2.5rem 1rem;
  }
  .recommend span{
     font-size: 1.2rem;
     font-weight: bold
  }
  .index_content{
    height:57rem;
  
  }
  .myimg2 img{
    height:192px;
    width:100%;
  }
  .index_content>div{
    width:92%;
    margin:0 auto;
    background: #fff;
  }
  .customization{
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
  }
  .customization h6{
    font-weight: bold;
    color:#000;
  }
  .customization span:last-child{
    margin-left: 1rem;
  }
  .customization span:last-child>img{
     vertical-align: middle;
  }
  .myspan{
    font-size: 0.5rem;
    border-right: 1px solid #e8e8e8;
    padding-right:0.5rem;
  }
  .customization p:first-child{
    background: #d57724;
    color:#fff;
    font-size: 0.5rem;
    width:3rem;
    height:1rem;
  }
  .small-title{
    width:5.4rem !important;
  }
  .information div:first-child{
    height:1.3rem;
    border-bottom:1px solid #e6e6e6;
    
    font-size:0.8rem;
  }
  .information>div{
    width:92%;
    margin:0 auto;
  }
  .information div:first-child span{
    font-weight: 600
  }

  .news-item{
    height:4rem;
    border-bottom:1px dashed #999;
  }
  .news-item p{
    margin-bottom: 0.4rem;
    color:#000;
  }
  .colortitle{
    margin-left: 1.5rem;
    line-height: 2rem;
    background: #1774c3;
    display: inline-block;
    margin-right: .5em;
    line-height: 1.2;
    padding: .2em .3em 0;
    font-size: .8em;
    color: #fff;
    font-family: STXihei, STHeiti, '华文细黑', 'Microsoft YaHei New', 'Microsoft Yahei', '微软雅黑', 'Lantinghei SC', Lantinghei, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, 'Arial Unicode MS', sans-serif;
  }
  .news-item p span:first-child{
     font-weight: bold;
     font-family: STXihei, STHeiti, '华文细黑', 'Microsoft YaHei New', 'Microsoft Yahei', '微软雅黑', 'Lantinghei SC', Lantinghei, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, 'Arial Unicode MS', sans-serif;
  }
  .product-news{
    list-style-type: none;
    padding-left:0;
    margin-top:0.5rem;
    margin-bottom:0;
  }
  .news-item a p:first-child{
    margin-top:.5rem;
  }
  .more{
    text-align: right;
    font-size: 14px;
    margin-top:.5rem;
  }
  .information div:first-child span{
    font-size: 1rem
  }
</style>
