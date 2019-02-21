<template>
    <div class="app-shoplist">
       <table></table>
       <div v-if="list.length==0 || sflogin==false" class="notlogin">没有商品!
           <router-link to="/shopFl">去逛逛</router-link>
       </div>
       <div v-else>
          <div class="mymar">购物车</div>
          <div class="mymar2">
             <div class="checkall">
                <img :src="checkAll==true?'http://127.0.0.1:3000/img/xz.png':'http://127.0.0.1:3000/img/wxz.png'" @click="selectall()"><span>全选</span>
             </div>
             <!--一条购物车-->
             <div v-for="(p,i) in list" :key="i" class="myshoplist">
                <div class="mycheck"><img :src="p.checked==true?'http://127.0.0.1:3000/img/xz.png':'http://127.0.0.1:3000/img/wxz.png'"  @click="select(p,i)"></div>
                <div class="myimgs"><img :src="p.img" alt=""></div>
                <div>
                   <p>{{p.title}}</p>
                   <p>￥{{p.price}}</p>
                </div>
                <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
                   <button class="mui-btn mui-btn-numbox-minus"  type="button" @click="goodsSub" :data-id="p.id">-</button>
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
                    <span>小计：￥{{total}}</span><span @click="removeAll">清空购物车</span><button>去结算(<b>{{num}}</b>)</button>
                </div>
             </div>
       </div>
       <br><br><br><br><br><br>
       <br><br><br><br><br><br>
    </div>
</template>
<script>
export default {
  // 计算总价
 computed: {
    total: function() {
      var sum = 0;
      this.list.forEach((p)=>{
        if (p.checked) {
          sum += p.price * p.count;
        }
      });
      return sum;
    },
    num: function() {
      var c = 0;
      this.list.forEach((p)=>{
        if (p.checked) {
          c +=p.count;
        }
      });
      return c;
    }
  },
  //生命周期，加载完成前
  created() {
    this.getshoplist();
    this.checkuid();
    this.$store.commit("update");
  },
  data() {
    return {
      val: "",
      //购物车数据
      list: [],
      //验证是否登录
      sflogin: false,
      //选中商品结算数量
      checkAll: false,
      //选中的商品的个数  全选单选功能
      checkCount: 0,
    };
  },
  methods: {
    //全选
    selectall() {
        this.checkAll = !this.checkAll;
        this.list.forEach((p,i)=>{
          p.checked = this.checkAll;
          this.$set(this.list, i, p);
        });
        if (this.checkAll) {
           this.checkCount = 0;
        }else {
           this.checkCount = this.list.length;
        }
    },
    //单选
    select(p,i) {      
      p.checked = !p.checked;
      this.$set(this.list, i, p);
      if (p.checked) {
        this.checkCount++;
      } else {
        this.checkCount--;
      }
      if (this.checkCount == this.list.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      
    },
    //删除单个商品
    remove(p) {
      if(p.checked){
          this.checkCount--;
          this.number-=p.count;
      }
    //删除页面商品
      this.list = this.list.filter(function(item) {
        return item != p;
      });
      //删除数据库商品
        var id = p.id;
        this.axios.get("http://127.0.0.1:3000/delete?id=" + id).then(res => {
        this.getshoplist();
        this.$store.commit("update");
       });
    },
    //删除所有商品
    removeAll() {
      this.list = [];
      this.axios.get("http://127.0.0.1:3000/deleteAll").then(res => {
           this.getshoplist();
           this.$store.commit("update");
      });
    },
    //判断是否登录，是：显示商品信息，否：让用户去逛逛
    checkuid() {
      this.axios.get("http://127.0.0.1:3000/checkuid").then(res => {
        if (res.data.code > 0) {
          this.msg = res.data.data.uname;
          this.sflogin = true;
        }
      });
    },
    //更新商品的数量
    updateCount(id, count) {
      this.axios
        .get("http://127.0.0.1:3000/updateCart?id=" + id + "&count=" + count)
        .then(result => {
          this.$store.commit("update");
        });
    },
    //获取购物车商品信息
    getshoplist() {
      this.axios.get("http://127.0.0.1:3000/getcartlist").then(res => {
        this.list = res.data;
        this.list.forEach((elem)=>{
          elem.checked=false;
        });
      });
    },
    //数量减少 更新数据库购物车
    goodsSub(e) {
      var id = e.target.dataset.id;
      for (var p of this.list) {
        if (p.id == id) {
          if (p.count > 1) {
            p.count--;
            if(p.checked){
              this.number--;
            }
            this.updateCount(p.id, p.count);
            break;
          }
        }
      }
    },
    //数量增加 更新数据库购物车
    goodsAdd(e) {
      var id = e.target.dataset.id;
      for (var p of this.list) {
        if (p.id == id) {
          p.count++;
          if(p.checked){
            this.number++;
          }
          this.updateCount(p.id, p.count);
          break;
        }
      }
    }
  }
};
</script>
<style>
.app-shoplist {
  background: #fff;
}
.mymar {
  margin: 4rem 0 1rem 1rem;
}
.checkall input {
  vertical-align: middle;
  margin-left: 0.9rem;
}
.checkall {
  margin-bottom: 1rem;
}
.myshoplist {
  display: flex;
  justify-content: space-around;
  height: 60px;
  margin-bottom: 1rem;
}
.myshoplist div:first-child {
  padding: 1.5rem 0.8rem;
  width: 10%;
  height: 68px;
}
.myshoplist div:nth-child(2) {
  width: 15%;
  height: 68px;
  text-align: center;
}
.myshoplist {
  text-align: center;
}
.myshoplist .myimgs img {
  width: 80%;
  height: 68px;
}
.myshoplist div:nth-child(3) {
  width: 30%;
  height: 68px;
}
.myshoplist div:nth-child(4) {
  margin-top: 0.6rem;
  width: 30%;
}
.myshoplist div:last-child {
  width: 10%;
  text-align: center;
  line-height: 3.5rem;
}
.app-shoplist p {
  text-align: left;
  padding-left: 0.5rem;
  margin-bottom: 0;
}
.app-shoplist p:first-child {
  margin-top: 0.8rem;
}
.myfooter {
  height: 2.5rem;
  line-height: 2.5rem;
}
.myfooter button {
  float: right;
  margin-top: 0.25rem;
  margin-right: 0.8rem;
}
.myfooter span {
  margin-left: 1rem;
}
.notlogin {
  width: 100%;
  height: 500px;
  text-align: center;
  background: #fff;
  line-height: 500px;
}
.myinput {
  display: block;
  width: 12px;
  height: 12px;
  border: 1px solid #000;
  border-radius: 50%;
  margin-top: 5px;
}
.checkall {
  display: flex;
}
.checkall {
  margin-left: 0.8rem;
}
.checkall img,
.mycheck img {
  width: 20px;
  height: 20px;
}
.mui-numbox .mui-numbox-input, .mui-numbox .mui-input-numbox{
  padding: 0 2px !important
}
</style>
