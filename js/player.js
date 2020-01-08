 /* ---------------- 全域變數 ---------------- */
 var audio = $("#player audio")[0]; //撥放器
 let vol_s, vol_b, vol_drag = false,
   songTime,
   playStatus = true,
   nowPlaying = 0, //現在播放的歌
   myPlaylist = phpGetListName = [],
   playerListName,
   listLen = myPlaylist.length;


 /* ---------------- player load ---------------- */
 window.addEventListener('load', function () {
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

   //selectbtn -- 跳燈箱
   $('#player .selectBtn').click(function () {
     $('#player .lightCover').show();
     $('#player #myAllList').show();
     getLightName();
   });
   $('#player #myAllList').click(function (e) {
     e.stopPropagation();
   });

   //歌單清單
   $('.closeLight').click(function () {
     $('.lightCover').hide();
     $('#player #myAllList').hide();
   });


   //點愛心
   $(document).on('click', '.heart', function () {
     let songName = $(this).siblings('.listSongInfo').find('.name h4').text();
     if ($(this).hasClass('becomeRed')) {
       $(this).html('<img src="./img/collection/grayheart.png">').removeClass('becomeRed');

     } else {
       $(this).html('<img src="./img/collection/redheart.png">').addClass('becomeRed');
     }
   });

   //點歌單撥放，左側專輯唱片動畫
   $(document).on('mouseover', '.songCover', function () {
     $(this).find('.listPlay').show();
   });
   $(document).on('mouseout', '.songCover', function () {
     $(this).find('.listPlay').hide();
   });

   //選擇播放歌單
   $('#myAllList ul').on('click', 'li', function () {
     playerListName = $(this).text();
     $(this).addClass('choose');
     $('#player #myAllList li').not(this).removeClass('choose');
     $('#player .list ul').addClass('chooseList');
     $('#plistName').val(playerListName);
   });

   $('#myAllList #mylistOK').click(function () {
     if (playerListName == undefined) {
       myPlaylist = myPlaylist;
     } else {
       isPlaying(true);
       if (playerListName == 'Liked songs') {
         getLikedList();
       } else {
         getOtherPlayList();
       }
       nowPlaying = 0;
       audio.currentTime = 0;
       $("#player audio").attr("src", myPlaylist[nowPlaying].song_addr);
       $("#player .songInfo .name").text(myPlaylist[nowPlaying].song_name);
       $("#player .songInfo .creator").text(myPlaylist[nowPlaying].mem_name);
       $("#player .info img").not(".coverRec img").not(".heart img").attr("src", myPlaylist[nowPlaying].song_pic);
     }
     ListTopInfo();
     $('.lightCover').hide();
     $('#player #myAllList').hide();
   });

   /* ---------------- 音樂播放器 ---------------- */

   playerInit();

   //播放暫停按鈕 -- 音樂撥放/暫停
   $("#player .play").click(function () {
     isPlaying(playStatus);
   });

   //下一首按鈕 -- 切換下一首
   $("#player .next").click(function () {
     if (nowPlaying == listLen - 1) {
       nowPlaying = listLen - 1;
     } else {
       nowPlaying++;
     }
     $("#player audio").attr("src", myPlaylist[nowPlaying].song_addr);
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
       nowPlaying = 0;
     } else {
       nowPlaying--;
     }
     $("#player audio").attr("src", myPlaylist[nowPlaying].song_addr);
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
     $(".songs .listPlay").removeClass('nowlistening');
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

   //隨機播放 -- 清單隨機
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
   $("#player .volicon").click(function () {
     if (audio.muted) {
       audio.muted = false;
       $(".player_s .volicon i").css('color', 'white');
       $(".player_b .volicon i").css('color', '#333');
       $(".volLine .volControl").css('background-color', '#f1c40f');
     } else {
       audio.muted = true;
       $(this).find('i').css('color', '#f1c40f');
       $(".volLine .volControl").css('background-color', 'white');
     }
   });
   $(".volLine").mousedown(function () {
     vol_drag = true;
   });
   $(document).mouseup(function (e) {
     if (vol_drag) {
       volPos(e.pageX);
     }
     vol_drag = false;
   });

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

   //清單播放點擊
   $('#player').on('click', ".listPlay", function () {
     nowPlaying = $(this).parent().parent().index();
     $("#player .listPlay").not(this).removeClass("nowlistening").html('<img src="./img/library/coverPlay-s.png">');
     if ($(this).hasClass('nowlistening')) {
       if (playStatus) {
         $(this).html('<img src="./img/library/coverPlay-s.png">');
         isPlaying(true);
       } else {
         $(this).html('<img src="./img/library/coverPause-s.png">');
         isPlaying(false);
       }
     } else {
       $("#player audio").attr("src", myPlaylist[nowPlaying].song_addr);
       audio.load();
       $(this).html('<img src="./img/library/coverPause-s.png">');
       isPlaying(false);
       $(this).addClass("nowlistening");
     }
     listStatus();
   });
 });
 /* ---------------- load end ---------------- */

 //初始化
 function playerInit() {
   audio.volume = 0.5;
   getLikedList(); //待改-----這裡要改要判斷哪個清單
   isLocalHave();
 }

 //取得Light -- ListName
 function getLightName() {
   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
     if (xhr.status == 200) {
       phpGetListName = JSON.parse(xhr.responseText);
       mylistInfo = phpGetListName;
       lightListName(phpGetListName);
       showAllMyList(mylistInfo);
       libraryLightListName(phpGetListName);
     } else {
       alert(xhr.statusText);
     }
   };
   xhr.open("get", "./php/getListName.php", true);
   xhr.send(null);
 }
 //取得Liked Songs
 function getLikedList() {
   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
     if (xhr.status == 200) {
       console.log(xhr.responseText);
       myPlaylist = JSON.parse(xhr.responseText);
       listLen = myPlaylist.length;
       createPlayerList(myPlaylist);
     } else {
       alert(xhr.statusText);
     }
   };
   xhr.open("get", "./php/likedSongsList.php", false);
   xhr.send(null);
 }

 //取得歌單列表 -- 
 function getOtherPlayList() {
   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
     if (xhr.status == 200) {
       myPlaylist = JSON.parse(xhr.responseText);
       listLen = myPlaylist.length;
       createPlayerList(myPlaylist);
       console.log(myPlaylist);
     } else {
       alert(xhr.statusText);
     }
   };
   let url = `./php/showPlayList.php?plistName=${playerListName}`;
   xhr.open("GET", url, false);
   xhr.send(null);
 }
 //歌單資訊
 function ListTopInfo() {
   let listIndex = getListIndex(playerListName);
   if (listIndex == -1) {
     $('.player_b .listCover img').attr('src', './img/library/list_pic0.jpg');
     $('.player_b .listName h2').text('Liked songs');
   } else {
     $('.player_b .listCover img').attr('src', phpGetListName[listIndex].list_pic);
     $('.player_b .listName h2').text(playerListName);
   }
   $('.player_b .listName span').text(`${listLen} songs`);
 }

 //創建歌單
 function createPlayerList(songlistbuild) {
   $('#player .list ul').text("");
   if (songlistbuild != "{}") {
     let li, div_songCover, listplay, listSongInfo, listSongInfo_n, total, heart, clear, img, h4, p, text;
     for (let i = 0; i < songlistbuild.length; i++) {
       li = document.createElement('li');
       div_songCover = document.createElement('div');
       div_songCover.setAttribute('class', 'songCover');

       img = document.createElement('img');
       img.setAttribute("src", songlistbuild[i].song_pic);
       div_songCover.append(img);
       listplay = document.createElement('div');
       listplay.setAttribute('class', 'listPlay');
       div_songCover.append(listplay);
       img = document.createElement('img');
       img.setAttribute("src", './img/library/coverPlay-s.png');
       listplay.append(img);

       listSongInfo = document.createElement('div');
       listSongInfo.setAttribute('class', 'listSongInfo');
       listSongInfo_n = document.createElement('div');
       listSongInfo_n.setAttribute('class', 'name');
       listSongInfo.append(listSongInfo_n);
       h4 = document.createElement('h4');
       listSongInfo_n.append(h4);
       text = document.createTextNode(songlistbuild[i].song_name);
       h4.append(text);
       p = document.createElement('p');
       listSongInfo_n.append(p);
       text = document.createTextNode(songlistbuild[i].mem_name);
       p.append(text);

       total = document.createElement('div')
       total.setAttribute('class', 'totalTime');
       text = document.createTextNode(songlistbuild[i].totaltime);
       total.append(text);

       heart = document.createElement('div');
       heart.setAttribute('class', 'heart becomeRed');
       img = document.createElement('img');
       img.setAttribute('src', './img/collection/redheart.png');
       heart.append(img);

       clear = document.createElement('div');
       clear.setAttribute('class', 'clearfix');

       li.append(div_songCover);
       li.append(listSongInfo);
       li.append(total);
       li.append(heart);
       li.append(clear);
       $('#player .list ul').append(li);
     }
   } else {
     li = document.createElement('li');
     li.setAttribute('style', 'text-align:center');
     text = document.createTextNode('No songs');
     li.append(text);
     $('#player .list ul').append(li);
   }
 }

 //build lightbox -- allmylist
 function lightListName(ListInfo) {
   let ul, li, text;
   $('#myAllList ul').children().remove();
   ul = $('#myAllList ul');
   li = document.createElement('li');
   text = document.createTextNode('Liked songs');
   li.setAttribute('class', 'chooseList');
   li.append(text);
   ul.append(li);
   for (let i = 0; i < ListInfo.length; i++) {
     li = document.createElement('li');
     text = document.createTextNode(ListInfo[i].plist_name);
     li.append(text);
     ul.append(li);
   }
 }

 //localstorage
 function isLocalHave() {
   if (localStorage.length != 0) {
     nowPlaying = localStorage["nowPlaying"];
     audio.currentTime = localStorage['songTime'];
   } else {
     nowPlaying = 0;
   }
   if (localStorage["playStatus"] == "true") {
     playStatus = false;
     $('#player audio').attr("autoplay", true);
   } else {
     $('#player audio').attr("autoplay", false);
     playStatus = true;
   }
   $('#player audio').attr("src", myPlaylist[nowPlaying].song_addr);
   audio.load();
   isPlaying(playStatus);
   setInterval(progressingShow, 100);
   listStatus();
 }

 //播放狀態控制 -- 如果沒有播放就讓他撥
 function isPlaying(isPlaying) {
   if (!isPlaying) {
     playAudio();
     $("#player .play").html('<i class="fas fa-pause"></i>');
     $(".listPlay.nowlistening").html('<img src="./img/library/coverPause-s.png">');
     $("#player .player_b .coverRec").animate({
       right: "-50%",
       opacity: "1"
     }, "fast", "swing").addClass("recRotate");
     playStatus = true;
     listStatus();
   } else {
     audio.pause();
     $("#player .play").html('<i class="fas fa-play"></i>');
     $(".listPlay.nowlistening").html('<img src="./img/library/coverPlay-s.png">');
     playStatus = false;
     listStatus();
     $("#player .player_b .coverRec").animate({
       right: "0%"
     }).removeClass("recRotate");
   }
   $("#player .songInfo .name").text(myPlaylist[nowPlaying].song_name);
   $("#player .songInfo .creator").text(myPlaylist[nowPlaying].mem_name);
   $("#player .info img").not(".coverRec img").not(".heart img").attr("src", myPlaylist[nowPlaying].song_pic);
 }

 //播放
 function playAudio() {
   audio.play();
 }

 //進度條 -- timer
 function progressingShow() {
   songTime = audio.currentTime;
   //存進localstorage
   localStorage.setItem("nowPlaying", nowPlaying);
   localStorage.setItem("songTime", songTime);
   localStorage.setItem("playStatus", playStatus);

   let progressColor = (songTime / audio.duration) * 100;
   if (audio.ended) {
     autoChange(true);
   }
   // console.log(audio.duration); //歌曲總長秒數
   $("#player .progress").css("width", `${progressColor.toFixed(2)}%`);
   $("#player span.start").text(`${parseInt(songTime / 60)}:${parseInt(songTime % 60)}`)
   $("#player span.end").text(myPlaylist[nowPlaying].totaltime);
   //順便同步音量
   $(".player_b .volLine .volControl").css('width', `${parseInt(audio.volume*100)}%`);
   $(".player_s .volLine .volControl").css('width', `${parseInt(audio.volume*100)}%`);
 }

 //自動換下一首
 function autoChange(autoStatus) {
   if (autoStatus) {
     //隨機撥放
     if ($("#player .rand").hasClass("becomeYel")) {
       let randNum = parseInt(Math.random() * (listLen));
       nowPlaying = randNum;
       $("#player audio").attr("src", myPlaylist[nowPlaying].song_addr);
       audio.load();
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
           $("#player audio").attr("src", myPlaylist[nowPlaying].song_addr);
           audio.load();
           isPlaying(false);
           listStatus();
         }
       }
     }
   }
 }

 //清單播放狀態
 function listStatus() {
   $(`.player_b .listPlay`).removeClass("nowlistening");
   $(`.player_b li:nth-of-type(${nowPlaying+1}) .listPlay`).addClass("nowlistening");
   if (playStatus) {
     $(`.player_b li:nth-of-type(${nowPlaying+1}) .listPlay`).html('<img src="./img/library/coverPause-s.png">');
   } else {
     $(`.player_b li:nth-of-type(${nowPlaying+1}) .listPlay`).html('<img src="./img/library/coverPlay-s.png">');
   }
 }

 //音量控制
 function volPos(mousePos) {
   let vol_bwidth = $(".player_b .volLine").width();
   if ($("#player .player_b").hasClass("open")) {
     vol_b = mousePos - $(".player_b .volLine").offset().left;
     vol_b = parseInt((vol_b / 100) * 100);
     if (vol_bwidth == 100) {
       $(".player_b .volicon i").css('color', '#333');
       vol_b = parseInt((vol_b / 100) * 100);
       if (vol_b < 0) {
         vol_b = 0;
         $(".player_b .volicon i").css('color', '#f1c40f');
       } else if (vol_b > 100) {
         $(".player_b .volicon i").css('color', '#333');
         vol_b = 100;
       }
       audio.volume = vol_b / 100;
       $(".player_b .volLine .volControl").css('width', `${vol_b}%`);
     } else {
       vol_s = parseInt((vol_s / vol_bwidth) * 100);
       $(".player_b .volicon i").css('color', '#333');
       vol_b = parseInt((vol_b / vol_bwidth) * 100);
       if (vol_b < 0) {
         vol_b = 0;
         $(".player_b .volicon i").css('color', '#f1c40f');
       } else if (vol_b > 100) {
         $(".player_b .volicon i").css('color', '#333');
         vol_b = 100;
       }
       audio.volume = vol_b / 100;
       $(".player_b .volLine .volControl").css('width', `${vol_b}%`);
     }
   } else {
     vol_s = mousePos - $(".player_s .volLine").offset().left;
     vol_s = parseInt((vol_s / 100) * 100);
     $(".player_s .volicon i").css('color', 'white');
     if (vol_s < 0) {
       vol_s = 0;
       $(".player_s .volicon i").css('color', '#f1c40f');
     } else if (vol_s > 100) {
       $(".player_s .volicon i").css('color', 'white');
       vol_s = 100;
     }
     audio.volume = vol_s / 100;
     $(".player_s .volLine .volControl").css('width', `${vol_s}%`);
   }
 }