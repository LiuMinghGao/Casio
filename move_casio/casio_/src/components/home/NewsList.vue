<template>
     <div class="information">
            <table></table>
            <div>
               <ul class="product-news">
                 <li v-for="p in list" :key="p.id" class="news-item">
                   <router-link :to="'/NewsInfo?id='+p.id">
                      <p><span>{{p.ctime | datetimeFilter }}</span><span class="colortitle">{{p.classify}}</span></p>
                      <p>{{p.title}}</p>
                   </router-link>
                 </li>
               </ul>
               <button class="mybtn" @click="getlist">加载更多</button>
               <br><br><br><br><br>
           </div>
     </div> 
</template>
<script>
export default {
    created(){
       this.getlist();
    },
    data(){
        return{
             list:[],   //返回数据
             pageIndex:0,  //当前页码
             pageSize:8,   //页大小
             pageCount:1,   //总页数
        }
    },
    methods:{
       getlist(){
            this.pageIndex++;
            var pno=this.pageIndex;
            var ps=this.pageSize;
            this.axios.get("http://127.0.0.1:3000/getNews?pno="+pno+"&pageSize="+ps)
            .then(res=>{
                var rows=this.list.concat(res.data.data);
                this.list=rows;                
                this.pageCount=res.data.pageCount; 
            })
       }
    }
}
</script>
<style>
.small-title{
    width:5.4rem !important;
  }
  .information div:first-child{
    height:1.3rem;
    font-size:0.8rem;
  }
  .information>div{
    width:92%;
    margin-left: 1rem;
  }
  .information div:first-child span{
    font-weight: 600
  }

  .news-item{
    height:3.8rem;
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
  .mybtn{
      color:#000;
      margin-top: 1rem;
      margin-left:38%;
  }
  .information>div{
    margin-top:4rem;
  }
</style>
