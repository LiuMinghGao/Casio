<template>
    <div class="app-ginfo">
        <table></table>
        <div class="mylist1">
            <ul>
               <li><img src="../../img/sy5.png" alt=""></li>
               <li>></li>
               <li>手表</li>
               <li>></li>
               <li>主题系列</li>
               <li>></li>
               <li>{{list2.title}}</li>
           </ul>
        </div>
        <div class="mytop">
            <div>{{list2.title}}</div>
            <div><img src="../../img/g-shock1.png" alt=""></div>
        </div>
        <mt-swipe>
            <mt-swipe-item  v-for="(item,i) in list" :key='i'>
               <img :src="item">
            </mt-swipe-item>
        </mt-swipe>
        <div class="mybg">
            <div @click="showorhide" class="myblack">
                <h5>概要</h5>
                <span>{{msg}}</span>
            </div>
            <div v-show="isShow" class="my_list">
                <ul>
                    <li>{{list2.title}}</li>
                    <li><span>new</span><span>{{list2.shelf_time |  datetimeFilter}}</span></li>
                    <li>价格：{{list2.price}}元</li>
                </ul>
                <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodsSub">-</button>
					<input id="test" class="mui-input-numbox" type="number" v-model="val" value="1"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button"  @click="goodsAdd">+</button>
				</div>
                <div class="mybutton"><button>立即购买</button><button @click="addCart">加入购物车</button></div>
            </div>
            
            <div class="column">
                <div><a href="#trait">主要特点</a></div>
                <div><a href="#support">客户支持</a></div>
            </div>
            <div id="trait" class="message">
                <div><h4>主要特点</h4></div>
                <div>
                    <p>本款是与今年成立15周年的洛杉矶品牌THEHUNDREDS®合作推出的。 原型采用DW-5600款， 设计上使用哑光黑色表圈和表带，与充满活力、色彩鲜艳的THEHUNDREDS® LOGO相结合。 顶部短表带标有“BLOOD SWEAT＆YEARS”字样，标志着品牌的历史，而底部长表带则印有品牌LOGO。</p>
                    <p>主要功能：</p>
                    <p>
                        防震
                        <br>
                        200米防水
                        <br>
                        电子荧光照明
                        <br>
                        秒表（1/100秒）
                        <br>
                        12/24小时时制
                        <br>
                        倒计时
                        <br>
                        多功能闹铃，整点响报
                        <br>
                        全自动日历
                    </p>
                </div>
            </div>
            <div class="mybg2">
                <div class="links">
                    <div>相关链接</div>
                    <div>
                      <a href="">
                         <img src="../../img/c-202-113.jpg" alt="">
                         <p>G-SHOCK官网</p>
                      </a>
                      <a href="">
                         <img src="../../img/202-113 (1).jpg" alt="">
                         <p>G-SHOCK官网</p>
                      </a>
                      <a href="">
                         <img src="../../img/202-113 (1).jpg" alt="">
                         <p>G-SHOCK官网</p>
                      </a>
                      <a href="">
                         <img src="../../img/caidan1.png" alt="">
                         <p>G-SHOCK官网</p>
                      </a>
                      <a href="">
                         <img src="../../img/c-202-113 (1).jpg" alt="">
                         <p>G-SHOCK官网</p>
                      </a>
                      <a href="">
                         <img src="../../img/c-202-113 (2).jpg" alt="">
                         <p>G-SHOCK官网</p>
                      </a>
                    </div>
                </div>
                <div id="support" class="support">
                    <h4>客户支持</h4>
                    <div>
                        <ul>
                            <li>FAQ</li>
                            <li>说明书</li>
                            <li>下载中心</li>
                            <li>IOS/Android</li>
                            <li>操作视频</li>
                            <li>销售网络</li>
                            <li>维修网络</li>
                            <li>联系方式</li>
                        </ul>
                    </div>
                </div>
            </div>  
            
            <footer-box></footer-box>
        </div>    
    </div>
