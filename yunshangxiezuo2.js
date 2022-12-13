body = $response.body.replace(/vip\":\d"/g, 'vip\":1').replace(/vip_forever\":\d/g, "vip_forever':1")
