/**
 * moji辞書破解高级会员
 * mojiTest解锁所有词书
 * moji阅读解锁永久会员
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = *.mojidict.com
 * 
 * Quantumult X
 * [rewrite_local]
 * https:\/\/api\.mojidict\.com(\/app\/(mojitest|mojiread))?\/parse\/(classes\/_User\/.*|functions\/(getProducts_v2|fetchVocabLists-v4|getNPrivileges)) url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/moji.js
 * 
 */

const SCRIPT_NAME='moji辞書/mojiTest';
const vip = /^https:\/\/api\.mojidict\.com\/parse\/functions\/getNPrivileges/;
const vip_v2 = /^https:\/\/api\.mojidict\.com\/parse\/functions\/getNPrivileges-v2/

let data = {
expiresDate:4102329600000,
payType:4,
purchaseDate:1680876346465
}


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

if(vip_v2.test($request.url)){
  let obj=JSON.parse($response.body);

  obj.result = {"result":"091a0d45e4c8acc99ed9fd4db5bb315ed814854f0257340c94a8f5f517d1db0bf1e888390204957b6fd374fdb4c4d31353aa1cc6d0e69a3e64d031fdb5948a7d694effcbe437718f5aac8cfe793ff3fe6fda5bc846c920dfa2482e4dc2217e2de5e5fd46fc4fc796ced957550309bbe44edd7b8678bc95ed204a5c6afd7b4de0121fdde4ef20014d575f368320d97e2ecda156473a6982be17b644e5124e929ad4fe246a295e813b0374669e17ec6141b6b7890020980107d3ec75399f4890b750798a346dd7b3053c567af95a09fd0693fce168befe76fac98301a30058f69af1d5d60ae13892d7f4fd5e5c4144897d","code":200}
  
  let body=JSON.stringify(obj);
  $done({body})
}



