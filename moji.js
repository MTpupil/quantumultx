/**
 * moji辞書破解vip
 * 公众号：木瞳科技Pro
 * [MITM]
 * hostname = *.mojidict.com
 * 
 * Quantumult X
 * [rewrite_local]
 * https://api.mojidict.com/parse/(functions/getNPrivileges|classes/_User/r3FjCI7Wo5) url script-response-body https://raw.githubusercontent.com/MTpupil/quantumultx/main/moji.js
 * 
 */
const SCRIPT_NAME='\x6d\x6f\x6a\x69\u8f9e\u66f8';const vip=/https:\/\/api['\x6d\x6f\x6a\x69\x64\x69\x63\x74']['\x63\x6f\x6d']\/parse\/functions\/getNPrivileges/;const user=/https:\/\/api['\x6d\x6f\x6a\x69\x64\x69\x63\x74']['\x63\x6f\x6d']\/parse\/classes\/_User\/r3FjCI7Wo5/;let data={expiresDate:4102329600000,payType:4,purchaseDate:1680876346465}if(vip['\x74\x65\x73\x74']($request['\x75\x72\x6c'])){let obj=JSON['\x70\x61\x72\x73\x65']($response['\x62\x6f\x64\x79']);obj['\x72\x65\x73\x75\x6c\x74']['\x72\x65\x73\x75\x6c\x74'][2]['\x70\x72\x69\x76\x69\x6c\x65\x67\x65']=data;obj['\x72\x65\x73\x75\x6c\x74']['\x72\x65\x73\x75\x6c\x74'][2]["\x70\x72\x69\x76\x69\x6c\x65\x67\x65\x53\x74\x61\x74\x75\x73"]="\x61\x63\x74\x69\x76\x61\x74\x65\x64";let body=JSON['\x73\x74\x72\x69\x6e\x67\x69\x66\x79'](obj);$done({body})}if(user['\x74\x65\x73\x74']($request['\x75\x72\x6c'])){let obj=JSON['\x70\x61\x72\x73\x65']($response['\x62\x6f\x64\x79']);obj["\x6e\x61\x6d\x65"]="\u516c\u4f17\u53f7\uff1a\u6728\u77b3\u79d1\u6280\x50\x72\x6f";obj["\x62\x72\x69\x65\x66"]="\u5df2\u7834\u89e3\u9ad8\u7ea7\u4f1a\u5458";let body=JSON['\x73\x74\x72\x69\x6e\x67\x69\x66\x79'](obj);$done({body})}