/**
 * 舞蹈生解锁会员无限观看
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = *.ctwh77.com
 * 
 * Quantumult X
 * [rewrite_local]
 * https://apidance.ctwh77.com/api/(item/detail|user4app/myinfo) url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/dancer.js
 * 
 */

const SCRIPT_NAME='舞蹈生';
const buy = /https:\/\/apidance.ctwh77.com\/api\/item\/detail/;
const user = /https:\/\/apidance.ctwh77.com\/api\/user4app\/myinfo/;



if(buy.test($request.url)){
  let obj=JSON.parse($response.body);
  obj.result["IsBuy"]=1;
  let body=JSON.stringify(obj);
  $done({body})
}

if(user.test($request.url)){
  let obj=JSON.parse($response.body);

  obj.result["NickName"]="公众号：木瞳科技Pro";
  obj.result["IsVip"]=1;
  obj.result["ExpTime"]="/Date(4102329600000)/";
  obj.result["Money"]=99999.99;
  obj.result["VipType"]=5;
  
  let body=JSON.stringify(obj);
  $done({body})
}
