function hello(name){
  console.log('Hi',+name);
}
hello('egoing');
// npm모듈에서 uglify를 다운 -> 터미널에서 uglifyjs pretty.js를 사용해보자
// uglifyjs pretty.js -m -> 변수들의 이름을 가장 짧은 문자로 바꿈
// uglifyjs pretty.js -o uglified.js -m -> 이 코드를 저장하고 싶으면 -o를 붙으고 파일명을 쓰면 저장됌
// 보통은 pretty.min.js로 만듬
//npm init은 package.json파일을 생성해주는 역할, npm패키지 초기화
// dependencies를 가지고싶으면 install 마지막에 --save 붙임
//일시적인 파일을 쓰려면 --save를 빼도 됌 그 상황이 아니면 --save를 붙이자!
