
/**
 * wink开启会员功能
 * 公众号：木瞳科技Pro
 * 不用在意会员到期时间，只要显示破解成功，会员功能可以使用就行
 * [MITM]
 * hostname = *.meitu.com
 * 
 * Quantumult X
 * [rewrite_local]
 * https:\/\/api(\.account|-winkcut|-sub)\.meitu\.com\/(users?\/show(_current)?|v2\/user\/vip_info_by_group)\.json url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/wink.js
 * 
 */

const SCRIPT_NAME='Wink';
const vip= /https:\/\/api-sub\.meitu\.com\/v2\/user\/vip_info_by_group\.json/
const user = /https:\/\/api(\.account|-winkcut)\.meitu\.com\/users?\/show(_current)?\.json/


if(user.test($request.url)){
  let obj=JSON.parse($response.body);
if(obj.data!=null){
  obj.data["screen_name"]="木瞳科技Pro";
  obj.data["desc"]="公众号：木瞳科技Pro";
  obj.data["vip_type"]=1;
}
if(obj.response!=null){
  obj.response.user["screen_name"]="木瞳科技Pro";
  obj.response.user["blue_v_status"]=1;
  obj.response.user["red_v_status"]=1;
}
  let body=JSON.stringify(obj);
  $done({body})

}

if(vip.test($request.url)){
  let obj=JSON.parse($response.body);

  obj.data["is_vip"]=true;
  obj.data["use_vip"]=true;
  
  let body=JSON.stringify(obj);
  $done({body})
}
