 /* ---------------- 全域變數 ---------------- */
 let getSongName, getListName;
 let nowList = 'Liked songs';
 let mylistInfo = []; //清單資訊
 let libraryList = []; //歌曲資訊

 /* ---------------- library TimelineMax ---------------- */
 //  var library_tl = new TimelineMax();

 //  library_tl.fromTo('.before', 2, {
 //    opacity: 0
 //  }, {
 //    opacity: 1
 //  }).fromTo('.after', 2, {
 //    opacity: 0
 //  }, {
 //    opacity: 1
 //  });

 /* ---------------- library load ---------------- */
 window.addEventListener('load', function () {
   //library 初始
   getLibraryList(); //抓左側列表


   //more -- changeList
   $('.songs li').on('click', '.more', function () {
     $(this).find('.changeList').show();
     $('.more').not(this).find('.changeList').hide();
   });
   $('.songs li').on('mouseleave', '.more', function () {
     $(this).find('.changeList').hide();
   });

   //changeList -- 跳窗 -- 未完成
   $('.changeList').click(function () {
     getSongName = $(this).parent().siblings('.listSongInfo').find('.name a').text();
     $('.lightCover').show();
     $('.library_main #myAllList').show();
   });
   $('.closeLight').click(function () {
     $('.lightCover').hide();
     $('.lightCover').children('div').hide();
   });
   $('.lightCover').click(function () {
     $('.lightCover').hide();
     $(this).children('div').hide();
   });
   $('#myAllList').click(function (e) {
     e.stopPropagation();
   });
   $('#myAllList ul').on('click', 'li', function () {
     getListName = $(this).text(); //抓清單名字 -- 要把歌新增過去
     $(this).addClass('choose');
     $('#myAllList li').not(this).removeClass('choose');
   });

   //createBtn -- 跳窗 -- 未完成
   $('#createBtn').click(function () {
     $('.lightCover').show();
     $('#createListBox').show();
     $("#createListName").val("");
   });
   $('#createListBox').click(function (e) {
     e.stopPropagation();
   });
   $('#createSubmit').click(function () {
     let newListName = $("#createListName").val();
     let xhr = new XMLHttpRequest();
     xhr.onload = function () {
       showAllMyList();
     };
     xhr.open("post", "", true);
     xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
     xhr.send(newListName);
   });
   $('#createCancel').click(function (e) {
     e.preventDefault();
     $('.lightCover').hide();
     $('#createListBox').hide();
   });

   //remove favor
   $('.library_main .right .heart').click(function () {
     if ($(this).hasClass('becomeRed')) {
       $(this).html('<img src="./img/collection/grayheart.png">').removeClass('becomeRed');
     } else {
       $(this).html('<img src="./img/collection/redheart.png">').addClass('becomeRed');
     }
   });

   //修改按鈕
   $('#modifyBtn').click(function () {
     if ($('.delete').css('display') != 'none') {
       $('.delete').hide();
       $('.editBtn').hide();
       $('.enterBtn').hide();
       $('#inputListTitle').hide();
       $('.listName').find('.name').find('h2').show();
     } else {
       $('.delete').show();
       $('.editBtn').show();
       $('.enterBtn').show();
       $('#inputListTitle').show();
       $('#inputListTitle').val(nowList);
       $('.listName').find('.name').find('h2').hide();
     }
   });

   //收藏清單控制
   $(".my_list").on('click', '.favor', function () {
     $(".library_main .right ul").removeClass("chooseList");
     $(".library_main .right ul:nth-of-type(1)").addClass("chooseList");
     myListInfoCha(-1);
     nowList = "Liked songs";
     $('#inputListTitle').val(nowList);
   });

   //點歌單換內容
   $(".lists").on('click', 'li', function () {
     let myListIndex = $(this).index();
     let myListLen = $(this).length;
     nowList = $(this).find('h4').text();
     $('#inputListTitle').val(nowList);
     $(`.library_main .right ul:nth-of-type(${myListIndex+2})`).addClass("chooseList");
     $(".library_main .right ul:nth-of-type(1)").removeClass("chooseList");
     $(".library_main .right ul").not(`.library_main .right ul:nth-of-type(${myListIndex+2})`).removeClass(
       "chooseList");
     myListInfoCha(myListIndex);
   });

   //手機select選歌單
   $("#mobile_listChoose").change(function () {
     var myListIndex = $(this)[0].selectedIndex;
     if (myListIndex != 0) {
       $(`.library_main .right ul:nth-of-type(${myListIndex+1})`).addClass("chooseList");
       $(".library_main .right ul:nth-of-type(1)").removeClass("chooseList");
       $(".library_main .right ul").not(`.library_main .right ul:nth-of-type(${myListIndex+1})`).removeClass(
         "chooseList");
       myListInfoCha(myListIndex);
     };
   });

   //刪除清單 -- 未完成
   $('.list .delete').click(function () {});

   //清單歌曲撥放
   $(".songs").on('click', '.listPlay', function () {
     nowPlaying = $(this).parent().parent().parent().index()
     $(".songs .listPlay").not(this).removeClass("nowlistening").html('<img src="./img/library/coverPlay-s.png">');
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
       $(this).html('<img src="./img/library/coverPause-s.png">');
       isPlaying(false);
       $(this).addClass("nowlistening");
     }
   });

   //ALL PLAY BTN
   $("#listAllPlay").click(function () {
     var listIndex = $('.songs.chooseList').index();
     $(`#player #myAllList li:nth-of-type(${listIndex})`).addClass("choose");
     $(`#player .right ul:nth-of-type(${listIndex})`).addClass("chooseList");
     nowPlaying = 0;
     isPlaying(false);
     audio.currentTime = 0;
   });
 });

 //修改清單名 -- submitBtn -- 未完成
 $('.enterBtn').click(function () {
   var listTitleBox = $('#inputListTitle').val();
 });

 /* ---------------- load end ---------------- */

 //抓資料庫清單
 function getLibraryList() {
   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
     mylistInfo = JSON.parse(xhr.responseText);
     showAllMyList(mylistInfo);
   };
   xhr.open("get", "./php/getListName.php", true);
   xhr.send(null);
 }

 //換清單內容
 function myListInfoCha(num) {
   if (num == -1) {
     $(".listInfo .listCover img").attr("src", './img/library/list_pic0.jpg');
     $(".listInfo .name h2").text('Liked songs');
     $(".listInfo #inputListTitle").text('Liked songs');
     $(".listInfo .totalSong").text(`${libraryList.length} songs`);
   } else {
     $(".listInfo .listCover img").attr("src", mylistInfo[num].list_pic);
     $(".listInfo .name h2").text(mylistInfo[num].plist_name);
     $(".listInfo #inputListTitle").text(mylistInfo[num].plist_name);
     $(".listInfo .totalSong").text(`${libraryList.length} songs`);
   }
 };

 //顯示所有清單列表
 function showAllMyList(mylist) {
   let li, h4, div, icon, optionn, text;
   $('.my_list .lists').children().remove();
   $('#mobile_listChoose').children().remove();
   for (let i = 0; i < mylist.length; i++) {
     li = document.createElement('li');
     h4 = document.createElement('h4');
     text = document.createTextNode(mylist[i].plist_name);
     h4.append(text);
     li.append(h4);
     div = document.createElement('div');
     div.setAttribute('class', 'delete');
     icon = document.createElement('i');
     icon.setAttribute('class', 'fas fa-times');
     div.append(icon);
     li.append(div);
     $('.my_list .lists').append(li);
   }
   optionn = document.createElement('option');
   optionn.setAttribute('disabled', 'disabled');
   optionn.setAttribute('selected', 'selected');
   text = document.createTextNode('-- choose --');
   optionn.append(text);
   $('#mobile_listChoose').append(optionn);
   for (let j = 0; j < mylist.length; j++) {
     optionn = document.createElement('option');
     optionn.setAttribute('value', mylist[j].plist_name);
     optionn.append(text);
     $('#mobile_listChoose').append(optionn);
   }


   //顯示清單歌曲列表
   function showLibrarySongs(songList) {
     let li, divSongPlay, divsongCover, divListPlay, divlistSongInfo, divName, divCreator, divtotal, divheart, divmore, divchangeList, divclear, img, alink, icon, text;
     for (let i = 0; i < songList.length; i++) {
       li = document.createElement('li');
       divSongPlay = document.createElement('div');
       divSongPlay.setAttribute('class', 'songPlay');
       divsongCover = document.createElement('div');
       divsongCover.setAttribute('class', 'songCover');
       img = document.createElement('img');
       img.setAttribute('src', songList[i].song_pic);
       divsongCover.append(img);
       divListPlay = document.createElement('div');
       divListPlay.setAttribute('class', 'listPlay');
       img = document.createElement('img');
       img.setAttribute('src', './img/library/coverPlay-s.png');
       divListPlay.append(img);
       divsongCover.append(divListPlay);
       divSongPlay.append(divsongCover); //
       divlistSongInfo = document.createElement('div');
       divlistSongInfo.setAttribute('src', 'listSongInfo');
       divName = document.createElement('div');
       divName.setAttribute('class', 'name');
       alink = document.createElement('a');
       alink.setAttribute('href', './songinfo.html');
       text = document.createTextNode(songList[i].song_name);
       alink.append(text);
       divName.append(alink);
       divCreator = document.createElement('div');
       divCreator.setAttribute('class', 'creator');
       text = document.createTextNode(songList[i].mem_name);
       divCreator.append(text);
       divlistSongInfo.append(divName).append(divCreator);
       divtotal = document.createElement('div');
       divtotal.setAttribute('class', 'totalTime');
       text = document.createTextNode(songList[i].totaltime);
       divtotal.append(text);
       divheart = document.createElement('div');
       divheart.setAttribute('class', 'heart becomeRed');
       img = document.createElement('img');
       img.setAttribute('src', './img/collection/redheart.png');
       divheart.append(img);
       divmore = document.createElement('div');
       icon = document.createElement('i');
       icon.setAttribute('class', 'fas fa-ellipsis-h');
       divchangeList = document.createElement('div');
       divchangeList.setAttribute('class', 'changeList');
       text = document.createTextNode('change list');
       divchangeList.append(text);
       divmore.append(icon).append(divchangeList);
       divclear = document.createElement('div');
       divclear.setAttribute('class', 'clearfix');
       li.append(divSongPlay).append(divlistSongInfo), append(divtotal).append(divheart).append(divmore).append(divclear);
       $('.songs').append(li);
     }
   }
 };