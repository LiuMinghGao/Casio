<template>
    <div class="app-comment">
        <textarea placeholder="限制最多120个字"  maxlength="120" v-model="msg"></textarea>
        <mt-button size="large" @click="addComment">发表评论</mt-button>
        <div class="cmt-list">
            <div v-for="(p,i) in list" :key="i"  class="cmt-item"> 
                 第{{i+1}}楼 {{p.ctime | datetimeFilter}}
              <div class="cmt-body">
                 {{p.content}}
              </div>
            </div>
        </div>
        <mt-button @click="getMore">加载更多</mt-button>
        <br><br><br><br>
    </div> 
</template>
<script>
import {Toast} from "mint-ui"

export default {
    data() {
        return {
            msg:"",
            pageIndex:0,
            pageSize:7,
            pageCount:1,
            list:[],
            whetherlogin:false
        }
    },
    created(){
        this.checkuid();
        this.getMore();
    },
    methods: {
        getMore(){
           //1：获取新闻编号 nid pno pageSize
           var nid=this.id;
           this.pageIndex++;   //2:当前页码自增
           var pno=this.pageIndex;
           var ps=this.pageSize;
           //3:创建发送ajax请求
           this.axios.get("http://127.0.0.1:3000/getComments?pno="+pno+"&nid="+nid+"&pageSize"+ps)
           .then(result=>{
               var rows =this.list.concat(result.data.data);
               this.list=rows;
              })
           //4:获取返回数据 追加
        },
        checkuid(){
            this.axios.get("http://127.0.0.1:3000/checkuid")
            .then(res=>{
               if(res.data.code>0){
                   this.whetherlogin=true;
               }
              
            })
        },
        addComment(){
            if(!this.whetherlogin){
                Toast("请先登录");
                return;
            }
            var nid = this.id;  //获取两个参数
            var content = this.msg;  //获取新闻编号
            var size = content.trim().length;  //获取评论内容
            if(size == 0){   //内容长度
                 Toast("评论内容不能为空")  //显示信息
                 return 
            }
            var url = "http://127.0.0.1:3000/addComment";
                url+="?nid="+nid+"&content="+content;
            this.axios.get(url).then(result=>{
                if(result.data.code == 1){
                    Toast(result.data.msg);
                    this.msg = "";
                    this.list=[]; // 清空原数据
                    this.pageIndex=0;  //清空页码
                    this.getMore();
                }else{
                    Toast(result.data.msg);
                }
            })
        }
    },
    props:["id"],
}
</script>
<style>
    .app-comment h3{
        font-size: 18px
    }
    .app-comment textarea{
        font-size: 14px;
        height: 60px;
        margin: 0;
    }
    .app-comment .cmt-list{
        margin:5px 0;
    }
    .app-comment .cmt-list .cmt-item{
        border: 1px solid #aaa;
        margin-top:15px;
    }
</style>