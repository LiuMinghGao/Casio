<template>
  <div>
    <table></table>
    <div class="app-shopFl">
      <div>
          <ul class="shopUl">
              <li v-for="p in list" :key="p.id"><router-link :to="'/GoodsList?id='+p.id">{{p.title}}</router-link></li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            list:[{id:1,title:"主题系列"},{id:2,title:"女表系列"}]
        }
    }
}
</script>
<style>
   .app-shopFl{
       margin-top: 60px;
   }
   .shopUl{
       list-style-type: none;
       margin: 0;
       padding: 0;
   }
   .shopUl li{
       box-sizing:border-box;
       padding: 50px 100px;
       background: #000;
       text-align: center
    }
    .shopUl li a{
        color:#fff
    }
</style>

