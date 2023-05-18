let express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var sha256 = require('sha256');
let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'sjdijsijdi@ss',
    resave: false,
    saveUninitialized: true,
    store:new MySQLStore({
        host    :   '127.0.0.1',
        port    :   3306,
        user    :   'root',
        password :  'hb970856!!',
        database :  'o2'
    })
}));
app.get('/count', function(req,res){
    if(req.session.count){
        req.session.count++;
    } else{
        req.session.count = 1;
    }
    res.send('count : '+ req.session.count);
});
app.get('/auth/logout', function(req, res) {
    delete req.session.displayName;
    req.session.save(function() {
        res.redirect('/welcome');
    });
});

app.get('/welcome',function(req,res){
    if(req.session.displayName){
        res.send(`
        <h1>Hello, ${req.session.displayName}</h1>
        <a href='/auth/logout'>Logout</a>
        `);
    }else{
        res.send(`
        <h1>Welcome</h1>
        <a href='/auth/login'>Login</a>
        `);
    }
});

var user = 
    {
    username: 'egoing',
    password: '4a3ea5690d9312e0898a7aa889f1616eb4e32269eebd5dfd13cf97ab8286109e',
    salt: 'fisjsijf@',
    displayName: 'Egoing'
};



app.post('/auth/login', function(req,res){
    var uname = req.body.username;
    var pwd = req.body.password;
        if(uname === user.username && sha256(pwd+user.salt) === user.password){
        req.session.displayName = user.displayName;
        req.session.save(function(){
            res.redirect('/welcome');
        });
    
}
    res.send("Who are you? <a href='/auth/login'>login</a>");
});


app.get('/auth/login',function(req,res){
    var output = `
    <h1>Login</h1>
<form action = '/auth/login' method = "post">
 <p>
  <input type = 'text' name = 'username' placeholder = 'username'>
 </p>
 <p> 
  <input type = 'password' name = 'password' placeholder = 'password'>
 </p>
 <p> 
  <input type = 'submit'>
 </p>
</form>
    `;
    res.send(output);
});


app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
});