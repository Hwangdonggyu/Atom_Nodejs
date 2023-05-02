const bodyParser = require('body-parser'); // bodyparser로 post방식
const express = require("express");
const app = express();

app.set('view engine', 'jade'); // jade 템플릿엔진과 express를 연결하는 코드
app.set('views','./views');
app.use(express.static('public')); // 정적인 파일이 위치할 디렉토리를 지정하는 기능
// public 안에 있는 test.txt가 있는데 만약 뒤에 /test.txt하면 이 내용이 보여짐
app.use(bodyParser.urlencoded({ extended: false })) // bodyparser를 사용하기 위한 use



app.get('/form',function(req,res){
  res.render('form');
});
app.get('/form_receiver',function(req,res){
  let title = req.query.title;
  let des = req.query.description;
  res.send(title+','+des); 
}) // get 방식

app.post('/form_receiver',function(req,res){
  let title = req.body.title;
  let des = req.body.description; //body를 사용하려면 bodyparser을 해야함
  res.send(title+','+des);
}) // post 방식

app.get('/topic/:id', function(req,res){
  let topics = [
    'javascript is...',
    'Nodejs is ....',
    'Express is...'
  ];
  let output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">NodeJs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.params.id]}
  `
  res.send(output); //사용자 요청에 id를 출력해줌 , // query접근은 query를 쓰고, pass방식은 params로 써야함
})

app.get('/topic/:id/:mode',function(req,res){
  res.send(req.params.id +','+req.params.mode)
})


app.locals.pretty = true; // temp.jade를 이쁘게 바꿔줌
app.get('/template', function(req,res){
    res.render('temp', {time:Date(), _title: 'Jade'}); // send와 render와 비슷한 개념????
})

app.get('/',function(req,res){
  res.send('Hello home page'); // 이 값을 응답할 것이다!
}); //웹페이지에 주소를 입력하여 들어온 사용자 사용자는 get방식과 post방식으로 들어올 수 있음
//주소를 입력해서 들어온 사용자는 get방식을 사용해 들어옴 '/'은 메인 홈페이지를 가르킴
app.get('/profile', function(req,res){
  res.send('Hello profile, <img src ="/profile.png">'); // 이미지 넣는법 <img src = "">
})
app.get('/dynamic', function(req,res){ // 동적
  var lis = '';
  for(var i = 0; i<5;i++){
    lis = lis+'<li>coding</li>';
  }
  var time = Date();
  let output = `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
      ${lis}
      </ul>
      ${time}
    </body>
  </html>
`
res.send(output); // ``는 여러줄의 html파일이나 이런걸 오류없이 추가할 수 있음
});

app.get('/login',function(req,res){
  res.send('<h1>Login please<h1>'); // 사용자가 login 홈페이지로 오면 이 값을 보여줌
}); // get메소드를 router라 부르고 우리가 하는 일은 routing! 길을 찾는다라는 의미



app.listen(3000,function(){
  console.log('Connected 3000port!');
});


// 정적인 파일같은 경우 요청이 들어올때마다 노드가 잡아서 던져줌-> 굳이 서버 껐다 킬 필요 없음
// 하지만 반복문 이런거 쓰기 어려워서 직접 반복하기 힘듬 그래서 동적 씀 이 두개를 합칠 수 있는 방법은?
// !o