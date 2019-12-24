$(document).ready(function () {
  //撥放器縮放
  $('#expand').click(function () {
    $('.player_b').addClass('open');
    $('.player_s').animate({
      bottom: '-70px'
    });
  });
  $('#closePlayer').click(function () {
    $('.player_b').removeClass('open');
    $('.player_s').animate({
      bottom: '0'
    });
  });

  //手機推移
  $('.left .pushBtn').click(function () {
    $('.left').css('height', '10%');
    $('.right').css('height', '90%');
    $('.right .pushBtn').show();
    $('.left .pushBtn').hide();
  });
  $('.right .pushBtn').click(function () {
    $('.left').css('height', '90%');
    $('.right').css('height', '10%');
    $('.left .pushBtn').show();
    $('.right .pushBtn').hide();
  });

  //select選歌單
  $('#selectBtn').click(function () {
    $('#lightCover').show();
    $('#myAllList').show();
  });

  //歌單清單
  $('#closePlayer').click(function () {
    $('#lightCover').hide();
    $('#myAllList').hide();
  });
  $('#lightCover').click(function () {
    $(this).hide();
    $('#myAllList').hide();
  });

  //點愛心
  $('.heart').click(function () {
    if ($(this).hasClass('becomeRed')) {
      $(this).html('<i class="far fa-heart"></i>').removeClass('becomeRed');
    } else {
      $(this).html('<i class="fas fa-heart"></i>').addClass('becomeRed');
    }
  });

  //點歌單撥放，左側專輯唱片動畫
  $('.songCover').mouseover(function () {
    $(this).find('.listPlay').show();
  });
  $('.songCover').mouseout(function () {
    $(this).find('.listPlay').hide();
  });

  $(".listPlay").click(function () {
    if ($(this).hasClass('nowlistening')) {
      $(this).html('<i class="fas fa-play"></i>').removeClass("nowlistening");
      isPlaying(true);
    } else {
      $(this).html('<i class="fas fa-pause"></i>').addClass("nowlistening");
      $("#player .songCover .listPlay").not(this).removeClass('nowlistening');
      isPlaying(false);
    }
  });



  /* -- 音樂播放 -- */
  let storage = localStorage;
  var autoplay = true,
    songTime,
    playStatus = false,
    nowPlaying = 0, //現在播放的歌
    audio = $("audio")[0], //撥放器
    myPlaylist = [{
        title: "Lucid Dreamer",
        creator: "Spazz Cardigan",
        cover: "../img/library/cover1.jpg",
        filein: "../img/library/Lucid_Dreamer.mp3",
        totalTime: "3:11",
      },
      {
        title: "Spring In My Step",
        creator: "Silent Partner",
        cover: "../img/library/cover2.jpg",
        filein: "../img/library/Spring_In_My_Step.mp3",
        totalTime: "1:59",
      },
      {
        title: "On My Way Home",
        creator: "The 126ers",
        cover: "../img/library/cover3.jpg",
        filein: "../img/library/On_My_Way_Home.mp3",
        totalTime: "1:56",
      }
    ];

  
  audio.setAttribute("src", myPlaylist[nowPlaying].filein);
  isAutoPlay(true);//測試

  //播放暫停按鈕 -- 音樂撥放/暫停
  $("#player .play").click(function () {
    // console.log(nowPlaying);
    // console.log(playStatus);
    isPlaying(playStatus);
  });

  //下一首按鈕 -- 切換下一首
  $("#player .next").click(function () {
    if (nowPlaying == myPlaylist.length - 1) {
      audio.setAttribute("src", myPlaylist[myPlaylist.length - 1].filein);
    } else {
      nowPlaying++;
      audio.setAttribute("src", myPlaylist[nowPlaying].filein);
    }
    if (playStatus == true) {
      isPlaying(false);
    } else {
      isPlaying(true);
    }
  });

  //上一首按鈕 -- 切換上一首
  $("#player .prev").click(function () {
    if (nowPlaying == 0) {
      audio.setAttribute("src", myPlaylist[0].filein);
    } else {
      nowPlaying--;
      audio.setAttribute("src", myPlaylist[nowPlaying].filein);
    }
    if (playStatus == true) {
      isPlaying(false);
    } else {
      isPlaying(true);
    }
  });

  //停止按鈕 -- 音樂全數停止
  $("#player .stop").click(function () {
    audio.pause();
    audio.currentTime = 0;
    isPlaying(true);
    $("#player .songCover .listPlay").removeClass('nowlistening');
  });

  //循環播放 -- 單首??未處理
  $("#player .loop").click(function () {
    if ($(this).hasClass("becomeYel")) {
      $(this).removeClass("becomeYel");
      audio.loop = false;
    } else {
      $(this).addClass("becomeYel");
      audio.loop = true;
    }
  });
  //隨機播放 -- 清單隨機--未處理



  //clickBar -- 詳細(b)/簡易(s)
  $(".player_b .progressbar").click(function (e) {
    let progressBarSize_b = parseInt($(".player_b .progressbar").css("width"));
    let mouseX_b = e.clientX - $(".player_b .progressbar").offset().left;
    $(".player_b .progressbar .progress").css('width', `${mouseX_b}px`);

    let newTime_b = mouseX_b / (progressBarSize_b / audio.duration);
    audio.currentTime = newTime_b;
  });
  $(".player_s .progressbar").click(function (e) {
    let progressBarSize_s = parseInt($(".player_s .progressbar").css("width"));
    let mouseX_s = e.clientX - $(".player_s .progressbar").offset().left;
    $(".player_s .progressbar .progress").css('width', `${mouseX_s}px`);

    let newTime_s = mouseX_s / (progressBarSize_s / audio.duration);
    audio.currentTime = newTime_s;
  });


  /* -- 自動撥放 --*/
  function isAutoPlay(autoP){//測試
    if(autoP){
      isPlaying(false);
    }else{
      isPlaying(true);
    }
  }

  function isPlaying(isPlaying) {
    if (!isPlaying) { //如果沒有播放就讓他撥
      playAudio();
      $("#player .play").html('<i class="fas fa-pause"></i>');
      $("#player .player_b .coverRec").animate({
        right: "-50%",
        opacity: "1"
      }, "fast", "swing").addClass("recRotate");
      playStatus = true;
      // console.log(playStatus);
    } else {
      audio.pause();
      $("#player .play").html('<i class="fas fa-play"></i>');
      playStatus = false;
      $("#player .player_b .coverRec").animate({
        right: "0%"
      }).removeClass("recRotate");
      // console.log(playStatus);
    }
    $("#player .songInfo .name").text(myPlaylist[nowPlaying].title);
    $("#player .songInfo .creator").text(myPlaylist[nowPlaying].creator);
  }

  //播放
  function playAudio() {
    audio.play();
  }


  
  //進度條
  var progressingTime = setInterval(progressingShow, 100);
  let newSong = nowPlaying;//測試
  function progressingShow() {
    songTime = audio.currentTime;
    let progressColor = (songTime / audio.duration) * 100;
    if (audio.ended) {
      autoChange();
    }
    /*測試
    if(newSong == nowPlaying){
      storage.setItem(newSong, songTime);
    }else{
      storage.clear();
      storage.setItem(nowPlaying, songTime);
    }
    */
    // console.log(audio.duration); //歌曲總長秒數
    $("#player .progress").css("width", `${progressColor.toFixed(2)}%`);
    $("#player span.start").text(`${parseInt(songTime / 60)}:${parseInt(songTime % 60)}`)
    $("#player span.end").text(myPlaylist[nowPlaying].totalTime);
  }

  //自動換下一首
  function autoChange() {
    if (nowPlaying == myPlaylist.length - 1) { 
      if (audio.ended) {
        audio.currentTime = 0;
        isPlaying(true);
      } else {
        isPlaying(false);
      }
    } else {
      nowPlaying++;
      audio.setAttribute("src", myPlaylist[nowPlaying].filein);
      isPlaying(false);
    }
  }
});