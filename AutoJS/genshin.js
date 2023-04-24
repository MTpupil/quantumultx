/**
 * @name 原神数据监控
 * @author 木瞳
 * @updataTime 2023年4月24日19:50:43
 * @version 1.0
 * 
 * 此脚本可以监控原神数据，及时提醒旅行者。
 * 注(1)：正确配置uid和cookie，此版本未对uid和cookie错误进行处理，可能会出现无任何反应的情况。
 * 注(2)：自行设定通知开关及通知阈值（下面有提醒），不要乱动其他地方。
 * 注(3)：尊重原创，转载请注明原作者，删原作者信息亲妈原地爆炸。
 * 注(4)：由于一个接口用了私人appkey，因此暂不公开此脚本。
 * 注(5)：自行学习如何设置cron，建议运行间隔不要低于半小时，每一小时运行一次最佳。
 */


//星号模块内容需要自行配置
//*********************************************
//*********************************************
//*********************************************

//请求，配置cookie和uid
let uid = 108591806;
let cookie = "account_id=179263216; cookie_token=TMW4Ne5WtLM8EvlT9ul7muFwvkcigPxSjacxwnRH; _ga=GA1.2.1444565288.1674308414; _gat_gtag_UA_168360861_3=1; _gid=GA1.2.220371476.1675576342; ltoken=wvLR1BXfG0MVQuoRm1j724x4PLEcmQhVDwh5W4VZ; ltuid=179263216; _MHYUUID=11e0a451-e510-4550-8e9d-b8ecb09ec85c; login_ticket=gxbumA78jy3SDQjUqnDwgcJjGMtBZEIb5SHy5mYY; DEVICEFP=38d7ecf128bb2; aliyungf_tc=1435de28be5f8aed18f5b346952f07c99c389315d3f4fa815a200f2426627663; DEVICEFP_SEED_ID=3d4bf053e4b9fa9e; DEVICEFP_SEED_TIME=1674308414595; _gat_gtag_UA_133007358_5=1; _gat_gtag_UA_146776247_4=1; mi18nLang=zh-cn; _ga_KJ6J9V9VZQ=GS1.1.1675986470.13.1.1675989555.0.0.0; UM_distinctid=1862021e3d6939-0041ef429fbca8-331e7c37-5a900-1862021e3d7f1d; _ga_6ZB57V7XXT=GS1.1.1675475768.1.0.1675475768.0.0.0";



//开关，控制各个功能是否开启，1开0关
let isResin = 1;//体力提醒
let isTodayTaskReceived = 1;//每日委托奖励领取提醒
let isHomeCoin = 1;//洞天宝钱提醒
let isTransformer = 1;//参量质变仪可用提醒



//数据，控制触发通知的阈值
let resinNum = 120;//体力提醒阈值，最大160
let todayTaskReceivedTime = 21;//每日委托奖励检查时间，要求是0-23之间的整数
let homeCoinNum = 2000;//洞天宝钱提醒阈值，最大2400


//*********************************************
//*********************************************
//*********************************************
//配置内容到此结束，请勿改动下方代码



let xRpcClientType = 5;
let xRpcAppVersion = "2.38.1";


let salt = "xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs";
let randNum = Math.floor(Math.random() * 100000 + 100000);



//计算时间戳
let timestamp = Date.now();
// 获取 1970-1-1 00:00:00 的时间戳（单位：毫秒）
let startTimestamp = new Date('1970-01-01T00:00:00.000Z').getTime();
// 计算时间戳差值
let diff = timestamp - startTimestamp;
// 将时间戳差值转换为秒
let second = Math.floor(diff / 1000);

let noMd5Ds = "salt=" + salt + "&t=" + second + "&r=" + randNum + "&b=&q=role_id=" + uid + "&server=cn_gf01";
console.log(noMd5Ds)


var md5 = null;


//定义post请求方式
const post = (options) => {
  options = {
    url: options,
    method: "POST",
    body: JSON.stringify({
      data: noMd5Ds,
      app_key:"4168AD01B3C4A42CCD1F2B3529D52AF4",
      return_data:"1"
    })
  };

  return new Promise((resolve, reject) => {
    $task.fetch(options).then(response => {
      const md5 = JSON.parse(response.body).md5_data;
      resolve(md5);
    }, reason => {
      reject(reason);
    });
  });

}



