<template>
    <div class="app-footer">
       <div class="logos">
           <div class="lianjie">相关链接</div>
           <div class="myflex">
              <div class="mysize">
                  <div><img src="../../img/weixin-new.jpg" alt=""></div>
                  <p>卡西欧官方微信</p>
              </div>
              <div class="mysize">
                  <div><img src="../../img/weibo3b.png" alt=""></div>
                  <p>卡西欧官方微博</p>
              </div>
           </div>
           <div class="myflex">
              <div class="mysize">
                <div><img src="../../img/202-113.jpg" alt=""></div>
                <p>卡西欧官方商城</p>
              </div>
              <div class="mysize">
                <div><img src="../../img/contactservice.jpg" alt=""></div>
                <p>9:00-18:00 (国定假日除外)</p>
              </div>
           </div>
       </div>
       <div class="home-footer">
           <ul>
             <li>隐私权保护</li>
             <li>使用条款</li>
             <li>网站地图</li>
             <li>联络方式</li>
           </ul>
           <div><span>CHINA</span><span>请选择国家和地区</span></div>
           <div class="footertb">
               <img src="../../img/bei2.png"><span>沪ICP备14020594号</span>
           </div>
       </div>
       <div class="footertb2">© 2019 CASIO(China) Co., Ltd.</div>
       <br><br><br>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style>
 .logos{
    background: #fff;
    margin-top:2rem;
  }
  .lianjie{
    padding-top: 1rem;
    padding-left: 1rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #eee;
    font-size: 1rem;
  }
  .myflex{
    width:100%;
    display: flex;
    padding:0 1rem;
  }
  .myflex div p{
    padding-left: 1rem;
  }
  .myflex img{
    width:100%;
  }
  .mysize{
    width:50%
  }
  .home-footer{
    margin-top:1.1rem;
    background: #fff;
  }
  .home-footer ul{
    list-style-type: none;
    padding-top:1rem;
  }
  .home-footer ul li{
    padding: .2rem;
    color:#003296;
    font-style: normal;
    font-weight: 600;
  }
  .home-footer span:first-child{
    padding-left: 2.5rem;
    font-weight: bold
  }
  .home-footer span:last-child{
    color:#606060;
  }
  .footertb{
    text-align: center;
    padding:1rem 0;
  }
  .footertb img{
    width:86px;
    height:30px;
    vertical-align: middle;
  }
  .footertb2{
    text-align: right;
    padding-bottom: .5rem;
  }

</style>
