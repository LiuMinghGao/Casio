<template>
    <div class="app-protitle">
        <!-- 商品标题列表 -->
        <div class="mylist">
            <div @click="showorhide" class="myblack">
                <h5>产品</h5>
                <span>{{msg}}</span>
            </div>
            <div v-show="isShow" class="mylist2">
                <div class="list_item">
                    <div class="myimg"><router-link to="/GoodsList"><img src="../../img/list1.png"></router-link></div>
                    <div><router-link to="/GoodsList">手表</router-link></div>
                </div>
                <div class="list_item">
                    <div><a href=""><img src="../../img/list2.png"></a></div>
                    <div><a href="">电子乐器</a></div>
                </div> 
              
                <div class="list_item">
                    <div><a href=""><img src="../../img/list3.png"></a></div>
                    <div><a href="">电子乐器</a></div>
                </div>
                <div class="list_item">
                    <div><a href=""><img src="../../img/list4.png"></a></div>
                    <div><a href="">计算机</a></div>
                </div>
                <div class="list_item">
                    <div><a href=""><img src="../../img/list5.png" alt=""></a></div>
                    <div><a href="">电子教育</a></div>
                </div>
            </div>
        </div>
        <div class="kong"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isShow:true,
            msg:"-"
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
        }
    }
}
</script>
<style>
    .myblack{
        width:92%;
        margin:0 auto;
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
    .list_item{
        width:92%;
        margin:0 auto;
        height:5.6rem;
        display: flex;
        border: solid 1px #dcdcdc;
        border-top: none;
    }
    .myimg a img{
        width:70%;
    }
    .list_item img{
        width:90%;
        padding:0.3rem;
        margin-top: 0.3rem;
        
    }
   
    .list_item div:first-child{
        width:28%;
        text-align: center;
        padding: 0.12rem;
        height:5.5rem;
    }
    .list_item div:last-child{
        padding:2rem;
    }
    .list_item div:last-child a{
        color:#000;
        font-size: 0.8rem;
        font-weight: bold
    }
    .mylist{
        background: #fff;
    }
    .kong{
        height:2.5rem;
        background: #fff
    }
</style>
