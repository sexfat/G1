 /* ---------------- 全域變數 ---------------- */
 let getSongName, getNewListName;
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
   getLibrarySongs(nowList);
   myListInfoCha(-1, libraryList.length);

   //more -- changeList
   $('.songs').on('click', '.more', function () {
     $(this).find('.changeList').show();
     $('.more').not(this).find('.changeList').hide();
   });
   $('.songs').on('mouseleave', '.more', function () {
     $(this).find('.changeList').hide();
   });

   //changeList -- 跳窗
   $('.songs').on('click', '.changeList', function () {
     getSongName = $(this).parent().siblings('.listSongInfo').find('.name a').text();
     $('.lightCover').show();
     getLightName();
     $('#libraryMyAllList').show();
   });
   $('.closeLight').click(function () {
     $('.lightCover').hide();
     $('.lightCover').children('div').hide();
   });
   $('.lightCover').click(function () {
     $('.lightCover').hide();
     $(this).children('div').hide();
   });
   $('#libraryMyAllList').click(function (e) {
     e.stopPropagation();
   });
   $('#libraryMyAllList ul').on('click', 'li', function () {
     getNewListName = $(this).text(); //抓清單名字 -- 要把歌新增過去
     $(this).addClass('choose');
     $('#libraryMyAllList li').not(this).removeClass('choose');
   });

   $('#libraryMyAllList>button').click(function () {
     let songind = getSongIndex(getSongName);
     let songNo = libraryList[songind].song_no;
     $('.lightCover').hide();
     $('#libraryMyAllList').hide();
     if (nowList == 'Liked songs') {
       songChangeListA(songNo);
     } else {
       if (nowList == getNewListName) {
         $('.lightCover').show();
         $('#listAlert').show();
         $('#listAlert h4').text('Fail to change!');
       } else {
         songChangeListD(songNo);
       }
     }
   });

   //createBtn -- 跳窗
   $('#createBtn').click(function () {
     $('.lightCover').show();
     $('#createListBox').show();
     $("#createListName").val("");
   });
   $('#createListBox').click(function (e) {
     e.stopPropagation();
   });
   $('#createSubmit').click(function () {
     let createNewLi = $("#createListName").val();
     let xhr = new XMLHttpRequest();
     xhr.onload = function () {
       if (xhr.status == 200) {
         if (xhr.responseText == 'success') {
           buildNewLi(createNewLi);
         } else {
           alert('failure');
         }
       } else {
         alert(xhr.statusText);
       }
     };
     let url = `./php/createNewList.php?createListName=${createNewLi}`;
     xhr.open("get", url, true);
     xhr.send(null);

     $('.lightCover').hide();
     $('#createListBox').hide();
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
       if (nowList == 'Liked songs') {
         $('#library_editCover').attr('disabled', true);
         $('.enterBtn').attr('disabled', true);
         $('#inputListTitle').attr('disabled', true);
       } else {
         $('#library_editCover').attr('disabled', false);
         $('.enterBtn').attr('disabled', false);
         $('#inputListTitle').attr('disabled', false);
       }
     }
   });

   //修改清單姓名
   $('#modifyName').click(function () {
     let modifyName = $("#inputListTitle").val();
     let listind = getListIndex(nowList);
     let plistno = mylistInfo[listind].plist_no;
     let xhr = new XMLHttpRequest();
     xhr.onload = function () {
       if (xhr.status == 200) {
         if (xhr.responseText == 'success') {
           getLibraryList();
           $('#listAlert h4').text('Successfully modified');
         } else {
           $('#listAlert h4').text('Fail to modify');
         }
         $('.lightCover').show();
         $('#listAlert').show();
       } else {
         alert(xhr.statusText);
       }
     };
     let url = `./php/modifyList.php?plistName=${modifyName}&plistNo=${plistno}`;
     xhr.open("get", url, true);
     xhr.send(null);
   });
   $('#listAlert').click(function (e) {
     e.stopPropagation();
   });
   $('#listAlert>button').click(function () {
     $('.lightCover').hide();
     $('#listAlert').hide();
   });

   //修改清單圖片-- 有問題待修
   $('#library_editCover').click(function () {
     let modifyImg = $("#library_editCover").val();
     let listind = getListIndex(nowList);
     let plistno = mylistInfo[listind].plist_no;
     //  let xhr = new XMLHttpRequest();
     //  xhr.onload = function () {
     //    if (xhr.responseText == 'success') {
     //      getLibraryList();
     //      $('#listAlert h4').text('Successfully modified');
     //    } else {
     //      $('#listAlert h4').text('Fail to modify');
     //    }
     //    $('.lightCover').show();
     //    $('#listAlert').show();
     //  };
     //  let url = `./php/modifyListImg.php?listPic=${modifyImg}&plistNo=${plistno}`;
     //  xhr.open("get", url, true);
     //  xhr.send(null);
   });

   //收藏清單控制
   $(".my_list").on('click', '.favor', function () {
     nowList = "Liked songs";
     $(this).addClass('choose');
     $(".lists li").removeClass('choose');
     $('#inputListTitle').val(nowList);
     getLibrarySongs(nowList);
     myListInfoCha(-1, libraryList.length);
     $('#library_editCover').attr('disabled', true);
     $('.enterBtn').attr('disabled', true);
     $('#inputListTitle').attr('disabled', true);
   });

   //點歌單換內容
   $(".lists").on('click', 'li', function () {
     let myListIndex = $(this).index();
     nowList = $(this).find('h4').text();
     $('.lists li').removeClass('choose');
     $(this).addClass('choose');
     $(".favor").removeClass('choose');
     $('#inputListTitle').val(nowList);
     getLibrarySongs(nowList);
     myListInfoCha(myListIndex, libraryList.length);
     $('#library_editCover').attr('disabled', false);
     $('.enterBtn').attr('disabled', false);
     $('#inputListTitle').attr('disabled', false);
   });

   //手機select選歌單
   $("#mobile_listChoose").change(function () {
     let myListIndex = $(this)[0].selectedIndex;
     nowList = $(this).val();
     $('#inputListTitle').val(nowList);
     $('#library_editCover').attr('disabled', false);
     $('.enterBtn').attr('disabled', false);
     $('#inputListTitle').attr('disabled', false);
     getLibrarySongs(nowList);
     myListInfoCha(myListIndex - 1, libraryList.length);
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
     playerListName = nowList;
     phpGetListName = mylistInfo;
     myPlaylist = libraryList;
     console.log(libraryList);
     nowPlaying = 0;
     $('#player audio').attr('src', myPlaylist[nowPlaying].song_addr);
     listLen = myPlaylist.length;
     console.log(listLen);
     audio.currentTime = 0;
     isPlaying(false);
     createPlayerList(libraryList);
     ListTopInfo();
   });
 });

 /* ---------------- load end ---------------- */

 //抓資料庫清單
 function getLibraryList() {
   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
     if (xhr.status == 200) {
       mylistInfo = JSON.parse(xhr.responseText);
       showAllMyList(mylistInfo);
     } else {
       alert(xhr.statusText);
     }
   };
   xhr.open("get", "./php/getListName.php", false);
   xhr.send(null);
 }

 //抓資料庫單一歌單
 function getLibrarySongs(listname) {
   let url;
   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
     if (xhr.status == 200) {
       libraryList = JSON.parse(xhr.responseText);
       showLibrarySongs(libraryList);
     } else {
       alert(xhr.statusText);
     }
   };
   if (listname == 'Liked songs') {
     url = `./php/likedSongsList.php`;
   } else {
     url = `./php/showPlayList.php?plistName=${listname}`;
   }
   xhr.open("get", url, false);
   xhr.send(null);
 }

 //抓清單索引值
 function getListIndex(name) {
   let listName = [];
   for (let i = 0; i < mylistInfo.length; i++) {
     listName.push(mylistInfo[i].plist_name);
   }
   let listind = listName.indexOf(name);
   return listind;
 }

 //抓歌曲索引值
 function getSongIndex(name) {
   let songName = [];
   for (let i = 0; i < libraryList.length; i++) {
     songName.push(libraryList[i].song_name);
   }
   let songind = songName.indexOf(name);
   return songind;
 }

 //換清單內容
 function myListInfoCha(num, listlen) {
   if (num == -1) {
     $(".listInfo .listCover img").attr("src", './img/library/list_pic0.jpg');
     $(".listInfo .name h2").text('Liked songs');
     $(".listInfo #inputListTitle").text('Liked songs');
     $(".listInfo .totalSong").text(`${listlen} songs`);
   } else {
     $(".listInfo .listCover img").attr("src", mylistInfo[num].list_pic);
     $(".listInfo .name h2").text(mylistInfo[num].plist_name);
     $(".listInfo #inputListTitle").text(mylistInfo[num].plist_name);
     $(".listInfo .totalSong").text(`${listlen} songs`);
   }
 };

 function libraryLightListName(ListInfo) {
   let ul, li, text;
   $('#libraryMyAllList ul').children().remove();
   ul = $('#libraryMyAllList ul');
   for (let i = 0; i < ListInfo.length; i++) {
     li = document.createElement('li');
     text = document.createTextNode(ListInfo[i].plist_name);
     li.append(text);
     ul.append(li);
   }
 }

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
     text = document.createTextNode(mylist[j].plist_name);
     optionn.append(text);
     $('#mobile_listChoose').append(optionn);
   }
 };

 //顯示清單歌曲列表
 function showLibrarySongs(songList) {
   let li, divSongPlay, divsongCover, divListPlay, divlistSongInfo, divName, divCreator, divtotal, divheart, divmore, divchangeList, divclear, img, alink, icon, text;
   $('.songs').children().remove();
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
     divlistSongInfo.setAttribute('class', 'listSongInfo');
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
     divlistSongInfo.append(divName);
     divlistSongInfo.append(divCreator);
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
     divmore.setAttribute('class', 'more');
     icon = document.createElement('i');
     icon.setAttribute('class', 'fas fa-ellipsis-h');
     divchangeList = document.createElement('div');
     divchangeList.setAttribute('class', 'changeList');
     text = document.createTextNode('change list');
     divchangeList.append(text);
     divmore.append(icon);
     divmore.append(divchangeList);
     divclear = document.createElement('div');
     divclear.setAttribute('class', 'clearfix');
     li.append(divSongPlay);
     li.append(divlistSongInfo);
     li.append(divtotal);
     li.append(divheart);
     li.append(divmore);
     li.append(divclear);
     $('.songs').append(li);
   }
 }

 function buildNewLi(newli) {
   let li, h4, div, icon, optionn, text;
   li = document.createElement('li');
   h4 = document.createElement('h4');
   text = document.createTextNode(newli);
   h4.append(text);
   li.append(h4);
   div = document.createElement('div');
   div.setAttribute('class', 'delete');
   icon = document.createElement('i');
   icon.setAttribute('class', 'fas fa-times');
   div.append(icon);
   li.append(div);
   $('.my_list .lists').append(li);
   optionn = document.createElement('option');
   optionn.setAttribute('value', newli);
   text = document.createTextNode(newli);
   optionn.append(text);
   $('#mobile_listChoose').append(optionn);
 }

 //歌改變歌單-舊的刪除
 function songChangeListD(songNo) {
   let listOldind = getListIndex(nowList);
   let plistNo = mylistInfo[listOldind].plist_no; //舊的清單
   $('#lightPlistNo').val(plistNo);
   $('#lightSongNo').val(songNo);

   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
     if (xhr.status == 200) {
       if (xhr.responseText == 'success') {
         getLibrarySongs(nowList);
         songChangeListA(songNo);
       } else {
         $('.lightCover').show();
         $('#listAlert').show();
         $('#listAlert h4').text('Fail to change!');
       }
     } else {
       alert(xhr.statusText);
     }
   };
   xhr.open("POST", "./php/songChangeList_d.php", true);
   xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   let data_info = `lightPlistNo=${plistNo}&lightSongNo=${songNo}`;
   xhr.send(data_info);
 }

 //歌改變歌單-新的新增
 function songChangeListA(songNo) {
   let listNewind = getListIndex(getNewListName);
   let plistNo = mylistInfo[listNewind].plist_no;
   $('#lightPlistNo').val(plistNo);
   $('#lightSongNo').val(songNo);
   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
     if (xhr.status == 200) {
       if (xhr.responseText == 'success') {
         getLibrarySongs(nowList);
         $('#listAlert h4').text('Added successfully');
       } else {
         $('#listAlert h4').text('Fail to change!');
       }
       $('.lightCover').show();
       $('#listAlert').show();
     } else {
       alert(xhr.statusText);
     }
   };
   xhr.open("post", "./php/songChangeList_a.php", true);
   xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   let data_info = `lightPlistNo=${plistNo}&lightSongNo=${songNo}`;
   xhr.send(data_info);
 }