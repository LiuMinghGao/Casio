//vue_app_server 服务器

const express = require("express");
var app = express();
app.use(express.static("public"));
app.listen(3000);
const pool = require("./pool");

//express mysql 参数 request;response
//跨域访问配置
//1:加载模块cors
const cors = require("cors");
//2:配置cors
app.use(cors({
  origin:["http://127.0.0.1:8080",
         "http://localhost:8080"],//允许列表
  credentials:true   //是否验证
}))
//3.加载第三方模块：express-session
const session = require("express-session");
//4.对模块配置
app.use(session({
  secret:"128位随机字符串",   //安全令牌
  resave:false,             //请求保存
  saveUninitialized:true,   //初始化
  cookie:{                  //sessionid保存时间1天 cookie
    maxAge:1000*60*60*24
  }
}));

/**轮播图**/
app.get("/carousel",(req,res)=>{
    pool.query("SELECT * FROM move_cs_carousel",(err,result)=>{
      if(err) throw err;
      res.send(result)
    })
})

/**注册**/
app.get("/register",(req,res)=>{
   var uname=req.query.uname;
   var upwd=req.query.upwd;
   var reg=/^[\w]{8,12}$/;
   var reg2=/^[\w]{8,12}$/;
   if(!reg.test(uname)){
     res.send({code:-1,msg:"用户名格式不正确"})
     return;
   }
   if(!reg2.test(upwd)){
    res.send({code:-1,msg:"密码格式不正确"})
    return;
   }
    pool.query("INSERT INTO move_cs_user VALUES(null,?,md5(?))",[uname,upwd],(err,result)=>{
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ code: 1, msg: "注册成功" })
      } else {
        res.send({ code: -1, msg: "注册失败" })
      }
     })
   })

//验证用户名是否存在
app.get("/exist",(req,res)=>{
  var uname = req.query.uname;
  pool.query("SELECT count(uid) as c FROM move_cs_user WHERE uname=?", [uname], (err, result) => {
    if (err) throw err;
    if (result[0].c > 0) {
      res.send({ code: -1, msg: "用户名已存在" })
    }else{
      res.send({ code: 1, msg: "可以注册" })
    }
  })
})

/**登录**/
app.get("/login",(req,res)=>{
   var uname=req.query.uname;
   var upwd=req.query.upwd;
   pool.query("SELECT count(uid) as c,uid FROM move_cs_user WHERE uname = ? AND upwd = md5(?)",[uname,upwd],(err,result)=>{
    if(err)throw err;
    var c = result[0].c;
    if(c == 1){
      req.session.uid = result[0].uid;
      res.send({code:1,msg:"登录成功"});
      console.log(req.session.uid);                        
    }else{
      res.send({code:-1,msg:"用户名或密码有误"})
    }
  })
})
/**资讯分页显示**/
app.get("/getNews",(req,res)=>{
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  var sql = "SELECT count(id) as c FROM move_cs_news";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,title,classify,ctime";
    sql +=" FROM move_cs_news";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  });
})
//功能三:依据新闻编号查询新闻详细信息
app.get("/getNewsInfo",(req,res)=>{
 var id = req.query.id;
 var sql=" SELECT id,title,ctime,content";
      sql+=" FROM move_cs_news WHERE id = ?";
 pool.query(sql,[id],(err,result)=>{
      if(err)throw err;
      res.send({code:1,data:result[0]});
  })
})
//功能四：发表评论
app.get("/addComment", (req, res) => {
  //1:参数 nid content
  var nid = req.query.nid;
  var content = req.query.content;
  pool.query("INSERT INTO move_cs_comment(id,content,ctime,nid)VALUE(null,?,now(),?)", [content, nid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 1, msg: "评论发送成功" })
    } else {
      res.send({ code: -1, msg: "评论失败" })
    }
  });
})

