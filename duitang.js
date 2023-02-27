/**
 * 堆糖解锁svip功能
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = *.duitang.com
 * 
 * Quantumult X
 * [rewrite_local]
 * ^https?://*.duitang.com/napi/people/me url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/duitang.js
 * 
 */

const SCRIPT_NAME='堆糖';
const user=/^https?:*.duitang.com\/napi\/people\/me/;
if(user.test($request.url)){
let obj=JSON.parse($response.body);
obj.data["username"]="木瞳科技Pro";
obj.data["avatar"]="https://s1.ax1x.com/2022/11/23/z8LIPO.jpg";
obj.data["score"]=999999;
let body=JSON.stringify(obj);
$done({body})}
