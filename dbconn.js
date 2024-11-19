const mysql = require('mysql');

const conn_info= { //접속정보 입력
    host : '127.0.0.1', 
    port : '3306',
    user : `root`,
    password : '1234',
    database : 'aws0822'
};

modeule.exports={
    init : function() {
        return mysql.createConnection(conn_info);
    },
    connect : function(conn) {
        conn.connect(function(err){
            if (err) {
                console.error("오류 : "+err);
            } else {
                console.log("접속성공");
            }
        });
    }
}