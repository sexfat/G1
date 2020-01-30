let donateVal = 0;
window.addEventListener('load', function () {
    $('input[type="radio"]').change(function () {
        donateVal = $(this).val();
    });
    $('.lightCover').click(function () {
        $('.lightCover').hide();
        $(this).children('div').hide();
    });

    $('button.infose-send').click(function () {
        if (donateVal == 100) {
            $('.lightCover').show();
            $('.donanimate').show();
            $('.donanimate>div').hide();
            $('.ani_oct').show();
            oct();
        } else if (donateVal == 300) {
            $('.lightCover').show();
            $('.donanimate').show();
            $('.donanimate>div').hide();
            $('.ani_water').show();
            waterBall();
        } else if (donateVal == 500) {
            $('.lightCover').show();
            $('.donanimate').show();
            $('.donanimate>div').hide();
            $('.ani_cat').show();
            cat();
        } else if (donateVal == 1000) {
            $('.lightCover').show();
            $('.donanimate').show();
            $('.donanimate>div').hide();
            $('.ani_rocket').show();
            rocket();
        }else {
            $('.donanimate>div').hide();
            $('.donanimate').hide();
            $('.lightCover').hide();
        }
        donateVal = 0;
    });
});
function cat() {
    let bbf, bff, fff, fbf, tail, catN;
    let ballon, waterPlace, waterBall;
    /* -- 貓咪 -- */
    bbf = TweenMax.to('#cat_bbf', .3, {
        rotation: 10,
        transformOrigin: 'top center',
        repeat: 5,
        yoyo: true,
    });
    bff = TweenMax.to('#cat_bff', .3, {
        rotation: -10,
        transformOrigin: 'top center',
        repeat: 5,
        yoyo: true,
    });
    fff = TweenMax.to('#cat_fff', .3, {
        rotation: 10,
        transformOrigin: 'top right',
        repeat: 5,
        yoyo: true,
    });
    fbf = TweenMax.to('#cat_fbf', .3, {
        rotation: -10,
        transformOrigin: 'top center',
        repeat: 5,
        yoyo: true,
    });
    tail = TweenMax.to('#cat_tail', 1, {
        rotation: -20,
        transformOrigin: 'bottom left',
        repeat: 6,
        yoyo: true,
    });
    catN = new TimelineMax();
    TweenMax.set('#catBomb', {
        opacity: 0,
    });
    TweenMax.set('#catpop', {
        y: -1000,
        x: 500,
    });
    TweenMax.to('#catpop', 0.5, {
        rotation: 360,
        transformOrigin: 'center center',
        repeat: -1,
    });
    catN.set('#catNormal', {
        x: 1200,
    });
    catN.fromTo('#catNormal', 1.5, {
        x: 1200,
    }, {
        x: 0,
        ease: Power0.easeNone,
    }).fromTo('#catpop', 0.5, {
        y: -1000,
        x: 500,
    }, {
        delay: 0.5,
        y: 350,
        x: -75,
        ease: SlowMo.ease.config(0.7, 0.7, false),
    }).to('#catpop', 0.5, {
        y: 0,
        x: -1000,
    }).fromTo('#catpop', 2, {
        y: 470,
        x: -1000,
        rotation: 480
    }, {
        y: 470,
        x: -150,
        rotation: 45
    }).to('#catpop', 0.1, {
        rotation: 0
    });
    TweenMax.fromTo('#catBomb', .2, {
        scale: 1,
        transformOrigin: 'bottom center',
        opacity: 0
    }, {
        delay: 2.5,
        scale: 1.2,
        opacity: 1,
        ease: Elastic.easeOut.config(1, 0.3),
    });
    TweenMax.to('#catBomb', .2, {
        scale: 1,
    });
    TweenMax.to('#catNormal', 0.1, {
        delay: 2.5,
        opacity: 0,
        ease: Elastic.easeOut.config(1, 0.3),
    });
    TweenMax.fromTo('#catText', 0.2, {
        opacity: 0,
        scale: 0.5,
    }, {
        delay: 2.5,
        opacity: 1,
        scale: 1,
        ease: Elastic.easeOut.config(1, 0.3),
    });
}

