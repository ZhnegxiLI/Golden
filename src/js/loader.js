export const resources = {
    background1: {
        url: `images/background-1.jpg?${new Date().getTime()}`,
        sprite: '',
    },
    background2: {
        url: `images/background-2.png?${new Date().getTime()}`,
        sprite: '',
    },
    logo: {
        url: `images/logo.png?${new Date().getTime()}`,
        sprite: '',
    },
    goldenCar: {
        url: `images/golden_car.png?`,
        sprite: '',
    },
    goldenHook: {
        url: `images/golden_hook.png?${new Date().getTime()}`,
        sprite: '',
    },
    buttonStart: {
        url: `images/button_start.png`,
        sprite: '',
    },
    buttonBack: {
        url: `images/button_back.png`,
        sprite: '',
    },
    buttonShare: {
        url: `images/button_share.png`,
        sprite: '',
    },
    boom: {
        url: `images/boom.png`,
        sprite: '',
    },
    gold1: {
        url: `images/gold_1.png`,
        sprite: '',
    },
    gold2: {
        url: `images/gold_2.png`,
        sprite: '',
    },
    gold3: {
        url: `images/gold_3.png`,
        sprite: '',
    },
    gold4: {
        url: `images/gold_4.png`,
        sprite: '',
    },
    luckyBag: {
        url: `images/lucky_bag.png`,
        sprite: '',
    },
    dialogClose: {
        url: `images/close.png`,
        sprite: '',
    },
    propHalo: {
        url: `images/halo.png`,
        sprite: '',
    },
    dialogBoom: {
        url: `images/dialog_boom.png`,
        sprite: '',
    },
    dialogBagEmpty: {
        url: `images/dialog_bag_empty.png`,
        sprite: '',
    },
    dialogBagGoldenFull: {
        url: `images/dialog_bag_golden_full.png`,
        sprite: '',
    },
    dialogBagHongBaoFull: {
        url: `images/dialog_bag_hongbao_full.png`,
        sprite: '',
    },
    head: {
        url: `images/head.png`,
        sprite: '',
    },
    coinsContainer: {
        url: `images/coins_container.png`,
        sprite: '',
    },
    iconText: {
        url: `images/icon_text.png`,
        sprite: '',
    },
    textBottomHasChance: {
        url: `images/text_bottom_has_chance.png`,
        sprite: '',
    },
    textBottomChanceOut: {
        url: `images/text_bottom_chance_out.png`,
        sprite: '',
    },
    goldenFloat: {
        url: `images/golden_float.png`,
        sprite: '',
    },
};

/**
 * 加载资源
 */
export function loadAssets(cb) {
    // Set alias loader
    let loader = PIXI.loader;

    // Load all images 
    Object.keys(resources).forEach(key => {
        loader.add(resources[key].url);
    });
    
    loader.load(setup);

    // loading 监听
    loader.on('progress', function(target) {
        // if (progress == 100) {
        //     $('body').removeClass('loading').scrollTop(0);
        //     console.log('所有资源初始化完毕');
        // }
    });

    function setup() {
        console.log('资源加载完成');
        Object.keys(resources).forEach(key => {
            resources[key].sprite  = new PIXI.Sprite(loader.resources[resources[key].url].texture);
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