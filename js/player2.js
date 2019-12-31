const myPlaylist = [{
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
];
var listLen = myPlaylist.length;

class Player {
  constructor(playlist) {
    this.audio = $("audio")[0];
    this.vol_s = 50;
    this.vol_b = 50;
    this.nowPlaying = 0;
    this.songTime;
    this.progressingTime;
    this.playStatus = false;
    this.myPlaylist = playlist || [];

  }

  isPlaying(playStatus) {
    if (!this.playStatus) { //如果沒有播放就讓他撥
      this.playMode();
      $("#player .play").html('<i class="fas fa-pause"></i>');
      $("#player .player_b .coverRec").animate({
        right: "-50%",
        opacity: "1"
      }, "fast", "swing").addClass("recRotate");
      this.playStatus = true;
      this.listStatus();
    } else {
      this.audio.pause();
      $("#player .play").html('<i class="fas fa-play"></i>');
      this.playStatus = false;
      this.listStatus();
      $("#player .player_b .coverRec").animate({
        right: "0%"
      }).removeClass("recRotate");
    }
    $("#player .songInfo .name").text(this.myPlaylist[this.nowPlaying].title);
    $("#player .songInfo .creator").text(this.myPlaylist[this.nowPlaying].creator);
    $("#player .info img").not(".coverRec img").not(".heart img").attr("src", this.myPlaylist[this.nowPlaying].cover);
  }

  //播放
  playMode() {
    this.audio.play();
  }

  progressTimer() {
    this.progressingTime = setInterval(this.progressingRun(), 100);
  }


  //進度條
  progressingRun() {
    this.songTime = this.audio.currentTime;
    let progressColor = (this.songTime / this.audio.duration) * 100;
    if (this.audio.ended) {
      this.autoChange(true);
    }
    // console.log(audio.duration); //歌曲總長秒數
    $("#player .progress").css("width", `${progressColor.toFixed(2)}%`);
    $("#player span.start").text(`${parseInt(this.songTime / 60)}:${parseInt(this.songTime % 60)}`)
    $("#player span.end").text(this.myPlaylist[this.nowPlaying].totalTime);
    //順便同步音量
    $(".player_b .volLine .volControl").css('width', `${parseInt(this.audio.volume*100)}%`);
    $(".player_s .volLine .volControl").css('width', `${parseInt(this.audio.volume*100)}%`);
  }


  //自動換下一首
  autoChange(autoStatus) {
    if (autoStatus) {
      //隨機撥放
      if ($("#player .rand").hasClass("becomeYel")) {
        let randNum = parseInt(Math.random() * (this.listLen));
        this.nowPlaying = randNum;
        $("#player audio").attr("src", this.myPlaylist[this.nowPlaying].filein);
        this.isPlaying(false);
        this.listStatus();
      } else {
        if (this.nowPlaying == this.listLen - 1) {
          if (this.audio.ended) {
            this.audio.currentTime = 0;
            this.isPlaying(true);
          } else {
            this.isPlaying(false);
          }
        } else {
          if (this.audio.ended) {
            this.nowPlaying++;
            $("#player audio").attr("src", this.myPlaylist[this.nowPlaying].filein);
            this.isPlaying(false);
            this.listStatus();
          }
        }
      }
    }
  }

  //清單播放狀態
  listStatus() {
    let NowPlaySong = document.querySelector(".player_s .songInfo .name").innerText;
    let listCover = document.querySelectorAll(".player_b .songCover .listPlay");
    // console.log(NowPlaySong);
    for (var listNum = 0; listNum < this.listLen; listNum++) {
      if (this.myPlaylist[listNum].title == this.NowPlaySong) {
        listCover[listNum].classList.add("nowlistening");
        if (this.playStatus == false) {
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


  //音量控制
  volPos(mousePos) {
    let vol_bwidth = $(".player_b .volLine").width();
    if ($("#player .player_b").hasClass("open")) {
      this.vol_b = mousePos - $(".player_b .volLine").offset().left;
      this.vol_b = parseInt((this.vol_b / 100) * 100);
      if (vol_bwidth == 100) {
        $(".player_b .volicon i").css('color', '#333');
        this.vol_b = parseInt((this.vol_b / 100) * 100);
        if (this.vol_b < 0) {
          this.vol_b = 0;
          $(".player_b .volicon i").css('color', '#f1c40f');
        } else if (this.vol_b > 100) {
          $(".player_b .volicon i").css('color', '#333');
          this.vol_b = 100;
        }
        this.audio.volume = this.vol_b / 100;
        $(".player_b .volLine .volControl").css('width', `${this.vol_b}%`);
      } else {
        this.vol_s = parseInt((this.vol_s / vol_bwidth) * 100);
        $(".player_b .volicon i").css('color', '#333');
        this.vol_b = parseInt((this.vol_b / vol_bwidth) * 100);
        if (this.vol_b < 0) {
          this.vol_b = 0;
          $(".player_b .volicon i").css('color', '#f1c40f');
        } else if (this.vol_b > 100) {
          $(".player_b .volicon i").css('color', '#333');
          this.vol_b = 100;
        }
        this.audio.volume = this.vol_b / 100;
        $(".player_b .volLine .volControl").css('width', `${this.vol_b}%`);
      }
    } else {
      this.vol_s = mousePos - $(".player_s .volLine").offset().left;
      this.vol_s = parseInt((this.vol_s / 100) * 100);
      $(".player_s .volicon i").css('color', 'white');
      if (this.vol_s < 0) {
        this.vol_s = 0;
        $(".player_s .volicon i").css('color', '#f1c40f');
      } else if (this.vol_s > 100) {
        $(".player_s .volicon i").css('color', 'white');
        this.vol_s = 100;
      }
      this.audio.volume = this.vol_s / 100;
      $(".player_s .volLine .volControl").css('width', `${this.vol_s}%`);
    }
  }

}

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

  const playerAudio = new Player(myPlaylist);



  /*初始化*/
  playerAudio.audio.volume = 0.5;
  $('#player audio').attr("src", myPlaylist[playerAudio.nowPlaying].filein);
  // $('#player audio').attr("autoplay", true);
  // playerAudio.isPlaying(false);

  playerAudio.progressTimer();


  //播放暫停按鈕 -- 音樂撥放/暫停
  $("#player .play").click(function () {
    playerAudio.isPlaying(playerAudio.playStatus);
  });

  //下一首按鈕 -- 切換下一首
  $("#player .next").click(function () {
    if (playerAudio.nowPlaying == listLen - 1) {
      $("#player audio").attr("src", myPlaylist[listLen - 1].filein);
    } else {
      playerAudio.nowPlaying++;
      $("#player audio").attr("src", myPlaylist[playerAudio.nowPlaying].filein);
    }
    if (playerAudio.playStatus == true) {
      playerAudio.isPlaying(false);
    } else {
      playerAudio.isPlaying(true);
    }
    playerAudio.listStatus();
  });

  //上一首按鈕 -- 切換上一首
  $("#player .prev").click(function () {
    if (playerAudio.nowPlaying == 0) {
      $("#player audio").attr("src", myPlaylist[0].filein);
    } else {
      playerAudio.nowPlaying--;
      $("#player audio").attr("src", myPlaylist[playerAudio.nowPlaying].filein);
    }
    if (playerAudio.playStatus == true) {
      playerAudio.isPlaying(false);
    } else {
      playerAudio.isPlaying(true);
    }
    playerAudio.listStatus();
  });

  //停止按鈕 -- 音樂全數停止
  $("#player .stop").click(function () {
    playerAudio.audio.pause();
    playerAudio.audio.currentTime = 0;
    playerAudio.isPlaying(true);
    $("#player .songCover .listPlay").removeClass('nowlistening');
  });

  //循環播放 -- 單首ok
  $("#player .loop").click(function () {
    if ($(this).hasClass("becomeYel")) {
      $(this).removeClass("becomeYel");
      $("#player .rand").attr("disabled", false);
      playerAudio.audio.loop = false;
      playerAudio.autoChange(true);
    } else {
      $(this).addClass("becomeYel");
      $("#player .rand").attr("disabled", true);
      playerAudio.audio.loop = true;
      playerAudio.autoChange(false);
    }
  });
  //隨機播放 -- 清單隨機--未處理
  $("#player .rand").click(function () {
    if ($(this).hasClass("becomeYel")) {
      $(this).removeClass("becomeYel");
      $("#player .loop").attr("disabled", false);
      playerAudio.autoChange(true);
    } else {
      $(this).addClass("becomeYel");
      $("#player .loop").attr("disabled", true);
      playerAudio.autoChange(false);
    }
  });

  //maybe有靜音 volIcon
  $("#player .volicon").click(function () {
    if (audio.muted) {
      playerAudio.audio.muted = false;
      $(".player_s .volicon i").css('color', 'white');
      $(".player_b .volicon i").css('color', '#333');
      $(".volLine .volControl").css('background-color', '#f1c40f');
    } else {
      playerAudio.audio.muted = true;
      $(this).find('i').css('color', '#f1c40f');
      $(".volLine .volControl").css('background-color', 'white');
    }
  });
  let vol_drag = false;
  $(".volLine").mousedown(function (e) {
    vol_drag = true;
  });
  $(document).mouseup(function (e) {
    if (vol_drag) {
      playerAudio.volPos(e.pageX);
    }
    vol_drag = false;
  });


  //clickBar -- 詳細(b)/簡易(s)
  $(".player_b .progressbar").click(function (e) {
    let progressBarSize_b = parseInt($(".player_b .progressbar").css("width"));
    let mouseX_b = e.clientX - $(".player_b .progressbar").offset().left;
    $(".player_b .progressbar .progress").css('width', `${mouseX_b}px`);

    let newTime_b = mouseX_b / (progressBarSize_b / playerAudio.audio.duration);
    playerAudio.audio.currentTime = newTime_b;
  });
  $(".player_s .progressbar").click(function (e) {
    let progressBarSize_s = parseInt($(".player_s .progressbar").css("width"));
    let mouseX_s = e.clientX - $(".player_s .progressbar").offset().left;
    $(".player_s .progressbar .progress").css('width', `${mouseX_s}px`);

    let newTime_s = mouseX_s / (progressBarSize_s / playerAudio.audio.duration);
    playerAudio.audio.currentTime = newTime_s;
  });

  /* -- 創建歌單 -- */
  function createplayerAudioList() {
    var player_li, player_div_songCover, player_listplay, player_listSongInfo, listSongInfo_n, player_total, player_heart, player_clear, player_img, player_h4, player_p, player_text;
    player_li = document.createElement('li');
    player_div_songCover = document.createElement('div');
    player_div_songCover.attr('class', 'songCover');

    player_img = document.createElement('img').attr("src", myPlaylist[xx].cover);
    player_div_songCover.append(player_img);
    player_listplay = document.createElement('div').attr('class', 'listPlay');
    player_div_songCover.append(player_listplay);
    player_img = document.createElement('img').attr("src", './img/library/coverPlay-s.png');
    player_listplay.append(player_img);


    player_listSongInfo = document.createElement('div').attr('class', 'listSongInfo');
    listSongInfo_n = document.createElement('div').attr('class', 'name');
    player_listSongInfo.append(listSongInfo_n);
    player_h4 = document.createElement('h4');
    listSongInfo_n.append(player_h4);
    player_text = document.createTextNode(myPlaylist[xxx].title);
    player_h4.append(player_text);
    player_p = document.createElement('p');
    listSongInfo_n.append(player_p);
    player_text = document.createTextNode(myPlaylist[xxx].creator);
    player_p.append(player_text);

    player_total = document.createElement('div').attr('class', 'totalTime');
    player_text = document.createTextNode(myPlaylist[xxx].totalTime);
    player_total = append(player_text);

    player_heart = document.createElement('div').attr('class', 'heart becomeRed');
    playr_img = document.createElement('img').attr('src', './img/collection/redheart.png');
    player_heart = append(player_img);

    player_clear = document.createElement('div').attr('css', 'clearfix');

    player_li.append(player_div_songCover);
    player_li.append(player_listSongInfo);
    player_li.append(player_total);
    player_li.append(player_heart);
    player_li.append(player_clear);
    $('#player .list ul').append(player_li);
  }

  //清單播放點擊
  $("#player .listPlay").click(function () {
    let selectSong = $(this).parent().siblings(".listSongInfo").find(".name").find("h4").text();
    let titleName = [];

    if ($(this).hasClass('nowlistening')) {
      if (playerAudio.playStatus) {
        $(this).html('<img src="../img/library/coverPlay-s.png">');
        playerAudio.isPlaying(true);
      } else {
        $(this).html('<img src="../img/library/coverPause-s.png">');
        playerAudio.isPlaying(false);
      }
    } else {
      for (let nameNum = 0; nameNum < listLen; nameNum++) {
        titleName.push(myPlaylist[nameNum].title);
      }

      let selectNum = titleName.indexOf(selectSong.toString());
      playerAudio.nowPlaying = selectNum;
      $("#player audio").attr("src", myPlaylist[playerAudio.nowPlaying].filein);
      playerAudio.isPlaying(false);
    }
    playerAudio.listStatus();
  });

});