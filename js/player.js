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
  $('#player .selectBtn').click(function () {
    $('#player .lightCover').show();
    $('#player #myAllList').show();
  });

  //歌單清單
  $('.closeLight').click(function () {
    $('.lightCover').hide();
    $('#myAllList').hide();
  });
  $('.lightCover').click(function () {
    $(this).hide();
    $('#myAllList').hide();
  });

  //點愛心
  $('.heart').click(function () {
    if ($(this).hasClass('becomeRed')) {
      $(this).html('<img src="../img/collection/grayheart.png">').removeClass('becomeRed');
    } else {
      $(this).html('<img src="../img/collection/redheart.png">').addClass('becomeRed');
    }
  });

  //點歌單撥放，左側專輯唱片動畫
  $('.songCover').mouseover(function () {
    $(this).find('.listPlay').show();
  });
  $('.songCover').mouseout(function () {
    $(this).find('.listPlay').hide();
  });



  /* -- 音樂播放 -- */
  let storage = localStorage;
  let autoplay = false,
    songTime,
    progressingTime,
    playStatus = false,
    nowPlaying = 0, //現在播放的歌
    audio = $("audio")[0], //撥放器
    myPlaylist = [{
        title: "Lucid Dreamer",
        creator: "Spazz Cardigan",
        cover: "../img/collection/album1.jpg",
        filein: "../img/library/Lucid_Dreamer.mp3",
        totalTime: "3:11",
      },
      {
        title: "Spring In My Step",
        creator: "Silent Partner",
        cover: "../img/collection/album2.jpg",
        filein: "../img/library/Spring_In_My_Step.mp3",
        totalTime: "1:59",
      },
      {
        title: "On My Way Home",
        creator: "The 126ers",
        cover: "../img/collection/album3.jpg",
        filein: "../img/library/On_My_Way_Home.mp3",
        totalTime: "1:56",
      }
    ],
    listLen = myPlaylist.length;

    $('#player audio').attr("src", myPlaylist[nowPlaying].filein);
    // isStorageHave();
  
    //播放暫停按鈕 -- 音樂撥放/暫停
    $("#player .play").click(function () {
      isPlaying(playStatus);
    });
  
    //下一首按鈕 -- 切換下一首
    $("#player .next").click(function () {
      if (nowPlaying == listLen - 1) {
        $("#player audio").attr("src", myPlaylist[listLen - 1].filein);
      } else {
        nowPlaying++;
        $("#player audio").attr("src", myPlaylist[nowPlaying].filein);
      }
      if (playStatus == true) {
        isPlaying(false);
      } else {
        isPlaying(true);
      }
      listStatus();
    });
  
    //上一首按鈕 -- 切換上一首
    $("#player .prev").click(function () {
      if (nowPlaying == 0) {
        $("#player audio").attr("src", myPlaylist[0].filein);
      } else {
        nowPlaying--;
        $("#player audio").attr("src", myPlaylist[nowPlaying].filein);
      }
      if (playStatus == true) {
        isPlaying(false);
      } else {
        isPlaying(true);
      }
      listStatus();
    });
  
    //停止按鈕 -- 音樂全數停止
    $("#player .stop").click(function () {
      audio.pause();
      audio.currentTime = 0;
      isPlaying(true);
      $("#player .songCover .listPlay").removeClass('nowlistening');
    });
  
    //循環播放 -- 單首ok
    $("#player .loop").click(function () {
      if ($(this).hasClass("becomeYel")) {
        $(this).removeClass("becomeYel");
        $("#player .rand").attr("disabled", false);
        audio.loop = false;
        autoChange(true);
      } else {
        $(this).addClass("becomeYel");
        $("#player .rand").attr("disabled", true);
        audio.loop = true;
        autoChange(false);
      }
    });
    //隨機播放 -- 清單隨機--未處理
    $("#player .rand").click(function () {
      if ($(this).hasClass("becomeYel")) {
        $(this).removeClass("becomeYel");
        $("#player .loop").attr("disabled", false);
        autoChange(true);
      } else {
        $(this).addClass("becomeYel");
        $("#player .loop").attr("disabled", true);
        autoChange(false);
      }
    });
  
    //maybe有靜音 volIcon
  
  
  
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
  
    /* -- local -- */
    // function isStorageHave() {
    //   let newSongTime;
    //   if(storage.length != 0){
    //     newSongTime = storage.getItem(1);
    //     console.log(newSongTime);
    //   }else{
    //     console.log(newSongTime);
    //   }
    // }
  
    function isPlaying(isPlaying) {
      if (!isPlaying) { //如果沒有播放就讓他撥
        playAudio();
        $("#player .play").html('<i class="fas fa-pause"></i>');
        $("#player .player_b .coverRec").animate({
          right: "-50%",
          opacity: "1"
        }, "fast", "swing").addClass("recRotate");
        playStatus = true;
        listStatus();
      } else {
        audio.pause();
        $("#player .play").html('<i class="fas fa-play"></i>');
        playStatus = false;
        listStatus();
        $("#player .player_b .coverRec").animate({
          right: "0%"
        }).removeClass("recRotate");
      }
      $("#player .songInfo .name").text(myPlaylist[nowPlaying].title);
      $("#player .songInfo .creator").text(myPlaylist[nowPlaying].creator);
      $("#player .info img").not(".coverRec img").attr("src", myPlaylist[nowPlaying].cover);
    }
  
    //播放
    function playAudio() {
      audio.play();
    }
  
    //進度條
    progressingTime = setInterval(progressingShow, 100);
    let newSong = nowPlaying; //測試
    function progressingShow() {
      songTime = audio.currentTime;
      let progressColor = (songTime / audio.duration) * 100;
      if (audio.ended) {
        autoChange(true);
      }
      // if(newSong == nowPlaying){
      //   storage.setItem(newSong, songTime);
      // }else{
      //   storage.clear();
      //   storage.setItem(nowPlaying, songTime);
      // }
  
      // console.log(audio.duration); //歌曲總長秒數
      $("#player .progress").css("width", `${progressColor.toFixed(2)}%`);
      $("#player span.start").text(`${parseInt(songTime / 60)}:${parseInt(songTime % 60)}`)
      $("#player span.end").text(myPlaylist[nowPlaying].totalTime);
    }
  
    //自動換下一首
    function autoChange(autoStatus) {
      if (autoStatus) {
        //隨機撥放
        if ($("#player .rand").hasClass("becomeYel")) {
          let randNum = parseInt(Math.random() * (listLen));
          console.log(randNum);
          nowPlaying = randNum;
          $("#player audio").attr("src", myPlaylist[nowPlaying].filein);
          isPlaying(false);
          listStatus();
        } else {
          if (nowPlaying == listLen - 1) {
            if (audio.ended) {
              audio.currentTime = 0;
              isPlaying(true);
            } else {
              isPlaying(false);
            }
          } else {
            if (audio.ended) {
              nowPlaying++;
              $("#player audio").attr("src", myPlaylist[nowPlaying].filein);
              isPlaying(false);
              listStatus();
            }
          }
        }
      }
    }
  
    //清單播放狀態
    function listStatus() {
      let NowPlaySong = document.querySelector(".player_s .songInfo .name").innerText;
      let listCover = document.querySelectorAll(".player_b .songCover .listPlay");
      for (var listNum = 0; listNum < listLen; listNum++) {
        if (myPlaylist[listNum].title == NowPlaySong) {
          console.log(listNum);
          listCover[listNum].classList.add("nowlistening");
          if (playStatus == false) {
            listCover[listNum].innerHTML = '<img src="../img/library/coverPlay-s.png">';
          } else {
            listCover[listNum].innerHTML = '<img src="../img/library/coverPause-s.png">';
          }
        } else {
          listCover[listNum].innerHTML = '<img src="../img/library/coverPlay-s.png">';
          listCover[listNum].classList.remove("nowlistening");
        }
      }
    }
  
    //清單播放點擊 -- 有問題
    $(".listPlay").click(function () {
      listStatus();
      if ($(this).hasClass('nowlistening')) {
        if (playStatus) {
          $(this).html('<img src="../img/library/coverPlay-s.png">');
          isPlaying(true);
        } else {
          $(this).html('<img src="../img/library/coverPause-s.png">');
          isPlaying(false);
        }
      } else {
        let selectSong = $(this).parent().siblings(".listSongInfo").find(".name").find("h4").text();
        let titleName = [];
  
        for (let nameNum = 0; nameNum < listLen; nameNum++) {
          titleName.push(myPlaylist[nameNum].title);
        }
  
        let selectNum = titleName.indexOf(selectSong.toString());
        nowPlaying = selectNum;
        $("#player audio").attr("src", myPlaylist[nowPlaying].filein);
        isPlaying(false);
        console.log(titleName);
        console.log(nowPlaying);
      }
    });
});