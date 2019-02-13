<template>
<div>
    <div class="mykong"></div>
      <div class="registertitle"><span>用户注册</span></div>
    <div class="mui-content">
      <form class="mui-input-group">
			<div class="mui-input-row">
				<label>账号</label>
				<input id='account' autofocus v-model="uname" @blur="checkName" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
			</div>
			<div class="mui-input-row">
				<label>密码</label>
				<input id='password' v-model="upwd" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
			</div>
			<div class="mui-input-row">
				<label>确认密码</label>
				<input id='password_confirm' v-model="upwd2" type="password" class="mui-input-clear mui-input" placeholder="请确认密码">
			</div>
		</form>
		<div class="mui-content-padded">
			<button id='reg' @click="register" class="mui-btn mui-btn-block">注册</button>
		</div>
        <div class="mysp">
            <span><router-link to="/Login">已有账号，去登录</router-link></span>
        </div>
    </div>
    <div class="kong3"></div>
</div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
      return{
           uname:"",
           upwd:"",
           upwd2:"",
           isSubmit:false
       }
    },
     methods:{
       checkName(){
           var uname=this.uname;
           this.axios.get("http://127.0.0.1:3000/exist?uname="+uname)
           .then(res=>{
              if(uname==""){
                    Toast("用户名不能为空");
                    return;
               }
              if(res.data.code>0){
                 this.isSubmit=true;
              }else{
                  Toast(res.data.msg);
                  this.isSubmit=false;
              }
           })
       },
       register(){
            var uname=this.uname;
            var upwd=this.upwd;
            var upwd2=this.upwd2;
            var reg=/^[\w]{8,12}$/;
            if(uname==""){
                Toast("用户名不能为空");
                return;
            }
            if(!reg.test(uname)){
                Toast("用户名在8~12位大小写数字之间");
                return;
            }
            if(!reg.test(upwd)){
                Toast("密码在8~12位大小写数字之间");
                return;
            }
            if(upwd!=upwd2){
                Toast("两次输入密码不一致");
                return;
            }
            if(this.isSubmit==false){
                Toast("用户已存在");
                return;
            }
            this.axios.post("http://127.0.0.1:3000/register",`uname=${uname}&upwd=${upwd}`)
            .then(res=>{
                if(res.data.code>0){
                    Toast(res.data.msg);
                    this.uname="";
                    this.upwd="";
                    this.upwd2="";
                }else{
                    Toast(res.data.msg)
                }
            })
       }
   },
}
</script>

<style>
  .mui-btn-block{
      padding: 10px 0;
  }
  .mykong{
      height:6rem;
      background: #fff
  }
  .registertitle{
    background: #fff;
    padding-bottom: 1rem;
  }
   .registertitle span{
      background: #fff;
      margin:0;
      font-size: 1.5rem;
      padding: 0 .8rem;;
   }
  .mysp{
      text-align: center;
      font-size: .9rem;
  }
  .mui-content{
      background: #fff;
      margin-top: 0
  }
 .kong3{
     height:17rem;
     background: #fff
  }
 .mui-content {
    margin-top: 0;
 }
 .mui-btn-block{
    background: #1f389e;
    color:#fff
 }
</style>