//请求md5 api 计算ds
post("http://hn216.api.yesapi.cn/api/App/Common_Safety/Md5").then(md5 => {
  console.log(md5);
let DS = second + "," + randNum + "," + md5;
//在这里输入需要使用md5变量的代码段
const url = `https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/dailyNote?server=cn_gf01&role_id=` + uid;
const method = `GET`;
const headers = {
'x-rpc-client_type' : xRpcClientType,
'Cookie' : cookie,
'x-rpc-app_version' : xRpcAppVersion,
'Accept' : `*/*`,
'Accept-Encoding' : `gzip, deflate, br`,
'Host' : `api-takumi-record.mihoyo.com`,
'User-Agent' : `BackgroundShortcutRunner/1144.4 CFNetwork/1325.0.1 Darwin/21.1.0`,
'DS' : DS,
'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
'Connection' : `keep-alive`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    



//获取到dailynote
let dailyNote = JSON.parse(response.body).data;




//体力提醒
if (isResin) {

    let resin = dailyNote.current_resin;
    let totalSeconds = dailyNote.resin_recovery_time;
    const SECONDS_PER_HOUR = 60 * 60;
    const SECONDS_PER_MINUTE = 60;

    const resinTime = (function (totalSeconds) {
        let hours = Math.floor(totalSeconds / SECONDS_PER_HOUR); // 计算小时数
        totalSeconds = totalSeconds % SECONDS_PER_HOUR; // 计算剩余秒数
        let minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE); // 计算分钟数
        let seconds = totalSeconds % SECONDS_PER_MINUTE; // 计算剩余秒数

        let resinTime = '';
        if (hours >= 1) {
            resinTime += `${hours}时 `;
        }
        if (minutes >= 1) {
            resinTime += `${minutes}钟 `;
        }
        resinTime += `${seconds}秒`;

        return resinTime;
    })(totalSeconds);
    if (resin >= resinNum) {
        $notify("体力提醒", "当前体力：" + resin, "已超过设定数值，请尽快使用。预计还有" + resinTime + "完全恢复。");
    }
}




//洞天宝钱提醒
if (isHomeCoin) {
    let homeCoin = dailyNote.current_home_coin;
    let totalSeconds = dailyNote.home_coin_recovery_time;

    const SECONDS_PER_DAY = 24 * 60 * 60;
    const SECONDS_PER_HOUR = 60 * 60;
    const SECONDS_PER_MINUTE = 60;

    const homeCoinTime = (function (totalSeconds) {
        let days = Math.floor(totalSeconds / SECONDS_PER_DAY); // 计算天数
        totalSeconds = totalSeconds % SECONDS_PER_DAY; // 计算剩余秒数
        let hours = Math.floor(totalSeconds / SECONDS_PER_HOUR); // 计算小时数
        totalSeconds = totalSeconds % SECONDS_PER_HOUR; // 计算剩余秒数
        let minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE); // 计算分钟数
        let seconds = totalSeconds % SECONDS_PER_MINUTE; // 计算剩余秒数

        let homeCoinTime = '';
        if (days >= 1) {
            homeCoinTime += `${days}天 `;
        }
        if (hours >= 1) {
            homeCoinTime += `${hours}小时 `;
        }
        if (minutes >= 1) {
            homeCoinTime += `${minutes}分钟 `;
        }
        homeCoinTime += `${seconds}秒`;

        return homeCoinTime;
    })(totalSeconds);
    if (homeCoin >= homeCoinNum) {
        $notify("洞天宝钱提醒", "当前洞天宝钱：" + homeCoin, "已超过设定数值，请尽快使用。预计还有" + homeCoinTime + "完全恢复。");
    }
}




//每日委托领取提醒
if (isTodayTaskReceived) {
    let task = dailyNote.is_extra_task_reward_received;
    // 获取当前时间
    var now = new Date();

    // 获取当前小时数，返回值为0-23之间的整数
    var currentHour = now.getHours();

    // 进行比较
    if (currentHour >= todayTaskReceivedTime && !task) {
        $notify("每日委托提醒", "", "每日委托奖励还没有领取哦。");
    } 
}



//参量质变仪提醒
if(isTransformer){
    let reached = dailyNote.transformer.recovery_time.reached;
    if(reached){
        $notify("参量质变仪提醒", "可以使用啦！", "");
    }
}

    $done();
}, reason => {
    console.log(reason.error);
    $done();
});

}).catch(e => {
  console.log(e);
$done();
})


