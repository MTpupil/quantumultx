let a = $response.body;
let body = a.replace(/vip\":\d"/g, 'vip\":1').replace(/vip_forever\":\d/g, "vip_forever':1")
$done({body});
