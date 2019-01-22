<template>
    <div class="app-shoplist">
       <table></table>
       <div v-if="list.length==0 || sflogin==false" class="notlogin">没有商品，你该不会是个穷逼吧！
           <router-link to="/GoodsList">去逛逛</router-link>
       </div>
       <div v-else>
          <div class="mymar">购物车</div>
          <div class="mymar2">
             <div class="checkall">
                <input type="checkbox"><label>全选</label>
             </div>
             <!--一条购物车-->
             <div v-for="(p,i) in list" :key="i" class="myshoplist">
                <div><input type="checkbox"></div>
                <div><img :src="list2[i]" alt=""></div>
                <div>
                   <p>{{p.title}}</p>
                   <p>￥{{p.price}}</p>
                </div>
                <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
                   <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodsSub" :data-id="p.id">-</button>
                   <input id="test" class="mui-input-numbox" type="number" v-model="p.count"/>
                   <button class="mui-btn mui-btn-numbox-plus" type="button"  @click="goodsAdd" :data-id="p.id">+</button>
                </div>
                <div><span :data-id="p.id"  @click="remove(p)">x</span></div>
               </div>
             </div>
             <br>
             <hr>
             <div class="myfooter">
                <div>
                    <span>小计：￥{{total}}</span><span @click="removeAll">清空购物车</span><button>去结算</button>
                </div>
             </div>
       </div>
      
       <br><br><br><br><br><br><br>
    </div>
</template>
<script>
export default {
    // 计算总价
    computed:{
			total:function(){
				 var sum=0;
			this.list.forEach(function(p){
               sum+=p.price * p.count;
			})
			  return sum;
			}
    },
    //生命周期，加载完成前
    created(){
        this.getshoplist();
        this.checkuid();
    }, 
    data(){
        return{
           val:"",
           list:[],
           list2:[],
           sflogin:false
        }
    },
    methods:{
        //删除单个商品
        remove(p){
            //删除页面商品
            this.list=this.list.filter(function(item){
                return item!=p;
            });
            //删除数据库商品
            var id=p.id;
            this.axios.get("http://127.0.0.1:3000/delete?id="+id)
            .then(res=>{
                console.log(res);
            })
        },
        //删除所有商品
        removeAll(){
           this.list=[];
           this.axios.get("http://127.0.0.1:3000/deleteAll")
           .then(res=>{
               console.log(res);
           })
        },
        //判断是否登录，是：显示商品信息，否：让用户去逛逛
        checkuid(){
            this.axios.get("http://127.0.0.1:3000/checkuid")
            .then(res=>{
                console.log(res.data.data)
                if(res.data.code>0){
                    this.msg=res.data.data.uname;
                    this.sflogin=true;
                }
            })
        },
        //更新商品的数量
         updateCount(id,count){
              this.axios.get("http://127.0.0.1:3000/updateCart?id="+id+"&count="+count)
					.then(result=>{
						console.log(result);
		      })
         },
         //获取购物车商品信息
         getshoplist(){
             this.axios.get("http://127.0.0.1:3000/getcartlist")
            .then(res=>{
                this.list=res.data;
                this.list.forEach((elem)=>{
                    var a=JSON.parse(elem.img)[0]
                    this.list2.push(a);
                })
            })
         },
         //数量减少 更新数据库购物车
         goodsSub(e){
            var id=e.target.dataset.id;
		      for(var p of this.list){
				if(p.id == id){
                    if(p.count>1){
                      p.count--;
				      this.updateCount(p.id,p.count);
                      break; 
                    }
				}
		      }
        },
        //数量增加 更新数据库购物车
         goodsAdd(e){
           var id=e.target.dataset.id;
		      for(var p of this.list){
				if(p.id == id){
				    p.count++;
				    this.updateCount(p.id,p.count);
				    break;
				}
		      }
        }
    }
}
</script>
<style>
  .app-shoplist{
      background: #fff
  }
  .mymar{
    margin:4rem 0 1rem 1rem;
  }
  .checkall input{
   vertical-align:middle;
   margin-left:.9rem;
  }
  .checkall{
      margin-bottom: 1rem
  }
  .myshoplist{
      display: flex;
      justify-content: space-around;
      height:60px;
      margin-bottom:1rem
  }
  .myshoplist div:first-child{
      padding:1.5rem .8rem;
      width:10%;
     
  }
  .myshoplist div:nth-child(2){
      width:15%;
      
  }
  .myshoplist img{
      width:80%;
      margin-left: .36rem
  }
  .myshoplist div:nth-child(3){
      width:30%;
     
  }
  .myshoplist div:nth-child(4){
      margin-top: .6rem;
      width:30%;
  }
  .myshoplist div:last-child{
      width:10%;
      text-align: center;
      line-height:3.5rem;
  }
  .app-shoplist p{
      text-align: left;
      padding-left: .5rem;
      margin-bottom: 0
  }
  .app-shoplist p:first-child{
      margin-top:.8rem
  }
  .myfooter{
      height:2.5rem;
      line-height: 2.5rem
  }
  .myfooter button{
    float: right;
    margin-top:.25rem;
    margin-right:.8rem
  }
  .myfooter span{
      margin-left: 1rem
  }
  .notlogin{
      width:100%;
      height:500px;
      text-align: center;
      background: #fff;
      line-height: 500px;
  }
</style>
