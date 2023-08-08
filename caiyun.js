/**
 * 彩云天气/彩云天气Pro通用解锁svip
 * 公众号：木瞳科技Pro
 *
 * [MITM]
 * hostname = *.cyapi.cn
 * 
 * Quantumult X
 * [rewrite_local]
 * ^https?:\/\/biz\.cyapi\.cn\/(v2\/user|p\/v1\/vip_info) url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/caiyun.js
 * 
 */

const SCRIPT_NAME = '彩云天气';
const user = /https:\/\/biz\.cyapi\.cn\/v2\/user/;
const vip = /https:\/\/biz.\cyapi\.cn\/p\/v1\/vip_info/;

if(user.test($request.url)){

let obj=JSON.parse($response.body);

obj.result["svip_given"] = 999999;
obj.result["is_xy_vip"] = true;
obj.result["is_vip"] = true;
obj.result["vip_expired_at"] = 4102329600;
obj.result["xy_svip_expire"] = 4102329600;
obj.result["svip_expired_at"] = 4102329600;
obj.result["name"] = "木瞳科技Pro";
obj.result.wt["vip"] = {
        "is_auto_renewal" : true,
        "enabled" : true,
        "svip_auto_renewal_type" : "",
        "expired_at" : 4102329600,
        "auto_renewal_type" : "",
        "svip_expired_at" : 4102329600
      };
obj.result["avatar"] = "https://s1.ax1x.com/2022/11/23/z8LIPO.jpg";
obj.result["xy_vip_expire"] = 4102329600;
obj.result["vip_type"] = "s";

let body = JSON.stringify(obj);
$done({body})
}

if(vip.test($request.url)){

let obj=JSON.parse($response.body);

obj["vip"] = {
    "expires_time" : "4102329600",
    "is_auto_renewal" : true
  };
obj["svip"] = {
    "expires_time" : "4102329600",
    "is_auto_renewal" : true
  };

let body = JSON.stringify(obj);
$done({body})
}
