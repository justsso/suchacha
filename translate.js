const axios = require('axios');
const md5 = require('md5');
//获取翻译接口
let translate_api = 'https://openapi.youdao.com/api';

var appSecret = 'GOPjZoiSnH592P31Qn6xoallHn3zUnSh';
var appKey = '06fc15a9c06cb290';

//英文翻译成中文
async function E2Z(q) {
    var salt = '' + (new Date).getTime();
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'en';
    var to = 'zh-CHS';
    var str1 = appKey + q + salt + appSecret;
    var data = null;
    var sign = md5(str1);
    sign = sign.toUpperCase();
    q = encodeURI(q);
    var url = `${translate_api}?q=${q}&from=${from}&to=${to}&appKey=${appKey}&salt=${salt}&sign=${sign}`

    let res = await axios.post(url);

    // let params = {};
    // params['from'] = 'en';
    // params['to'] = 'zh-CHS';
    // params['appKey'] = appKey;
    // params['str1'] = appKey + q + salt + appSecret;
    // params['sign'] = sign;
    // params['salt'] = salt;
    // params['q'] = q;
    // params['signType'] = 'v3';
    // params['curtime'] = new Date().getTime();
    //
    // let res2 = await axios({
    //     method: 'post',
    //     url: translate_api,
    //     data: params,
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // });
    // console.log(res2.data, 40);

    console.log(res.data.translation[0]);
    return res.data;
}

export default {
    E2Z
}
