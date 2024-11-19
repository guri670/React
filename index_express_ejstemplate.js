const express = require('express');
const app = express();
const port = 3004;
const ejs = require("ejs"); // embeded JavaScript 템플릿 사용(html처럼)
const fs = require("fs");

// db접속
var dbconn = require(__dirname+"/dbconn.js"); // dbconn 연결 요청
var conn = dbconn.init();
dbconn.connect(conn); // 에러정보 확인

// body 객체 안에 데이터를 추출한다.
var bodyParser = require("body-parser"); //parser => 객체 일부 추출
app.use(bodyParser.json()); // json문서로 바꿈
app.use(bodyParser.urlencoded({extended:false})); // url 인코딩정보는 확장하지 않음(깨짐방지)

// 화면 엔진으로 ejs를 사용하겠다
app.set("view engine","ejs"); //
app.set("views",__dirname+"/views") // 폴더지정


app.use("/style",express.static(__dirname+"/style")); // 가상경로와 폴더 매칭

app.get("/",(req,res) => {
   res.sendFile(__dirname+"/");
 }); //가상경로로 띄워줄것

 app.get("/boardWriteTemplate",(req,res) => {
   res.render("boardWrite.ejs"); // 엔진이기때문에 render 메서드를 사용함
 }); 

 app.post("/boardWriteAction",function(req,res){
   
   var body = req.body;
   console.log("body 객체 값은?");
   console.log(body);

   var sql = "insert into board (originbidx,depth,level_,subject,contents,writer,password,midx)value(null,0,0,?,?,?,?,4)";
   var sql2 = "update board set originbidx =(select A.maxbidx from (select max(bidx) as maxbidx from board)A) where bidx = (select A.maxbidx from (select max(bidx) as maxbidx from board)A)";
   
   var params = [body.subject,body.writer,body.contents,body.password]
   console.log(sql);

   conn.query(sql,params,function(err,results,fields){
      if(err) {
         console.log(err);
      } 
      console.log(results);
   });
   
   conn.query(sql2,params,function(err,results,fields){
      if(err) {
         console.log(err);
      } 
      console.log(results);
   });

   res.redirect("/")

});

const boardList = fs.readFileSync('./views/boardList.ejs','utf8'); 
// Sync -> 인코딩정보를 맞춤

app.get("/boardListTemplate",(req,res)=> {
   
   var sql = "select * from board order by originbidx desc, depth asc";

   conn.query(sql,function(err,results,fields){
      if(err) {
         console.log(err);
      } 
      var page = ejs.render(boardList,{
         title : "게시글 목록", 
         data : results,
      });
      console.log(results);
      res.send(page);
   });
   

}); 
 
app.listen(port,()=>{
   console.log("접속성공");

});