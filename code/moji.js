/**
 * moji辞書破解高级会员
 * mojiTest解锁所有词书
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = *.mojidict.com
 * 
 * Quantumult X
 * [rewrite_local]
 * https:\/\/api\.mojidict\.com(\/app\/mojitest)?\/parse\/(classes\/_User\/.*|functions\/(getProducts_v2|fetchVocabLists-v4|getNPrivileges)) url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/moji.js
 * 
 */

const SCRIPT_NAME='moji辞書/mojiTest';
const vip = /https:\/\/api\.mojidict\.com(\/app\/mojitest)?\/parse\/functions\/getNPrivileges/;
const user = /https:\/\/api\.mojidict\.com(\/app\/mojitest)?\/parse\/classes\/_User\/*/;
const book = /https:\/\/api\.mojidict\.com\/app\/mojitest\/parse\/functions\/(getProducts_v2|fetchVocabLists-v4)/

let data = {
expiresDate:4102329600000,
payType:4,
purchaseDate:1680876346465
}

let 

if(vip.test($request.url)){
  let obj=JSON.parse($response.body);

  obj.result.result.forEach(function(item) {
  item.privilege = data;
});
  obj.result.result.forEach(function(item) {
  item.privilegeStatus = "activated";
});
  let body=JSON.stringify(obj);
  $done({body})
}

if(user.test($request.url)){
  let obj=JSON.parse($response.body);

  obj["name"]="公众号：木瞳科技Pro";
  obj["brief"]="破解成功";
  
  let body=JSON.stringify(obj);
  $done({body})
}

if(book.test($request.url)){
  let obj=JSON.parse($response.body);

  obj.result.result.forEach(function(item) {
  item.isSubscription = true;
});
  obj.result.result.forEach(function(item) {
  item.isOpen = true";
});
  
  let body=JSON.stringify(obj);
  $done({body})
}



