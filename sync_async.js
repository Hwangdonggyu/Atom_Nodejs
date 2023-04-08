let fs = require('fs');
// Sync
console.log(1);
let data = fs.readFileSync('data.txt',{encoding:'utf8'}); // data.txt파일을 utf8방식으로 읽어오기
console.log(data);
//동기방식은 console.log(1)실행되고 readFileSync가 끝날때까지 다음 코드가 실행되지않음.
//즉 순차적으로 진행됌

//Async
console.log(2);
fs.readFile('data.txt',{encoding:'utf8'},function(err,data){
  console.log(3);
  console.log(data);
})
console.log(4);
//비동기방식은 동기방식과 다르게 readFile이 시작되고 바로console.log(4);가 실행됌
//그리고 readFile의 실행이 끝나면 function을 (콜백함수)통해 끝났다는 것을 알려줌