function waterBall() {
    /* -- 水球 -- */
    TweenMax.set('#waterPlace', {
        opacity: 0,
    });
    ballon = waterPlace = new TimelineMax();
    ballon.fromTo('#ballon', 0.3, {
        transformOrigin: 'center center',
        opacity: 1,
        scale: 5,
    }, {
        opacity: 0.8,
        scale: 0.5,

    }).fromTo('#ballon', 0.01, {
        opacity: 0.8,
    }, {
        opacity: 0,
        ease: Back.easeOut.config(1.7),
    });
    waterPlace.fromTo('#waterPlace', 0.6, {
        opacity: 0,
        transformOrigin: 'center center',
        scale: 0.5,
    }, {
        // delay: -0.1,
        opacity: 1,
        scale: 1.2,
        ease: Expo.easeOut,
    });
}

function rocket() {
    /* -- 火箭爆米花 -- */
    let rocket, popBox;
    TweenMax.set(['#pops', '#popBox', '#popL1', '#popL2', '#popR1', '#popR2', '#popB1'], {
        opacity: 0,
    });
    TweenMax.set('#rocket', {
        y: 600,
    });
    rocket = popL1 = popR1 = popBox = new TimelineMax();
    rocket.to('#rocket', 0.05, {
        transformOrigin: 'center bottom',
        rotation: 2,
        yoyo: true,
        repeat: 30,
    }).fromTo('#rocket', 0.5, {
        y: 600,
    }, {
        y: 300,
    }).fromTo('#rocket', 3, {
        y: 300,
    }, {
        y: 100,
        yoyo: true,
        repeat: 1,
    }).fromTo('#popL1', 0.2, {
        delay: -0.5,
        x: 150,
        y: 0,
        opacity: 0,
    }, {
        x: 50,
        y: 1500,
        opacity: 1,
        scale: 1.2,
    }).fromTo('#popR1', 0.1, {
        x: -200,
        y: 0,
        opacity: 0,
    }, {
        delay: 0.5,
        x: 50,
        y: 1500,
        opacity: 1,
        scale: 1,
    }).fromTo('#popL1', 0.1, {
        x: 50,
        y: 1500,
        opacity: 1,
    }, {
        x: -150,
        y: -1500,
        scale: 2,
        opacity: 1,
    }).fromTo('#popR1', 0.2, {
        x: -200,
        y: 1500,
        opacity: 0,
    }, {
        x: 0,
        y: -1500,
        opacity: 1,
        scale: 0.5,
    }).fromTo('#popB1', 0.2, {
        x: 0,
        y: 100,
        opacity: 0,
    }, {
        x: 0,
        y: 1500,
        opacity: 1,
        scale: 0.5,
    }).fromTo('#popR1', 0.2, {
        x: -200,
        y: 1500,
        opacity: 0,
    }, {
        x: 100,
        y: 1500,
        opacity: 1,
        scale: 0.5,
    }).fromTo('#rocket', 5, {
        y: 300,
    }, {
        y: -1200,
    });

    TweenMax.fromTo('#popL2', 1, {
        x: 150,
        y: -200,
        opacity: 0,
        scale: 2
    }, {
        delay: 6,
        x: 50,
        y: 1500,
        opacity: 1,
        repeat: 3,
    });
    TweenMax.fromTo('#popR2', 1, {
        x: -200,
        y: -300,
        opacity: 0,
        scale: 3
    }, {
        delay: 6.5,
        x: -150,
        y: 1500,
        opacity: 1,
        scale: 1.2,
        repeat: 3,
    });
    TweenMax.fromTo('#popL1', .5, {
        x: 50,
        y: 1500,
        scale: 1.5,
    }, {
        delay: 7.5,
        x: -250,
        y: -1500,
        scale: 1.2,
        repeat: 2,
    });
    TweenMax.fromTo('#popR1', .5, {
        x: -200,
        y: 1500,
        scale: 1.8,
    }, {
        delay: 6.5,
        x: 300,
        y: 1500,
        scale: 1.5,
        repeat: 2,
    });
    TweenMax.fromTo('#popL1', 3, {
        x: 0,
        y: -1500,
        scale: 1,
    }, {
        delay: 10,
        x: 0,
        y: 450,
        scale: 1.1,
    });
    TweenMax.fromTo('#popR1', 3, {
        x: 0,
        y: -1500,
        scale: 1.2,
    }, {
        delay: 12,
        x: 0,
        y: 400,
        scale: 1,
    });
    TweenMax.fromTo('#pops', 5, {
        x: 0,
        y: 1500,
        opacity: 0,
    }, {
        delay: 10,
        x: 0,
        y: 100,
        opacity: 1,
    });
    popBox.fromTo('#popBox', .5, {
        x: 0,
        y: -1500,
        opacity: 1,
    }, {
        x: 0,
        y: 80,
        opacity: 1,
        ease: Bounce.easeOut
    }).fromTo('#popBox', 1, {
        rotation: 0,
        transformOrigin: 'center bottom',
    }, {
        rotation: 10,
    });
    TweenMax.fromTo('#rocketText', .5, {
        opacity: 0,
    }, {
        delay: 12,
        opacity: 1,
    });
}

