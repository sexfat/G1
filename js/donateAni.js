let bbf, bff, fff, fbf, tail, catN; //貓咪
let ballon, waterPlace, waterBall;



/* -- 貓咪 -- */
$('input[type="radio"]').change(function () {
    let donateVal = $(this).val();
    if (donateVal == 100) {
        $('.donanimate>div').hide();
        $('.ani_oct').show();
    } else if (donateVal == 300) {
        $('.donanimate>div').hide();
        $('.ani_water').show();
    } else if (donateVal == 500) {
        $('.donanimate>div').hide();
        $('.ani_cat').show();
    } else {
        $('.donanimate>div').hide();
        $('.ani_rocket').show();
    }
});
$('#donateSubmit').click(function () {
    $('.lightCover').show();
    $('.donanimate').show();

    bbf = TweenMax.to('#cat_bbf', 1, {
        rotation: 10,
        transformOrigin: 'top center',
        repeat: 7,
        yoyo: true,
    });
    bff = TweenMax.to('#cat_bff', 1, {
        rotation: -10,
        transformOrigin: 'top center',
        repeat: 7,
        yoyo: true,
    });
    fff = TweenMax.to('#cat_fff', 1, {
        rotation: 10,
        transformOrigin: 'top right',
        repeat: 7,
        yoyo: true,
    });
    fbf = TweenMax.to('#cat_fbf', 1, {
        rotation: -10,
        transformOrigin: 'top center',
        repeat: 7,
        yoyo: true,
    });
    tail = TweenMax.to('#cat_tail', 2, {
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
        x: 2000,
    });
    catN.fromTo('#catNormal', 7, {
        x: 1500,
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
    });
    TweenMax.fromTo('#catBomb', .2, {
        scale: 1,
        transformOrigin: 'bottom center',
        opacity: 0
    }, {
        delay: 8.2,
        scale: 1.2,
        opacity: 1,
        ease: Elastic.easeOut.config(1, 0.3),
    });
    TweenMax.to('#catBomb', .2, {
        scale: 1,
    });
    TweenMax.to('#catNormal', 0.1, {
        delay: 8.2,
        opacity: 0,
        ease: Elastic.easeOut.config(1, 0.3),
    });
    TweenMax.fromTo('#catText', 0.2, {
        opacity: 0,
        scale: 0.5,
    }, {
        delay: 8.2,
        opacity: 1,
        scale: 1,
        ease: Elastic.easeOut.config(1, 0.3),
    });


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

    /* -- 火箭爆米花 -- */
    let rocketAll, rocket, popBox;
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
        y: 800,
        opacity: 1,
        scale: 1.2,
    }).fromTo('#popR1', 0.1, {
        x: -200,
        y: 0,
        opacity: 0,
    }, {
        delay: 0.5,
        x: 50,
        y: 800,
        opacity: 1,
        scale: 1,
    }).fromTo('#popL1', 0.1, {
        x: 50,
        y: 800,
        opacity: 1,
    }, {
        x: -150,
        y: -800,
        scale: 2,
        opacity: 1,
    }).fromTo('#popR1', 0.2, {
        x: -200,
        y: 800,
        opacity: 0,
    }, {
        x: 0,
        y: -800,
        opacity: 1,
        scale: 0.5,
    }).fromTo('#popB1', 0.2, {
        x: 0,
        y: 100,
        opacity: 0,
    }, {
        x: 0,
        y: 800,
        opacity: 1,
        scale: 0.5,
    }).fromTo('#popR1', 0.2, {
        x: -200,
        y: 800,
        opacity: 0,
    }, {
        x: 100,
        y: 800,
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
    }, {
        delay: 6,
        x: 50,
        y: 800,
        opacity: 1,
        repeat: 3,
    });
    TweenMax.fromTo('#popR2', 1, {
        x: -200,
        y: -300,
        opacity: 0,
    }, {
        delay: 6.5,
        x: -150,
        y: 800,
        opacity: 1,
        scale: 1.2,
        repeat: 3,
    });
    TweenMax.fromTo('#popL1', .5, {
        x: 50,
        y: 800,
    }, {
        delay: 7.5,
        x: -250,
        y: -800,
        scale: .8,
        repeat: 2,
    });
    TweenMax.fromTo('#popR1', .5, {
        x: -200,
        y: 800,
    }, {
        delay: 6.5,
        x: 300,
        y: 800,
        scale: 1.1,
        repeat: 2,
    });
    TweenMax.fromTo('#popL1', 3, {
        x: 0,
        y: -800,
        scale: 0.8,
    }, {
        delay: 10,
        x: 0,
        y: 450,
        scale: 1,
    });
    TweenMax.fromTo('#popR1', 3, {
        x: 0,
        y: -800,
        scale: 0.9,
    }, {
        delay: 12,
        x: 0,
        y: 400,
        scale: 1.1,
    });
    TweenMax.fromTo('#pops', 5, {
        x: 0,
        y: 800,
        opacity: 0,
    }, {
        delay: 10,
        x: 0,
        y: 100,
        opacity: 1,
    });
    popBox.fromTo('#popBox', .5, {
        x: 0,
        y: -1000,
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

    let oct;
    TweenMax.set(['#octHeart1', '#octHeart2', '#octHeart3'], {
        opacity: 0
    })
    oct = new TimelineMax();
    oct.fromTo(['#oct', '#octRed'], 5, {
        x: -1000,
        y: 1000,
    }, {
        x: 0,
        y: 0,
        
    });
    TweenMax.fromTo('#octHeart1', 1, {
        repeatDelay: 3,
        opacity: 0.8,
        scale: 0,
        x: 0,
        y: 0,
        transformOrigin: 'top center',
    }, {
        delay: 3,
        repeat: 3,
        opacity: 0,
        scale: 1,
        x: 0,
        y: 50,
    });
    TweenMax.fromTo('#octHeart2', 1.5, {
        repeatDelay: 3,
        opacity: 0.8,
        scale: 0,
        transformOrigin: 'rigtht center',
        x: 0,
        y: 0,
    }, {
        delay: 3,
        repeat: 3,
        opacity: 0,
        scale: 1,
        x: -50,
        y: -50,
    });
    TweenMax.fromTo('#octHeart3', 1, {
        repeatDelay: 3,
        opacity: 0.8,
        scale: 0,
        transformOrigin: 'rigtht center',
        x: 0,
        y: 0
    }, {
        delay: 4,
        repeat: 2,
        opacity: 0,
        scale: 1,
        x: -50,
        y: -50,
    });
});