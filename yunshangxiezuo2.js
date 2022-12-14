var obj = JSON.parse($response.body);
obj.data.user.vip_forever= 1;
obj.data.user.vip= 1;
$done({body: JSON.stringify(obj)});
