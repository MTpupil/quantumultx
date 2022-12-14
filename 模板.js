/**
 * 云上写作解锁会员功能
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = yunshangxiezuo.com
 * 
 * Quantumult X
 * [rewrite_local]
 * ^https?:\/\/yunshangxiezuo\.com\/api\/getAuthenticate_2 url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/yunshangxiezuo.js
 * 
 */

const SCRIPT_NAME='云上写作';
const user=/http:\/\/www\.yunshangxiezuo\.com\/api\/getAuthenticate_2/;
if(user.test($request.url)){
let obj=JSON.parse($response.body);
obj.data.user["name"]="木瞳科技Pro";
obj.data.user["vip"]=1;
obj.data.user["vip_forever"]=1;
let body=JSON.stringify(obj);
$done({body})}
