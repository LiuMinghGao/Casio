<template>
    <div class="app-login">
        <div class="mykong"></div>
        <div v-show="isSHOW" class="registertitle"><span>用户登录</span></div>
        <div v-show="isSHOW" class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' autofocus v-model="uname" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' v-model="upwd" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
		    <div class="mui-content-padded">
				<button id='login' type="button" @click="login" class="mui-btn mui-btn-block">登录</button>
				<div class="link-area"><router-link to="/Register" id='reg'>注册账号</router-link> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area">
           </div>
		</div>
        <div v-show="isShow" class="user">
            欢迎您:{{msg}}
            <div><button @click="logout">退出登录</button></div>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    created(){
        this.checkuid()
    },
    data(){
        return{
            uname:"",
            upwd:"",
            msg:"",
            isSHOW:true,
            isShow:false
        }
    },
    methods:{
        logout(){
            this.axios.get("http://127.0.0.1:3000/logout")
            .then(res=>{
               if(res.data.code>0){
                    Toast(res.data.msg);
                    this.isSHOW=true,
                    this.isShow=false
                }
            })
        },
        checkuid(){
            this.axios.get("http://127.0.0.1:3000/checkuid")
            .then(res=>{
                console.log(res.data.data)
                if(res.data.code>0){
                    this.msg=res.data.data.uname;
                    this.isShow=true,
                    this.isSHOW=false
                }
            })
        },
        login(){
            if(this.uname==""){
                Toast("用户名不能为空");
                return;
            }
            if(this.upwd==""){
                Toast("密码不能为空");
                return;
            }
            var uname=this.uname;
            var upwd=this.upwd;
            this.axios.get("http://127.0.0.1:3000/login?uname="+uname+"&upwd="+upwd)
            .then(res=>{
                if(res.data.code>0){
                    Toast(res.data.msg);
                      this.uname="";
                      this.upwd="";
                      history.go(0)
                }else{
                        Toast(res.data.msg)
                }
            })
        }
    }
}
</script>
<style>
 .app-login,.mui-content{
    background: #fff;
 }
 .link-area{
     text-align: center
 }
 .mui-btn-block{
     padding: 10px 0;
 }
   .mykong{
      height:6rem;
      background: #fff
  }
  .registertitle{
   
      background: #fff
  }
  .registertitle span{
      background: #fff;
      margin:0;
      padding: 1rem;
      font-size: 1.5rem;
  }
  .mui-content-padded button{
      background:#1f389e;
      color:#fff
  }
 
  .kong2{
      height:18rem;
      background: #fff;
  }
  .mui-content{
      margin-top: 1rem;
  }
</style>


