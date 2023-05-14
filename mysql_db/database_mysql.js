var mysql = require('mysql');
var conn = mysql.createConnection({
    host    :   '127.0.0.1',
    user    :   'root',
    password :  'hb970856!!',
    database :  'o2'
});
conn.connect();

/*
var sql = 'SELECT * FROM topic';
conn.query(sql,function(err,rows,fields){
  if(err){
    console.log(err);
  }
  else{
    for(var i =0; i<rows.length; i++){
      console.log(rows[i].description);
    }
  }
});
conn.end();
*/

var sql = 'delete topic where id=?';

var params = ['NPM','leezche',1];

conn.query(sql, params, function(err,rows,fields){
  if(err){
    console.log(err);
  }
  else{
    console.log(rows);
  }
});
conn.end();