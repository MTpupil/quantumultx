var obj = JSON.parse($response.body);
    obj.data.vip_last= 59";
obj.data.vip_forever= 1;
obj.data.vip= 1;
    $done({body: JSON.stringify(obj)});