function oct() {
    /* -- 章魚 -- */
    let oct;
    TweenMax.set(['#octRed', '#octHeart1', '#octHeart2', '#octText'], {
        opacity: 0
    })

    oct = octRed = octHeart1 = octHeart2 = octText = new TimelineMax();
    oct.fromTo('#oct', 3, {
        x: 0,
        y: 1000,
    }, {
        x: 0,
        y: 0,
        ease: Bounce.easeOut,
    }).fromTo('#oct', 2, {
        y: 0,
    }, {
        y: 50,
        repeat: -1,
        yoyo: true,
        ease: Power0.easeNone,
    });
    octHeart2.fromTo('#octHeart2', 0.2, {
        transformOrigin: 'bottom right',
        opacity: 0,
        scale: 0,
    }, {
        opacity: 1,
        scale: 1,
    }).fromTo('#octHeart2', 3, {
        y: 50,
        scale: 1,
    }, {
        x: -200,
        y: -150,
        scale: 2,
    }).to('#octHeart2', 3, {
        opacity: 0
    });
    octHeart1.fromTo('#octHeart1', 0.2, {
        transformOrigin: 'bottom right',
        opacity: 0,
        scale: 0,
    }, {
        opacity: 1,
        scale: 1,
    }, '-=5').fromTo('#octHeart1', 5, {
        y: 50,
        scale: 1,
    }, {
        x: 100,
        y: -250,
        scale: 2,
    }).to('#octHeart1', 3, {
        opacity: 0
    }, '-=1');
    octRed.fromTo('#octRed', 0.2, {
        transformOrigin: 'bottom right',
        opacity: 0,
        scale: 0,
    }, {
        opacity: 1,
        scale: 1,
    }, '-=5').fromTo('#octRed', 5, {
        y: 50,
        scale: 1,
    }, {
        x: 300,
        y: -350,
        scale: 2,
    }).to('#octRed', 3, {
        opacity: 0
    }, '-=1');
    octText.fromTo('#octText', 0.2, {
        transformOrigin: 'bottom right',
        opacity: 0,
        scale: 0,
    }, {
        opacity: 1,
        scale: 1,
    }, '-=2').fromTo('#octText', 3, {
        y: 50,
    }, {
        x: 0,
        y: -100,
    });
}