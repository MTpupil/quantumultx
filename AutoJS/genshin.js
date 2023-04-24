let isResin = 1;//体力提醒
let isTotalTaskReceived = 1;//每日委托奖励领取提醒
let isHomeCoin = 1;//洞天宝钱提醒
let isTransformer = 1//参量质变仪提醒

let resinNum = 120;//体力提醒阈值，最大160
let todayTaskReceivedTime = 22;//每日委托奖励检查时间，要求是0-23之间的整数
let homeCoinNum = 2200;//洞天宝钱提醒阈值，最大2400

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
if (isTotalTaskReceived) {
    let task = dailyNote.is_extra_task_reward_received;
    // 获取当前时间
    var now = new Date();

    // 获取当前小时数，返回值为0-23之间的整数
    var currentHour = now.getHours();

    // 进行比较
    if (currentHour >= todayTaskReceivedTime && task == 0) {
        $notify("每日委托提醒", "", "每日委托奖励还没有领取哦。");
    } 
}

if(isTransformer){
    let reached = dailyNote.transformer.recovery_time.reached;
    if(reached){
        $notify("参量质变仪提醒", "可以使用啦！", "");
    }
}
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
 */