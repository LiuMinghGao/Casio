<template>
    <div class="app-NewsInfo">
        <table></table>
        <h4>{{info.title}}</h4>
        <p>{{info.ctime | datetimeFilter }}</p>
        <p>{{info.content}}</p>
        <comment-box :id="id"></comment-box> 
    </div>
</template>
<script>
import comment from "../sub/comment.vue";
export default{
    components:{
       "comment-box":comment,
      
    },
    created(){
        this.getNewsInfo();
    },
    data(){
        return{
         info:{},
         id:this.$route.query.id
        }
    },
    methods:{
         getNewsInfo(){
              var id=this.$route.query.id;
              this.axios.get("http://127.0.0.1:3000/getNewsInfo?id="+id)
              .then(res=>{
                 this.info=res.data.data;
              })
          }
    }
}
</script>
<style>
   .app-NewsInfo h4{
       margin-top:4.5rem;
       padding: 0 1rem;
   }
   .app-NewsInfo p{
      padding: 0 1rem;
   }
   
</style>