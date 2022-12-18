/**
 * 小歪微商去水印，解锁会员
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = xw.jietuguanjia.com
 * 
 * Quantumult X
 * [rewrite_local]
 * ^https?:\/\/xy\.jietuguanjia\.com\/api\/app\/userInfo url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/xwws.js
 * 
 */

const SCRIPT_NAME='小歪微商';
const user=/https?:\/\/xy\.jietuguanjia\.com\/api\/app\/userInfo/;
if(user.test($request.url)){
let obj=JSON.parse($response.body);
obj.data["username"]="木瞳科技Pro";
obj.data["head"]="https://s1.ax1x.com/2022/11/23/z8LIPO.jpg";
obj.data["isVip"]=true;
obj.data["isInAppBuy"]=1;
obj.data["status"]=1;
obj.data["vipExpiredTime"]=4999999999;
let body=JSON.stringify(obj);
$done({body})}
