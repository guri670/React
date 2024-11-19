// console.log("react Hello world");


const http = require('http'); //http 모듈 생성

http.createServer( //http 모듈에서 서버생성
    (req,res)=> {
    res.statusCode=200; // 연결 성공 코드
    res.setHeader('content-Type','text/html;charset=utf8');
    res.end('안녕하세요');
    }
    ).listen(3001);