</template>
<script>
import footer from "../sub/footer.vue";
import {Toast} from "mint-ui";
export default {
    created(){
        this.getGoodsInfo();
    },
    components:{
      "footer-box":footer
    },
    data(){
        return{
            msg:"-",
            isShow:true,
            list:[],
            list2:[],
            list3:[],
            val:1,
            did:this.$route.query.pid
        }
    },
    methods:{
        addCart(){
           var did=this.did;
           var price=this.list2.price;
           var count=this.val;
           this.axios.get("http://127.0.0.1:3000/addCart?did="+did+"&price="+price+"&count="+count)
           .then(res=>{
               if(res.data.code>0){
                   Toast(res.data.msg)
               }else{
                   Toast("请先登录")
               }
           })
        },
        goodsSub(){
            if(this.val>1)
            this.val--
        },
        goodsAdd(){
            this.val++
        },
        getGoodsInfo(){
            this.axios.get("http://127.0.0.1:3000/getDetails/?did="+this.did)
            .then(res=>{
              this.list=JSON.parse(res.data[0].img);
             console.log(res.data)
              this.list2=res.data[0];
            })
        },
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
.app-ginfo{
    background: #fff
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
     padding-left: 1.5rem;
 }
 .mylist1 ul li:not(:last-child){
     color:#003296;
     font-size:13px;
 }
 .mylist1 ul li:last-child{
      font-size:13px;
 }
 .mylist1 ul li>img{
     width:14px;
     vertical-align: middle;
 }
.mylist1 ul li{
     margin-left: .5rem;
 }
 .mytop{
     margin-top:2rem;
     margin-left:2rem;
 }
 .mytop div:first-child{
    margin-top: 1em;
    font-size: 1.333em;
    font-family: STXihei, STHeiti, '华文细黑', 'Microsoft YaHei New', 'Microsoft Yahei', '微软雅黑', 'Lantinghei SC', Lantinghei, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, 'Arial Unicode MS', sans-serif;
 }
 .mytop div img{
     margin-top: 1rem;
 }
 div.mint-swipe{
     height:250px;
     margin-top: 2rem
 }
 div.mint-swipe{
     text-align: center
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
 .my_list ul{
     list-style-type: none;
     padding-left:1rem;
 }
 .my_list ul li:not(:first-child){
     color:#000;
     font-size:1rem;
 }
 .my_list ul li:first-child{
      font-size:1.2em;
      margin-bottom: .5rem;
 }
 .my_list ul li span:first-child{
    background: #c81d1d;
    color:#fff;
    margin-right: .8rem;
    margin-bottom: .5rem;
 }
 .mybg{
     background:#f5f5f5;
 }
 .column{
     margin-top: 1rem
 }
 .column div a{
     display: block;
     padding: .9em 4%;
     text-decoration: none;
     color: #100d0d;
     width:92%;
     font-size:1rem;
     margin-left: 1rem;
     border-bottom:1px solid #e3e3e3;
 }
 .message{
     background: #fff;
     width:92%;
     margin:0 auto;
     padding-left: .8rem;
     margin-top:2rem;
     
 }
 .message h4{
     padding: 1.2rem .8rem .2rem 0;
     border-bottom:1px solid #e3e3e3
 }
 .message p{
    font-size: 1rem;
    color:#000;
    margin-bottom: 1rem
 }
 .message div:last-child p:first-child{
     margin-top:1.5rem
 }
 .message div:last-child p:last-child{
     padding-bottom: 2rem
 }
 .mybg2{
     background: #fff
 }
 .support{
     width:92%;
     margin-left: 1rem;
     background: #fff;
     padding-bottom: 1rem
 }
 .support h4{
     border-bottom: 1px solid #e3e3e3;
     padding:1rem 1rem .2rem .5rem;
     margin-bottom: 1em;
     font-size: 1.1rem;
 }
 .support ul{
     list-style-type: none;
     padding-left:0;
 }
 .support ul li{
     background: #e4e4e4;
     padding: .6rem .5rem;
     margin:.3rem 0;
     font-family: STXihei, STHeiti, '华文细黑', 'Microsoft YaHei New', 'Microsoft Yahei', '微软雅黑', 'Lantinghei SC', Lantinghei, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, 'Arial Unicode MS', sans-serif;
 }
 .links div:first-child{
     padding: .8rem 1rem .2rem 0;
     border-bottom: 1px solid #e3e3e3;
     width: 92%;
     margin-left: 1rem
 }
 .links div:last-child{
     padding: .9rem .2rem
 }
 .links div>a{
     width:46%;
 }
 .links div>a img{
     width:100%;
 }
 .links div:last-child{
     display: flex;
     justify-content:space-around;
     flex-wrap: wrap
 }

.mui-numbox{
    margin-left: 1rem
}
.mybutton{
    margin:.5rem 1rem;
    height:1.5rem
}
.mybutton button:last-child{
    margin-left:.3rem
}
div.mint-swipe{
    height:230px;
}
div.mint-swipe-item:not(:first-child)>img{
    width:70%;
}

</style>