//功能五:依据新闻编号(id),查询指定新闻编号评论列表
app.get("/getComments", (req, res) => {
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  var nid = parseInt(req.query.nid);
  if (!pno) {
    pno = 1;
  }
  if (!pageSize) {
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if (!reg.test(pno)) {
    res.send({ code: -1, msg: "页码格式不正确" });
    return;
  }
  if (!reg.test(pageSize)) {
    res.send({ code: -2, msg: "页大小格式不正确" });
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM move_cs_comment";
  sql += " WHERE nid = ?"
  var progress = 0; //sql执行进度
  obj = { code: 1 };
  pool.query(sql, [nid], (err, result) => {
    if (err) throw err;
    //console.log(result[0].c);
    var pageCount = Math.ceil(result[0].c / pageSize);
    obj.pageCount = pageCount;
    progress += 50;
    if (progress == 100) {
      res.send(obj);
    }
  });
  //  查询当前页内容
  var sql = " SELECT id,ctime,content";
  sql += " FROM move_cs_comment";
  sql += " WHERE nid = ?";
  sql += " ORDER BY id DESC";
  sql += " LIMIT ?,?"
  var offset = parseInt((pno - 1) * pageSize);
  pageSize = parseInt(pageSize);
  pool.query(sql, [nid, offset, pageSize], (err, result) => {
    if (err) throw err;
    //console.log(result);
    obj.data = result;
    progress += 50;
    if (progress == 100) {
      res.send(obj);
    }
  });
})

//商品列表信息
app.use("/getProductList",(req,res)=>{
   pool.query("SELECT * FROM move_cs_product",(err,result)=>{
     if(err) throw err;
     res.send(result)
   })
})
app.use("/getDetails",(req,res)=>{
    var did=req.query.did;
    pool.query("SELECT * FROM move_cs_details WHERE did=?",[did],(err,result)=>{
       if(err) throw err;
       res.send(result)
    })
})

//添加商品到购物车
app.use("/addCart",(req,res)=>{
  var uid   = req.session.uid;
  if(!uid){
    res.send("添加失败");
    return;
  }
  var did   = req.query.did;
  var price =req.query.price;
  var count = parseInt(req.query.count);
    pool.query("INSERT INTO `move_cs_cart`(`id`, `uid`,`did`,`price`,`count`) VALUES(null,?,?,?,?)",[uid,did,price,count], (err, result)=>{
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "添加成功" });
        }else{
          res.send({ code: -1, msg: "添加失败" });
        }
    })
})

//获取购物车信息
app.get("/getcartlist",(req,res)=>{
  var uid=req.session.uid;
 pool.query("SELECT d.title,d.img,c.count,c.did,c.price,c.id FROM move_cs_details d,move_cs_cart c WHERE d.did=c.did AND c.uid=?",[uid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})
//加，减商品数量更新
app.get("/updateCart",(req,res)=>{
    var id=req.query.id;
    var count=req.query.count;
  pool.query("UPDATE move_cs_cart SET count=? WHERE id=?",[count,id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows > 0){
      res.send({code:1,msg:"更新成功"});
    }else{
      res.send({code:-1,msg:"更新失败"});
    }
  })
})
//判断用户是否登录
app.get("/checkuid",(req,res)=>{
   var uid=req.session.uid;
   pool.query("SELECT uname FROM move_cs_user WHERE uid=?",[uid],(err,result)=>{
      if(err) throw err;
      if(result.length>0){
        res.send({code:1,data:result[0]})
      }else{
        res.send("-1")
      }
   })
})
//退出登录
app.get("/logout",(req,res)=>{
   req.session.uid=null;
   res.send({code:1,msg:"退出成功"})
})
//删除单个购物车商品
app.get("/delete",(req,res)=>{
  var id=parseInt(req.query.id);
    pool.query("DELETE FROM move_cs_cart WHERE id=?",[id],(err,result)=>{
       if(err)throw err;
       if(result.affectedRows>0){
        res.send({code:1,msg:"删除成功"});
       }else{
        res.send({code:-1,msg:"删除失败"});
       }
   })
  })
//删除购物车全部商品
  app.get("/deleteAll",(req,res)=>{
    pool.query("DELETE FROM move_cs_cart WHERE id",(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
       res.send({code:1,msg:"删除成功"});
      }else{
       res.send({code:-1,msg:"删除失败"});
      }
    })
 })