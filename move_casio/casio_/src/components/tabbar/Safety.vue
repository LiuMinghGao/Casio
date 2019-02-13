<template>
  <div>
      <table></table>
      <div class="app-safety">
         <div class="mui-content">
           <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>旧密码</label>
                    <input id='account' autofocus v-model="jupwd" type="password" class="mui-input-clear mui-input" placeholder="请输入旧密码">
                </div>
                <div class="mui-input-row">
                    <label>新密码</label>
                    <input id='password' v-model="upwd" type="password" class="mui-input-clear mui-input" placeholder="请输入新密码">
                </div>
                <div class="mui-input-row">
                    <label>确认新密码</label>
                    <input id='password_confirm' v-model="upwd2" type="password" class="mui-input-clear mui-input" placeholder="请确认新密码">
                </div>
	     	</form>
		<div class="mui-content-padded">
			<button id='reg' @click="amend" class="mui-btn mui-btn-block">确认修改</button>
		</div> 
      </div>
      </div>
  </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
           jupwd:"",
           upwd:"",
           upwd2:"",
        }
    },
    methods:{
        amend(){
          var jupwd=this.jupwd;
          var upwd=this.upwd;
          var upwd2=this.upwd2;
          var reg=/^[0-9]{8}$/;
          if(!reg.test(jupwd)){
              Toast("密码格式不正确");
              return;
          }
          if(!reg.test(upwd)){
              Toast("密码格式不正确");
              return;
          }
          if(upwd!=upwd2){
              Toast("两次输入的密码不一致");
              return;
          }
          if(jupwd==upwd){
              Toast("新密码不能与旧密码一样");
              return;
          }
          let data=this.qs.stringify({
              jupwd,
              upwd
          });
          this.axios.post("http://127.0.0.1:3000/checkUpwd",data)
          .then(res=>{
              console.log(res);
             if(res.data.code>0){
                 Toast("修改成功，请重新登陆");
                 this.$store.commit("update");
                  this.$router.push("/Login");
             }else{
                 Toast(res.data.msg)
             }
            
          })
        },
      
    }
}
</script>
<style>
    .app-safety{
        margin-top:60px;
    }
    .mui-btn-block{
    background: #1f389e;
    color:#fff
 }
</style>

