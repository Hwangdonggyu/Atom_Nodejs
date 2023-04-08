const _ = require('underscore'); //require은 underscore의 모듈을 가져와 객체를 리턴
let arr = [3,6,9,1,12];
console.log(arr[0]);
console.log(_.first(arr)); // 배열의 첫번째 원소를 리턴
console.log(arr[arr.length-1]);
console.log(_.last(arr)); // 배열의 마지막 원소를 리턴 
