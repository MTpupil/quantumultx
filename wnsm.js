/**
 * 蜗牛睡眠解锁会员功能
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = community.snailsleep.net
 * 
 * Quantumult X
 * [rewrite_local]
 * ^https?:\/\/community.snailsleep.net\/community\/user\/homepage url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/wnsm.js
 * 
 */

const SCRIPT_NAME='蜗牛睡眠';
const user=/https:\/\/community.snailsleep.net\/community\/user\/homepage/;
if(user.test($request.url)){
let obj=JSON.parse($response.body);
obj.result["name"]="木瞳科技Pro";
obj.result["vip"]=true;
let body=JSON.stringify(obj);
$done({body})}
