const Qs = require('qs');

const axios = require('axios');
const md5 = require('md5');
const sha256 = require('js-sha256').sha256;
const cheerio = require('cheerio');
const chalk = require('chalk');
const log = console.log;
//获取翻译接口
let translate_api = 'https://openapi.youdao.com/api';
let appSecret = 'GOPjZoiSnH592P31Qn6xoallHn3zUnSh';
let appKey = '06fc15a9c06cb290';
let z2eUrl = 'https://dict.cn/search?q=';
//英文翻译成中文
async function E2Z(q) {
    console.log(q);

    let curTime = Math.round(new Date().getTime() / 1000);
    let salt = (new Date).getTime();
    let from = 'en';
    let to = 'zh-CHS';
    let str1 = appKey + truncate(q) + salt + curTime + appSecret;
    let sign = sha256(str1);
    // let sign = hash.sha256().update(str1).digest('hex');


    let params = {};
    params['from'] = from;
    params['to'] = to;
    params['appKey'] = appKey;
    params['signType'] = 'v3';
    params['sign'] = sign;
    params['salt'] = "" + salt;
    params['q'] = q;
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

//签名算法中的input
function truncate(q) {
    if (q === null) {
        return null;
    }
    let len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}


async function Z2E(q){
    let res = await axios.get("https://dict.cn/search?q="+ encodeURI(q));
    // console.log(res.data, 57);
    const $ = cheerio.load(res.data);
    let keyword =  $('h1.keyword').text();
    await log(chalk.magenta.underline(keyword));  //输出关键字
    let lis =  $('.cn ul li');   //基本释义
    Array.from(lis).forEach((item,index) => {
        index <2 ? log($(item).text().trim()): ''
    });

    let examples = $('.sort ol li');  //例句
    Array.from(examples).forEach((item,index) => {
        index < 2 ?   log($(item).text()) : ''
    })

}


module.exports = {
    E2Z,
    Z2E
};

