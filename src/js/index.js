import 'babel-polyfill';
import * as PIXI from 'pixi.js';
import Bump from './lib/Bump';
import Game from './game';
import {
    loadAssets
} from './loader';
import Vconsole from 'vconsole';

import '../css/index.less';

require("expose-loader?$!jquery");

// const vConsole = new Vconsole();

const width = $(window).width();
const height = $(window).height();

// 加载资源后开始初始化舞台相关内容
loadAssets(() => {
    const bump = new Bump(PIXI);
    const game = new Game(width, height, bump);

    let level = localStorage.getItem('level') ?? 0;

    let {  propabilityList, chance, targetCoin } =  difficultySetting(parseInt(level))

    let props = generateRandomProps(propabilityList); // todo improve this part
    console.log(props);

    game.init(
        0,
        0,
        props,
        chance,
        1,
        0.28928509735715935,
        targetCoin
    );
});

function difficultySetting(level) {
    if (level > 5) {
        level = 5;
    }

    let landmineProbability = level * 0.1;
    let coinProbability = 1 - landmineProbability - 0.2;

    let propabilityList = [0.2, landmineProbability, coinProbability];

    let chance = 10 - level;

    let targetCoin = level + 10;

    return {
        propabilityList,
        chance,
        targetCoin
    };
}

function random(arr1, arr2) {
    var sum = 0,
        factor = 0,
        random = Math.random();

    for (var i = arr2.length - 1; i >= 0; i--) {
        sum += arr2[i]; // 统计概率总和
    };
    random *= sum; // 生成概率随机数
    for (var i = arr2.length - 1; i >= 0; i--) {
        factor += arr2[i];
        if (random <= factor)
            return arr1[i];
    };
    return null;
};

function randomCoinNumber(type) {
    let number = null;
    let maxCoinNumber = 4;
    let minCoinNumber = 1;
    switch (type) {
        case 'coin':
            number = Math.floor(Math.random() * (maxCoinNumber - minCoinNumber)) + minCoinNumber;
            break;
        case 'lootbox':
            number = maxCoinNumber;
            break;
    }
    return number;
}

function generateRandomProps(probabilityList) {
    let props = [];
    let obj = ['lootbox', 'landmine', 'coin'];
    let propability = probabilityList ?? [0.3, 0.1, 0.6];
    for (let i = 0; i < 16; i++) { // todo replace 18
        console.log();
        let type = random(obj, propability);
        console.log(randomCoinNumber(type));
        props.push({
            type: type,
            amount: type != 'landmine' ? randomCoinNumber(type) : null // todo rand amount for toolbox or coin 
        });
    }

    return props;

}