const Qs = require('qs');

const axios = require('axios');
const md5 = require('md5');
const sha256 = require('js-sha256').sha256;
//获取翻译接口
let translate_api = 'https://openapi.youdao.com/api';
let appSecret = 'GOPjZoiSnH592P31Qn6xoallHn3zUnSh';
let appKey = '06fc15a9c06cb290';

//英文翻译成中文
async function E2Z(q) {

    let curTime = Math.round(new Date().getTime() / 1000);
    let salt = (new Date).getTime();
    let from = 'en';
    let to = 'zh-CHS';
    let str1 = appKey + truncate(q) + salt + curTime + appSecret;
    let sign = sha256(str1);


    let params = {};
    params['from'] = from;
    params['to'] = to;
    params['appKey'] = appKey;
    params['signType'] = 'v3';
    params['sign'] = sign;
    params['salt'] = "" + salt;
    params['q'] = encodeURI(q);
    params['curtime'] = curTime;

    let res2 = await axios({
        method: 'post',
        url: translate_api,
        data: Qs.stringify(params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return res2.data;
}

function truncate(q) {
    let len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}

module.exports = {
    E2Z
};

