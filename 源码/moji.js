/**
 * moji辞典破解vip
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = *.mojidict.com
 * 
 * Quantumult X
 * [rewrite_local]
 * https://api.mojidict.com/parse/(functions/getNPrivileges|classes/_User/r3FjCI7Wo5) url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/moji.js
 * 
 */

const SCRIPT_NAME='moji辞書';
const vip=/https:\/\/api.mojidict.com\/parse\/functions\/getNPrivileges/;
const user = /https:\/\/api.mojidict.com\/parse\/classes\/_User\/r3FjCI7Wo5/;

let data = {
expiresDate:4102329600000,
payType:4,
purchaseDate:1680876346465
}

if(vip.test($request.url)){
  let obj=JSON.parse($response.body);

  obj.result.result[2].privilege=data;
  obj.result.result[2]["privilegeStatus"]="activated";
  let body=JSON.stringify(obj);
  $done({body})
}

if(user.test($request.url)){
  let obj=JSON.parse($response.body);

  obj["name"]="公众号：木瞳科技Pro";
  obj["brief"]="已破解高级会员";
  
  let body=JSON.stringify(obj);
  $done({body})
}



