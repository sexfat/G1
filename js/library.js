 /* ---------------- 全域變數 ---------------- */
 let getSongName, getListName;
 let nowList = 'Liked songs';
 let mylistInfo = [{
   listName: "Liked songs",
   listImg: "./img/library/list_pic0.jpg",
   listTotal: "8 songs",
 }, {
   listName: "Peaceful songs",
   listImg: "./img/library/list_pic1.jpg",
   listTotal: "3 songs",
 }, {
   listName: "Party",
   listImg: "./img/library/list_pic2.jpg",
   listTotal: "4 songs",
 }, {
   listName: "Who cares",
   listImg: "./img/library/list_pic3.jpg",
   listTotal: "5 songs",
 }, ];
 let libraryList = [{
     title: "Lucid Dreamer",
     creator: "Spazz Cardigan",
     cover: "./img/collection/album1.jpg",
     filein: "./music/Lucid_Dreamer.mp3",
     totalTime: "3:11",
   },
   {
     title: "Spring In My Step",
     creator: "Silent Partner",
     cover: "./img/collection/album2.jpg",
     filein: "./music/Spring_In_My_Step.mp3",
     totalTime: "1:59",
   },
   {
     title: "On My Way Home",
     creator: "The 126ers",
     cover: "./img/collection/album3.jpg",
     filein: "./music/On_My_Way_Home.mp3",
     totalTime: "1:56",
   }
 ];

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
   //more -- changeList
   $('.more').click(function () {
     $(this).find('.changeList').show();
     $('.more').not(this).find('.changeList').hide();
   });
   $('.more').mouseleave(function () {
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
   $('#myAllList li').click(function () {
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
       $(this).parent().remove();
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
   $(".my_list .favor").click(function () {
     $(".library_main .right ul").removeClass("chooseList");
     $(".library_main .right ul:nth-of-type(1)").addClass("chooseList");
     myListInfoCha(0);
     nowList = "Liked songs";
     $('#inputListTitle').val(nowList);
   });

   //點歌單換內容
   $(".lists li").click(function () {
     var myListIndex = $(this).index();
     var myListLen = $(this).length;
     nowList = $(this).find('h4').text();
     $('#inputListTitle').val(nowList);
     $(`.library_main .right ul:nth-of-type(${myListIndex+2})`).addClass("chooseList");
     $(".library_main .right ul:nth-of-type(1)").removeClass("chooseList");
     $(".library_main .right ul").not(`.library_main .right ul:nth-of-type(${myListIndex+2})`).removeClass(
       "chooseList");
     myListInfoCha(myListIndex + 1);
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
   $(".songs .listPlay").click(function () {
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
       $("#player audio").attr("src", myPlaylist[nowPlaying].filein);
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

 //修改清單名 -- enterBtn -- 未完成
 $('.enterBtn').click(function () {
   var listTitleBox = $('#inputListTitle').val();
 });

 /* ---------------- load end ---------------- */

 //換清單內容
 function myListInfoCha(num) {
   $(".listInfo .listCover img").attr("src", mylistInfo[num].listImg);
   $(".listInfo .name h2").text(mylistInfo[num].listName);
   $(".listInfo #inputListTitle").text(mylistInfo[num].listName);
   $(".listInfo .totalSong").text(mylistInfo[num].listTotal);
 };

 //顯示所有清單列表 -- 未完成
 function showAllMyList() {

 };