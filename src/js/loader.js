import Params from './params';

export const resources = {
    background1: {
        url: `../Images/background-1.jpg?${new Date().getTime()}`,
        sprite: '',
    },
    background2: {
        url: `../Images/background-2.png?${new Date().getTime()}`,
        sprite: '',
    },
    logo: {
        url: `../Images/logo.png?${new Date().getTime()}`,
        sprite: '',
    },
    goldenCar: {
        url: `../Images/golden_car.png?`,
        sprite: '',
    },
    goldenHook: {
        url: `../Images/golden_hook.png?${new Date().getTime()}`,
        sprite: '',
    },
    buttonStart: {
        url: `../Images/button_start.png`,
        sprite: '',
    },
    buttonBack: {
        url: `../Images/button_back.png`,
        sprite: '',
    },
    buttonShare: {
        url: `../Images/button_share.png`,
        sprite: '',
    },
    boom: {
        url: `../Images/boom.png`,
        sprite: '',
    },
    gold1: {
        url: `../Images/gold_1.png`,
        sprite: '',
    },
    gold2: {
        url: `../Images/gold_2.png`,
        sprite: '',
    },
    gold3: {
        url: `../Images/gold_3.png`,
        sprite: '',
    },
    gold4: {
        url: `../Images/gold_4.png`,
        sprite: '',
    },
    luckyBag: {
        url: `../Images/lucky_bag.png`,
        sprite: '',
    },
    dialogClose: {
        url: `../Images/close.png`,
        sprite: '',
    },
    propHalo: {
        url: `../Images/halo.png`,
        sprite: '',
    },
    dialogBoom: {
        url: `../Images/dialog_boom.png`,
        sprite: '',
    },
    dialogBagEmpty: {
        url: `../Images/dialog_bag_empty.png`,
        sprite: '',
    },
    dialogBagGoldenFull: {
        url: `../Images/dialog_bag_golden_full.png`,
        sprite: '',
    },
    dialogBagHongBaoFull: {
        url: `../Images/dialog_bag_hongbao_full.png`,
        sprite: '',
    },
    head: {
        url: `../Images/head.png`,
        sprite: '',
    },
    coinsContainer: {
        url: `../Images/coins_container.png`,
        sprite: '',
    },
    iconText: {
        url: `../Images/icon_text.png`,
        sprite: '',
    },
    textBottomHasChance: {
        url: `../Images/text_bottom_has_chance.png`,
        sprite: '',
    },
    textBottomChanceOut: {
        url: `../Images/text_bottom_chance_out.png`,
        sprite: '',
    },
    goldenFloat: {
        url: `../Images/golden_float.png`,
        sprite: '',
    },
};

/**
 * 加载资源
 */
export function loadAssets(cb) {
    // Import all image in folder /src/Images
    const requireContext = require.context(  '../Images',  true)
    const images = requireContext.keys().reduce((images, path) => {  
        // ./code.png => code  
        const name = path.replace(/^\.\/|.png$/g, '')  
        images[name] = requireContext(path)  
        return images
    }, {});
    
    PIXI.loader
        .add([
            ...Object.keys(resources).map(key => {
                return resources[key].url;
            })
        ])
        .load(setup);

    // loading 监听
    PIXI.loader.on('progress', function(target) {
        // if (progress == 100) {
        //     $('body').removeClass('loading').scrollTop(0);
        //     console.log('所有资源初始化完毕');
        // }
    });

    function setup() {
        console.log('资源加载完成');
        Object.keys(resources).forEach(key => {
            resources[key].sprite  = new PIXI.Sprite(PIXI.loader.resources[resources[key].url].texture);
        });

        var progress = 0;
        var loadingIntervalHandler = setInterval(() => {
            progress += 5;
            $('.bar-active').css('width', `${progress}%`);
            $('.bar-car').css('left', `${progress}%`);
            $('.bar-progress').text(`${progress}%`);

            if (progress == 100) {
                clearInterval(loadingIntervalHandler);
                $('body').removeClass('loading').scrollTop(0);
                console.log('所有资源初始化完毕');
                cb();
            }
        }, 50);
        // cb();
    }
};