/**
 * @name 原神数据监控
 * @author 木瞳
 * @updataTime 2023年5月10日
 * @version 1.2
 *
 * 更新内容：新增远程推送通知
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
let uid = 232614081;
let cookie = "ltoken=pqucjy8uvp8wYEQwh3sZx3sh1NTPnaHZ5EWdeuj0; ltuid=328270459; CNZZDATA1275023096=1943584049-1666396406-%7C1666396406; account_id=328270459; cookie_token=YJn2PJKo9TPhDFlkjrqu0cEUChFgvftke16XGHi3; _MHYUUID=54f8b260-9554-4ec0-878b-bd58867a9ae7; _gat=1; .thumbcache_a5f2da7236017eb7e922ea0d742741d5=Vo3O8S+ivy2ZlwDAMOqGo2VyCbd+KFsxugLOsz1w8N66fWPBiY6HAmLp/xIGcXpNy23+KS9XeHj1bnLJWNiHmw%3D%3D; smidV2=20221022085218c0fb85016e6ec37750125a107e1ef1b100d3c997becf699a0; UM_distinctid=183fd2d221f41-0bd8d793ace0fc-7d7b3762-5a900-183fd2d2220c2f; _ga=GA1.2.1981683978.1666399938; _gid=GA1.2.1675219934.1666399938";



//开关，控制各个功能是否开启，1开0关
let isResin = 1;//体力提醒
let isTodayTaskReceived = 1;//每日委托奖励领取提醒
let isHomeCoin = 1;//洞天宝钱提醒
let isTransformer = 1;//参量质变仪可用提醒

//提醒模式设置，设置通知的提醒模式。1:只要满足条件就提醒；2:仅提醒一次。
let resinMode = 1;//体力提醒模式
let todayTaskReceivedMode = 1;//每日委托奖励检查模式，
let homeCoinMode = 1;//洞天宝钱提醒模式
let transformerMode = 2;//参量质变仪提醒模式

//通知模式设置
let pushMode = 2;//1:圈x自带本地通知。2:远程通知，可以推送到其他设备，需要配合Bark。
let pushUrl = "https://api.day.app/uyRmRt7xLAoTgE6t5X8JAa"//远程推送需要填写远程api
let pushIcon = "https://s1.ax1x.com/2022/11/23/z8LIPO.jpg"//远程推送自定义icon


//数据，控制触发通知的阈值
let resinNum = 140;//体力提醒阈值，最大160
let todayTaskReceivedTime = 18;//每日委托奖励领取检查时间，要求是0-23之间的整数
let homeCoinNum = 2200;//洞天宝钱提醒阈值，最大2400


//*********************************************
//*********************************************
//*********************************************
//配置内容到此结束，请勿改动下方代码


let xRpcClientType = 5;
let xRpcAppVersion = "2.47.1";


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



var md5 = null;

//持久化数据
function setCache(key, value) {
  $prefs.setValueForKey(value, key);
  console.log("持久化数据成功，" + key + "：" + value);
}

//取出持久化数据
function getCache(key) {
  let value = $prefs.valueForKey(key);
  console.log("已获取" + key + "的值：" + value);
  return value;
}


//定义远程推送
const push = (url,title,text,icon) => {
  const options = {
    url: url,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      body: text,
      icon: icon
    })
  };

  $task.fetch(options);
}

//定义md5请求
const post = (options) => {
  options = {
    url: options,
    method: "POST",
    body: JSON.stringify({
      data: noMd5Ds,
      app_key: "4168AD01B3C4A42CCD1F2B3529D52AF4",
      return_data: "1"
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
  let DS = second + "," + randNum + "," + md5;
  //在这里输入需要使用md5变量的代码段
  const url = `https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/dailyNote?server=cn_gf01&role_id=` + uid;
  const method = `GET`;
  const headers = {
    'x-rpc-client_type': xRpcClientType,
    'Cookie': cookie,
    'x-rpc-app_version': xRpcAppVersion,
    'Accept': `*/*`,
    'Accept-Encoding': `gzip, deflate, br`,
    'Host': `api-takumi-record.mihoyo.com`,
    'User-Agent': `BackgroundShortcutRunner/1144.4 CFNetwork/1325.0.1 Darwin/21.1.0`,
    'DS': DS,
    'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
    'Connection': `keep-alive`
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
          resinTime += `${minutes}分 `;
        }
        resinTime += `${seconds}秒`;

        return resinTime;
      })(totalSeconds);

      if (resinMode == 1) {
        if (resin >= resinNum) {
          if(pushMode == 1){
           $notify("体力提醒", "当前体力：" + resin, "已超过设定数值，请尽快使用。预计还有" + resinTime + "完全恢复。");
         }else if(pushMode == 2){
           push(pushUrl, "体力提醒", "当前体力：" + resin + "。已超过设定数值，请尽快使用。预计还有" + resinTime + "完全恢复。", pushIcon);
         }
        } else {
          console.log("当前体力" + resin + "，未达到设定值" + resinNum);
        }
      } else if (resinMode == 2) {
        //单次提醒模式。需要持久化一个数据，来分辨是否已经提醒过了。
        let resinType = getCache("resinType");
        if (resin >= resinNum) {
          if (resinType == "未通知" || resinType == undefined) {
            if(pushMode == 1){
           $notify("体力提醒", "当前体力：" + resin, "已超过设定数值，请尽快使用。预计还有" + resinTime + "完全恢复。");
         }else if(pushMode == 2){
           push(pushUrl, "体力提醒", "当前体力：" + resin + "。已超过设定数值，请尽快使用。预计还有" + resinTime + "完全恢复。", pushIcon);
         }
            setCache("resinType", "已通知");
          } else if (resinType == "已通知") {
            console.log("当前体力" + resin + "，单次提醒模式，本次不通知");
          }
        } else {
          setCache("resinType", "未通知");
        }
      }
    } else {
      console.log("体力提醒未开启");
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
          homeCoinTime += `${hours}时 `;
        }
        if (minutes >= 1) {
          homeCoinTime += `${minutes}分 `;
        }
        homeCoinTime += `${seconds}秒`;

        return homeCoinTime;
      })(totalSeconds);

      if (homeCoinMode == 1) {
        if (homeCoin >= homeCoinNum) {
          if(pushMode == 1){
           $notify("洞天宝钱提醒", "当前洞天宝钱：" + homeCoin, "已超过设定数值，请尽快使用。预计还有" + homeCoinTime + "完全恢复。");
         }else if(pushMode == 2){
           push(pushUrl, "洞天宝钱提醒", "当前洞天宝钱：" + homeCoin + "。已超过设定数值，请尽快使用。预计还有" + homeCoinTime + "完全恢复。", pushIcon);
         }
        } else {
          console.log("当前洞天宝钱" + homeCoin + "，未达到设定值" + homeCoinNum);
        }
      } else if (homeCoinMode == 2) {
let homeCoinType = getCache("homeCoinType");
        if (homeCoin >= homeCoinNum) {
          if(homeCoinType == "未通知" || homeCoinType == undefined){
            if(pushMode == 1){
           $notify("洞天宝钱提醒", "当前洞天宝钱：" + homeCoin, "已超过设定数值，请尽快使用。预计还有" + homeCoinTime + "完全恢复。");
         }else if(pushMode == 2){
           push(pushUrl, "洞天宝钱提醒", "当前洞天宝钱：" + homeCoin + "。已超过设定数值，请尽快使用。预计还有" + homeCoinTime + "完全恢复。", pushIcon);
         }
            setCache("homeCoinType","已通知");
          }else if(homeCoinType == "已通知"){
            console.log("当前洞天宝钱" + homeCoin + "，单次提醒模式，本次不通知");
          }
        } else {
          setCache("homeCoinType","未通知");
        }
      }

    } else {
      console.log("洞天宝钱提醒未开启");
    }




    
    //每日委托领取提醒
    if (isTodayTaskReceived) {
      let task = dailyNote.is_extra_task_reward_received;
      // 获取当前时间
      var now = new Date();

      // 获取当前小时数，返回值为0-23之间的整数
      var currentHour = now.getHours();

      // 进行比较
      if (todayTaskReceivedMode == 1) {
        if (currentHour >= todayTaskReceivedTime && !task) {
          if(pushMode == 1){
           $notify("每日委托提醒", "", "每日委托奖励还没有领取哦。");
         }else if(pushMode == 2){
           push(pushUrl, "每日委托提醒", "每日委托奖励还没有领取哦。", pushIcon);
         }
        } else if (task) {
          console.log("每日委托奖励已领取");
        }
      } else if(todayTaskReceivedMode == 2){
let todayTaskReceivedType = getCache("todayTaskReceivedType")
        if(currentHour >= todayTaskReceivedTime && !task){
          if(todayTaskReceivedType == "未通知" || todayTaskReceivedType == undefined){
            if(pushMode == 1){
           $notify("每日委托提醒", "", "每日委托奖励还没有领取哦。");
         }else if(pushMode == 2){
           push(pushUrl, "每日委托提醒", "每日委托奖励还没有领取哦。", pushIcon);
         }
            setCache("todayTaskReceivedType","已通知");
          }else if(todayTaskReceivedType == "已通知"){
            console.log("每日委托未领取，本次不提醒");
          }
        }else if (task){
          setCache("todayTaskReceivedType","未通知");
        }
      }
      
    } else {
      console.log("每日委托提醒未开启");
    }



    //参量质变仪提醒
    if (isTransformer) {
      let reached = dailyNote.transformer.recovery_time.reached;
      if (transformerMode == 1){
        if (reached) {
          if(pushMode == 1){
           $notify("参量质变仪提醒", "可以使用啦！", "");
         }else if(pushMode == 2){
           push(pushUrl, "参量质变仪提醒", "可以使用啦！", pushIcon);
}
        } else {
          console.log("参量质变仪正在冷却中");
        }
      }else if(transformerMode == 2){
let transformerType = getCache("transformerType");
        if(reached){
          if (transformerType == "未通知" || transformerType == undefined) {
            if(pushMode == 1){
           $notify("参量质变仪提醒", "可以使用啦！", "");
         }else if(pushMode == 2){
           push(pushUrl, "参量质变仪提醒", "可以使用啦！", pushIcon);
}
            setCache("transformerType","已通知");
          } else if(transformerType == "已通知"){
            console.log("参量质变仪可以使用了，本次不提醒");
          }
        }else{
          setCache("transformerType","未通知");
        }
      }

    } else {
      console.log("参量质变仪提醒未开启");
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


