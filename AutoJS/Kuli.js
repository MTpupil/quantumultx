
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * @name kuli云自动签到脚本
 * @author 木瞳
 * 
 */

const url = `https://cyuuu.co/user/checkin`;
const method = `POST`;
//下方输入cookie
const cookie = "crisp-client%2Fsession%2F7546c453-f5be-4098-971f-a132dc634f30=session_965ed998-d1af-40fc-85d1-79bcd99ac06b; crisp-client%2Fsession%2F7546c453-f5be-4098-971f-a132dc634f30%2F38e3199b-c7ca-39bf-a2fd-e4a821550827=session_965ed998-d1af-40fc-85d1-79bcd99ac06b; pop=yes; mtauth=1e7125853083bea9ef3161edae1725e6; PHPSESSID=o7p7rpbgejgkj4jbv3264piqc8; email=970632312%40qq.com; expire_in=1682327598; ip=c02efed63595394491d87673356e95a3; key=2491b71b574dc455a03c040b0115dc102173d08915586; uid=166302; lang=zh-cn"
const headers = {
'X-Requested-With' : `XMLHttpRequest`,
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'Content-Type' : `text/plain`,
'Origin' : `https://cyuuu.co`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Mobile/15E148 Safari/604.1`,
'Cookie' : cookie,
'Referer' : `https://cyuuu.co/user`,
'Host' : `cyuuu.co`,
'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
'Accept' : `application/json, text/javascript, */*; q=0.01`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
  const result = JSON.parse(response.body);

  const msg = result.msg;
  //获取msg
  const ret = result.ret;
  //获取状态码
  if(ret == 1){
    //ret为1，签到成功。
   const traffic = result.trafficInfo.traffic;//获取总流量
   const todayUsedTraffic = result.trafficInfo.todayUsedTraffic;//获取今日使用流量
   const lastUsedTraffic = result.trafficInfo.lastUsedTraffic;//获取昨日使用流量
   const unUsedTraffic = result.trafficInfo.unUsedTraffic;//获取剩余流量
   const output = "总流量："+ traffic +"丨剩余流量："+ unUsedTraffic +"\n今日使用："+ todayUsedTraffic +"丨昨日使用："+ lastUsedTraffic;//设置输出格式

   $notify("Kuli云签到｜成功",msg,output);
   //推送详情通知
  }else{
    //ret不为1，签到失败
   $notify("Kuli云签到｜失败","",msg);
   //推送失败通知
  }
    $done();
}, reason => {
    console.log(reason.error);
    $done();
    $notify("Kuli云签到运行失败","","请检查原因");
    //运行失败推送
});
