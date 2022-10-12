/**
 * 微商截图秀开启会员，截图去水印。
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = weimage.keephu.com
 * 
 * Quantumult X
 * [rewrite_local]
 * ^https?:\/\/weimage\.keephu\.com\/user\/info url script-response-body 这里是js路径
 * 
 */

const SCRIPT_NAME = '微商截图秀';
const user = /http:\/\/weimage\.keephu\.com\/user\/info/;


if (user.test($request.url)){
    let obj = JSON.parse($response.body);
    obj.data["vip"] = 1;
    obj.data["expire"] = "2099-01-01";
    obj.data["nickname"] = "木瞳科技Pro";
    obj.data["avatar"] = "https://s1.ax1x.com/2022/08/11/v8nLAe.jpg";
    let body = JSON.stringify(obj);
    $done({body});
}
