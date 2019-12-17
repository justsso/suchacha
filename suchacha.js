#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');
const translate = require('./translate').E2Z; //英文句子翻译成中文
const word_url = 'https://api.shanbay.com/bdc/search/?word='; //旧版单词查询API
const new_word_url = 'https://www.shanbay.com/api/v1/bdc/search/?version=2&word=';  //新版单词查询APIs
const log = console.log;

program
    .version('2.0.2', '-v, --version')
    .option('-w --word [word]', 'english of word')
    .option('-s --sentence [sentence]', '要进行翻译的英文句子')
    .parse(process.argv);

if (program.word) {
    (async function f() {
        try {
            let res = await axios.get(`${new_word_url}${program.word}&_=${Date.now()}`);
            await log(chalk.magenta.underline(program.word));
            console.log('uk: ', res.data.data.pronunciations.uk);
            console.log('us: ', res.data.data.pronunciations.us);
            if (res.data.data.definitions.cn) {
                log(chalk.grey('中文释义：'));
                res.data.data.definitions.cn.forEach((item) => {
                    console.log(item.pos, item.defn);
                });
            }
        }catch (err) {
            console.log('你输入的单词不正确');
        }
    })();
}

if (program.sentence) {
    (async function f() {
        let q = program.sentence;
        let data = await translate(q);
        console.log(data, 41);
        await log(chalk.magenta.underline(program.sentence));
        console.log(data.translation[0]);
    })();

}

