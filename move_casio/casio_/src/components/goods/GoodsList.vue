<template>
    <div class="app-glist">
       <table></table>
       <div class="mylist1">
           <ul>
               <li><img src="../../img/sy5.png" alt=""></li>
               <li>></li>
               <li>首页</li>
               <li>></li>
               <li>手表</li>
               <li>></li>
               <li v-if="flId==1">主题系列</li>
               <li v-else>金属系列</li>
           </ul>
       </div>
       <div>
           <p v-if="flId==1" class="myp">主题系列</p>
           <p v-else class="myp">金属系列</p>
       </div>
       <div>
           <img v-if="flId==1" src="../../img/jt.jpg" alt="">
           <img v-else src="../../img/g-shock1206.png" alt="">
       </div>
       <nav>
           <ul>
               <li><div><img src="../../img/icon_search_blue.png" alt=""><span>产品搜索</span></div></li>
               <li><div><img src="../../img/icon_estimate_blue.png" alt=""><span>品牌概念&技术</span></div></li>
               <li><div><img src="../../img/icon_video_blue.png" alt=""><span>相关视频</span></div></li>
               <li><div><img src="../../img/icon_test_blue.png" alt=""><span>IOS应用</span></div></li>
           </ul>
       </nav>
       <div>
           <div @click="showorhide" class="myblack">
              <h5 v-if="flId==1">主题系列</h5>
              <h5 v-else>金属系列</h5>
              <span>{{msg}}</span>
           </div>
           <div v-show="isShow" class="mygoodslist">
              <div v-for="p in list" :key="p.pid" class="mygoods">
                <router-link :to="'/GoodsInfo/?pid='+p.pid">
                    <img :src="p.img">
                    <hr>
                    <ul>
                      <li>{{p.title}}</li>
                      <li>价格：{{p.price}}元</li>
                      <li><span>new</span><span>{{p.shelf_time | datetimeFilter}}</span></li>
                    </ul>
                 </router-link>
               </div>
                     <div v-if="daodi" @click="gengduo" class="myauto">查看更多</div>
                     <div class="myauto mywidth" v-else>到底了</div>
            </div>
            <footer-box></footer-box>
       </div>
       
    </div>
</template>
<script>
import footer from "../sub/footer.vue";
export default {
    components:{
       "footer-box":footer
    },
    created() {
        this.getProductList();
        this.flId=this.$route.query.id
    },
    data(){
        return{
            flId:'',
            msg:"-",
            isShow:true,
            list:[],
            pageIndex:0,
            pageCount:1,
            pageSize:4,
            daodi:true
        }
    },
    methods:{
       showorhide(){
            if(this.isShow){
                this.isShow=false;
                this.msg="+"
            }else{
                this.isShow=true;
                this.msg="-"
            }
        },
        getProductList(){
              this.pageIndex++;
              var fl=this.$route.query.id;
              console.log(fl);
              var pno=this.pageIndex;
              var ps=this.pageSize;
              this.axios.get("http://127.0.0.1:3000/getGoodsList?pno="+pno+"&pageSize"+ps+"&fl="+fl)
             .then(res=>{
                 console.log(res)
                 var rows=this.list.concat(res.data.data);
                 this.list=rows;
                if(res.data.data==""){
                    this.daodi=false;
                }
             })
        },
        gengduo(){
           this.getProductList();
        }
    }
}
</script>
<style>
.app-glist{
    background: #fff;
}
 .app-glist img{
     width:100%;
 }
 .mylist1{
     margin-top:60px;
 }
 .mylist1 ul{
     list-style-type: none;
     display: flex;
     margin:0;
     height:2rem;
     background:#f5f5f5;
     line-height: 2rem;
 }
 .mylist1 ul li:not(:last-child){
     color:#003296;
     font-size:13px;
 }
 .mylist1 ul li:last-child{
      font-size:13px;
 }
 .myp{
     margin-left: 2.2rem;
     color:#000;
     font-size: 20px;
     margin-top: 1.5rem;
 }
 .mylist1 ul li>img{
     width:13px;
     vertical-align: middle;
 }
 .mylist1 ul{
     padding-left: 1.5rem;
 }
 .mylist1 ul li{
     margin-left: .5rem;
 }
 nav ul{
     list-style-type: none;
 }
 nav ul li div img{
     width:36px !important;
     vertical-align: middle;
 }
 nav ul li div span{
     margin-left: .8rem;
 }
 nav ul{
     padding-left:1.2rem;
     width:96%;
 }
 nav ul li{
     height:4rem;
     border-top:1px solid #e9e9e9;
     line-height: 4rem;
 }
 .myblack{
        width:92%;
        margin-left: 0.9rem;
        background:#100d0d;
        height:3.1rem;
        padding:0.8rem;
        display: flex;
        justify-content: space-between
    }
    .myblack h5{
        font-weight: bold;
        color:#fff;
    }
    .myblack span{
        color:#fff;
    }
    .mygoods{
        width:40%;
        padding:8px 5px;
        margin:0 14px;
        text-align: center;
    }
    .mygoods img{
        width:6.5rem;
        height:9rem;
    }
    .mygoods hr{
       color:#eee;
    }
    .mygoods ul{
        list-style-type: none;
        padding-left: 3px;
    }
    .mygoods ul li{
        color:#000;
    }
    .mygoods ul li{
       text-align: left
    }
    .mygoods ul li:not(:first-child){
        font-size: .8rem;
    }
    .mygoods ul li span:first-child{
        background: #c81d1d;
        color:#fff
    }
    .mygoods ul li span:last-child{
        margin-left: .8rem;
    }
    .mygoodslist{
        display: flex;
        flex-wrap: wrap;
        justify-content:space-between;
    }
    .myauto{
        margin:10px 40%;
    }
    .mywidth{
        width:100%;
    }
</style>


