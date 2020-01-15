let bbf, bff, fff, fbf, tail, catAll; //貓咪
let ballon, waterPlace, waterBall;



function donateAni() {

}

// donateAni();

/* -- 貓咪 -- */






$('button').click(function () {
    $('.lightCover').show();
    $('.donanimate').show();

    bbf = TweenMax.to('#cat_bbf', 1, {
        rotation: 5,
        transformOrigin: 'top center',
        repeat: 3,
        yoyo: true,
    });
    bff = TweenMax.to('#cat_bff', 1, {
        rotation: 3,
        transformOrigin: 'top center',
        repeat: 3,
        yoyo: true,
    });
    fff = TweenMax.to('#cat_fff', 1, {
        rotation: 5,
        transformOrigin: 'top right',
        repeat: 3,
        yoyo: true,
    });
    fbf = TweenMax.to('#cat_fbf', 1, {
        rotation: -5,
        transformOrigin: 'top center',
        repeat: 3,
        yoyo: true,
    });
    tail = TweenMax.to('#cat_tail', 1, {
        rotation: -15,
        transformOrigin: 'bottom left',
        repeat: 3,
        yoyo: true,
    });
    catAll = new TimelineMax();
    catAll.fromTo('#catAll', 3, {
        x: 500,
        opacity: 1,
    }, {
        x: 150
    }).fromTo('#catAll', 0.2, {
        scale: 0.95,
        opacity: 0.5,
    }, {
        scale: 1.05,
        opacity: 1,
        repeat: 5,
    }).to('#catNormal', 0.01, {
        opacity: 0
    }).to('#catBomb', 0.01, {
        opacity: 1
    }).fromTo('#catBomb', 3, {
        rotation: 0,
        transformOrigin: 'center center',
        y: 0,
        x: 200,
    }, {
        rotation: 120,
        x: 0,
        y: -300,
    }).fromTo('#catBomb', 3, {
        rotation: 120,
        x: 0,
        y: -300,
    }, {
        rotation: -180,
        x: 500,
        y: -600,
    }).fromTo('#catBomb', 3, {
        rotation: -180,
        x: 500,
        y: -600,
    }, {
        rotation: 0,
        x: -100,
        y: -1000,
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
    let rocketAll, rocket, popL1, popL2, popR1, popR2, popB1, pops, popBox;
    TweenMax.set(['#pops', '#popBox', '#popL1', '#popL2', '#popR1', '#popR2', '#popB1'], {
        opacity: 0,
    });
    TweenMax.set('#rocket', {
        y: 600,
    });
    rocket = popL1 = popR1 = new TimelineMax();
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
        repeat: 2,
    }).fromTo('#popL1', 0.5, {
        x: 150,
        y: 0,
        opacity: 0,
    }, {
        x: 50,
        y: 800,
        opacity: 1,
        scale:1.2,
    }).fromTo('#popR1', 0.5, {
        x: -200,
        y: 0,
        opacity: 0,
    }, {
        delay:0.5,
        x: 50,
        y: 800,
        opacity: 1,
        scale:0.7,
    }).fromTo('#popL1', 3, {
        x: 50,
        y: 800,
        opacity: 0.7,
    }, {
        x: -50,
        y: -800,
        opacity: 0.7,
    });
    // popL1;
});