
const express = require("express");
const app = express();
app.set('view engine', 'jade'); // jade 템플릿엔진과 express를 연결하는 코드
app.set('views','./views');
app.use(express.static('public')); // 정적인 파일이 위치할 디렉토리를 지정하는 기능
// public 안에 있는 test.txt가 있는데 만약 뒤에 /test.txt하면 이 내용이 보여짐
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
