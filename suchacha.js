#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');

const word_url = 'https://api.shanbay.com/bdc/search/?word=';
const new_word_url = 'https://www.shanbay.com/api/v1/bdc/search/?version=2&word=';
const log = console.log;
program.version('1.1.0')
    .option('-w --word [word]', 'english of word')
    .parse(process.argv);

log(chalk.magenta.underline(program.word));

axios.get(`${new_word_url}${program.word}`).then(res => {
    // console.log(res.data, 22);
    console.log('uk: ', res.data.data.pronunciations.uk);
    console.log('us: ', res.data.data.pronunciations.us);
    if (res.data.data.definitions.cn) {
        log(chalk.grey('中文释义：'));
        res.data.data.definitions.cn.forEach((item) => {
            console.log(item.pos, item.defn);
        });
    }
}).catch(err => {
    console.log('你输入的单词不正确');
});