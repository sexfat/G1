 /* ---------------- 全域變數 ---------------- */
 let getSongName, getNewListName, libraryFileData;
 let nowList = 'Liked songs';
 let mylistInfo = []; //清單資訊
 let libraryList = []; //歌曲資訊

 /* ---------------- library load ---------------- */
 window.addEventListener('load', function () {
   let xhr = new XMLHttpRequest();
   xhr.onload = () => {
     member = JSON.parse(xhr.responseText);
     if (member.mem_acct) {
       vm.mem_login = true;
     } else {
       vm.mem_login = false;
     }
   }
   xhr.open("get", "./phps/getLoginInfo.php", false);
   xhr.send(null);

   //library 初始
   getLibraryList(); //抓左側列表
   if (!member['mem_no']) {
     showLibrarySongs('no');
     $('#modifyBtn').hide();
     $('#createBtn').hide();
   } else {
     getLibrarySongs(nowList);
     $('#modifyBtn').show();
     $('#createBtn').show();
   }
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
     getLibraryLightName();
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
     getNewListName = $(this).text();
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
           getLibraryList();
         } else {
           alert('failure');
         }
       } else {
         alert(xhr.statusText);
       }
     };
     let url = `./phps/createNewList.php`;
     xhr.open("POST", url, true);
     xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
     let data_info = `createListName=${createNewLi}`;
     xhr.send(data_info);

     $('.lightCover').hide();
     $('#createListBox').hide();
   });
   $('#createCancel').click(function (e) {
     e.preventDefault();
     $('.lightCover').hide();
     $('#createListBox').hide();
   });

   //remove favor
   $('.library_main .right').on('click', '.heart', function () {
     let heartSong = $(this).siblings('.listSongInfo').find('.name a').text();
     let libraryInd = getSongIndex(heartSong);
     let favSongInd = libraryList[libraryInd].song_no;
     if (!member['mem_no']) {
       $('.lightCover').show();
       $('#listAlert').show();
       $('#listAlert h4').text('Please login!');
     } else {
       if ($(this).hasClass('becomeRed')) {
         $('#favorStatus').val('gray');
         $(this).html('<img src="./img/collection/grayheart.png">').removeClass('becomeRed');
       } else {
         $('#favorStatus').val('red');
         $(this).html('<img src="./img/collection/redheart.png">').addClass('becomeRed');
       }
       favorStatus(favSongInd);
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



   //修改清單姓名 -- 要修改
   $('#modifyName').click(function () {
     let modifyName = $("#inputListTitle").val();
     let listind = getListIndex(nowList);
     let plistno = mylistInfo[listind].plist_no;
     $('#inputListNo').val(plistno);
     let pointPos = libraryFileData.name.lastIndexOf('.');
     let fileType = libraryFileData.name.substr(pointPos + 1, 3);
     let coverFileData
     if (fileType == "jpg" || fileType == "png" || fileType == "gif") {
       coverFileData = './img/library/' + libraryFileData.name;
     } else {
       coverFileData = "";
     }
     $('#listPic').val(coverFileData);
     if (modifyName != "" && coverFileData != "") {
       let xhr = new XMLHttpRequest();
       xhr.onload = function () {
         if (xhr.status == 200) {
           if (xhr.responseText == 'success') {
             getLibraryList();
             myListInfoCha(listind, libraryList.length);
             $('.delete').hide();
             $('.editBtn').hide();
             $('.enterBtn').hide();
             $('#inputListTitle').hide();
             $('.listName').find('.name').find('h2').show();
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
       let url = `./phps/modifyList.php`;
       xhr.open("POST", url, true);
       xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
       let data_info = `plistName=${modifyName}&plistNo=${plistno}&listPic=${coverFileData}`;
       xhr.send(data_info);
     } else {
       alert('Please enter correct information!')
     }
   });
   $('#listAlert').click(function (e) {
     e.stopPropagation();
   });
   $('#listAlert>button').click(function () {
     $('.lightCover').hide();
     $('#listAlert').hide();
   });

   //修改清單圖片
   $('#library_editCover').change(function (e) {
     libraryFileData = e.target.files[0];
     let reader = new FileReader();
     reader.onload = function () {
       $('.listCover img').attr('src', reader.result);
     }
     reader.readAsDataURL(libraryFileData);
     let pointPos = libraryFileData.name.lastIndexOf('.');
     let fileType = libraryFileData.name.substr(pointPos + 1, 3);
     if (fileType != "jpg" && fileType != "png" && fileType != "gif") {
       alert('Please choose a picture!');
     }
   });

   //收藏清單控制
   $(".my_list").on('click', '.favor', function () {
     nowList = "Liked songs";
     $(this).addClass('choose');
     $(".lists li").removeClass('choose');
     $('#inputListTitle').val(nowList);
     if (member['mem_no']) {
       getLibrarySongs(nowList);
     } else {
       showLibrarySongs('no');
     }
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

   //手機選歌單
   $(".mobile_listChoose").click(function () {
     if ($(this).hasClass('open')) {
       $('.lists').animate({
         height: '0px',
       }, 500);
       $(this).removeClass('open');
     } else {
       let hei = $('.lists li').height();
       let len = $('.lists li').length + 1;
       $('.lists').animate({
         height: (hei * len + 30) + 'px',
       }, 500);
       $(this).addClass('open');
     }
   });

   //刪除清單
   $('.lists').on('click', '.delete', function () {
     let delName = $(this).siblings('h4').text();
     let delListNo = getListIndex(delName);
     $('#inputListNo').val(mylistInfo[delListNo].plist_no);
     let xhr = new XMLHttpRequest();
     xhr.onload = function () {
       if (xhr.status == 200) {
         if (xhr.responseText == 'success') {
           getLibraryList();
           getLibrarySongs('Liked songs');
           myListInfoCha();
           $('.delete').hide();
           $('.editBtn').hide();
           $('.enterBtn').hide();
           $('#inputListTitle').hide();
           $('.listName').find('.name').find('h2').show();
           $('#listAlert h4').text('Success to delete!'); 
           $('.lightCover').show();
           $('#listAlert').show();
         } else {
           alert(xhr.responseText);
         }
       } else {
         alert(xhr.statusText);
       }
     };
     xhr.open("POST", "./phps/deleteList.php", true);
     xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
     let data_info = `plistNo=${mylistInfo[delListNo].plist_no}`;
     xhr.send(data_info);
   });

   //清單歌曲撥放 -- 裡面的播放icon待修正
   $(".songs").on('click', '.listPlay', function () {
     nowPlaying = $(this).parent().parent().parent().index();
     playerListName = $('.name h2').text();
     myPlaylist = libraryList;
     listLen = myPlaylist.length;
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
     playerAuto = false;
     createPlayerList(myPlaylist);
     ListTopInfo();
   });

   //ALL PLAY BTN
   $("#listAllPlay").click(function () {
     playerListName = nowList;
     phpGetListName = mylistInfo;
     myPlaylist = libraryList;
     nowPlaying = 0;
     $('#player audio').attr('src', myPlaylist[nowPlaying].song_addr);
     listLen = myPlaylist.length;
     audio.currentTime = 0;
     isPlaying(false);
     createPlayerList(libraryList);
     ListTopInfo();
     listStatus();
   });
 });

 /* ---------------- load end ---------------- */

 //抓資料庫清單
 function getLibraryList() {
   if (member['mem_no']) {
     let xhr = new XMLHttpRequest();
     xhr.onload = function () {
       if (xhr.status == 200) {
         mylistInfo = JSON.parse(xhr.responseText);
         showAllMyList(mylistInfo);
       } else {
         alert(xhr.statusText);
       }
     };
     xhr.open("get", "./phps/getListName.php", false);
     xhr.send(null);
   } else {
     mylistInfo = JSON.parse('[{"plist_name":"Total songs","list_pic":"./img/library/list_pic_no.jpg"}]');
     showAllMyList(mylistInfo);
   }
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
   if (!member['mem_no']) {
     url = `./phps/allSongs.php`;
   } else {
     if (listname == 'Liked songs') {
       url = `./phps/likedSongsList.php`;
     } else {
       url = `./phps/showPlayList.php?plistName=${listname}`;
     }
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
 function myListInfoCha(num = -1, listlen = 0) {
   if (num == -1) {
     $(".listInfo .listCover img").attr("src", './img/library/list_pic0.jpg');
     $(".listInfo .name h2").text('Liked songs');
     $(".listInfo #inputListTitle").text('Liked songs');
     if (member['mem_no']) {
       $(".listInfo .totalSong").text(`${listlen} songs`);
     } else {
       $(".listInfo .totalSong").text(`0 songs`);
     }

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
   $('.my_list .lists').children().remove();
   //  $('#mobile_listChoose').children().remove();
   for (let i = 0; i < mylist.length; i++) {
     $('.my_list .lists').append(`<li>
     <h4>${mylist[i].plist_name}</h4>
     <div class="delete"><i class="fas fa-times"></i></div>
   </li>`);
   }
 };

 //顯示清單歌曲列表
 function showLibrarySongs(songList = libraryList) {
   $('.songs').children().remove();
   if (songList == 'no') {
     $('.songs').append(`<li style="color:#aaa;text-align:center">Please login !</li>`);
   } else {
     if (songList.length == '') {
       $('.songs').append(`<li style="color:#aaa;text-align:center">No songs</li>`);
     } else {
       if (member['mem_no']) {
         for (let i = 0; i < songList.length; i++) {
           $('.songs').append(`<li>
         <div class="songPlay">
           <div class="songCover">
             <img src="${songList[i].song_pic}" alt="">
             <div class="listPlay"><img src="./img/library/coverPlay-s.png"></div>
           </div>
         </div>
         <div class="listSongInfo">
           <div class="name">
             <a href="./songinfo.html?song_no=${songList[i].song_no}">${songList[i].song_name}</a>
           </div>
           <div class="creator">${songList[i].mem_name}</div>
         </div>
         <div class="heart becomeRed"><img src="./img/collection/redheart.png"></div>
         <div class="more">
           <i class="fas fa-ellipsis-h"></i>
           <div class="changeList">change list</div>
         </div>
         <div class="clearfix"></div>
       </li>`);
         }
       } else {
         for (let i = 0; i < songList.length; i++) {
           $('.songs').append(`<li>
         <div class="songPlay">
           <div class="songCover">
             <img src="${songList[i].song_pic}" alt="">
             <div class="listPlay"><img src="./img/library/coverPlay-s.png"></div>
           </div>
         </div>
         <div class="listSongInfo">
           <div class="name">
             <a href="./songinfo.html?song_no=${songList[i].song_no}">${songList[i].song_name}</a>
           </div>
           <div class="creator">${songList[i].mem_name}</div>
         </div>
         <div class="heart"><img src="./img/collection/grayheart.png"></div>
         <div class="clearfix"></div>
       </li>`);
         }
       }
     }
   }
 }

 //歌改變歌單-舊的刪除
 function songChangeListD(songNo) {
   let listOldind = getListIndex(nowList);
   let plistNo = mylistInfo[listOldind].plist_no; //舊的清單
   let listNewind = getListIndex(getNewListName);
   let plistNoN = mylistInfo[listNewind].plist_no; //新的清單
   $('#lightPlistNoA').val(plistNoN);
   $('#lightPlistNo').val(plistNo);
   $('#lightSongNo').val(songNo);
   $('#libraryMsg').val('del');

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
   xhr.open("POST", "./phps/songChangeList.php", true);
   xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   let data_info = `libraryMsg=${$('#libraryMsg').val()}&lightPlistNoA=${plistNoN}&lightPlistNo=${plistNo}&lightSongNo=${songNo}`;
   xhr.send(data_info);
 }

 //歌改變歌單-新的新增
 function songChangeListA(songNo) {
   let listNewind = getListIndex(getNewListName);
   let plistNoN = mylistInfo[listNewind].plist_no;
   $('#lightPlistNoA').val(plistNoN);
   $('#lightSongNo').val(songNo);
   $('#libraryMsg').val('add');

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
   xhr.open("post", "./phps/songChangeList.php", true);
   xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   let data_info = `libraryMsg=${$('#libraryMsg').val()}&lightPlistNoA=${plistNoN}&lightSongNo=${songNo}`;
   xhr.send(data_info);
 }

 //收藏狀態
 function favorStatus(favorSong) {
   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
     if (xhr.status == 200) {
       if (xhr.responseText == 'Asuccess') {
         $('#listAlert h4').text('Success to add');
       } else if (xhr.responseText == 'Dsuccess') {
         $('#listAlert h4').text('Success to cancel');
       } else if (xhr.responseText == 'Afail') {
         $('#listAlert h4').text('Fail to add');
       } else if (xhr.responseText == 'Dfail') {
         $('#listAlert h4').text('Fail to cancel');
       }
       $('.lightCover').show();
       $('#listAlert').show();
       getLibrarySongs(nowList);
     } else {
       alert(xhr.statusText);
     }
   };
   xhr.open("post", "./phps/LibraryHeart.php", true);
   xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   let data_info = `favorStatus=${$('#favorStatus').val()}&favorSong=${favorSong}`;
   xhr.send(data_info);
 }

 //取得Light -- ListName
 function getLibraryLightName() {
   if (!member['mem_no']) {
     mylistInfo = JSON.parse('[{"plist_name":"Total songs","list_pic":"./img/library/list_pic_no.jpg"}]');
     lightListName(mylistInfo);
   } else {
     let xhr = new XMLHttpRequest();
     xhr.onload = function () {
       if (xhr.status == 200) {
         phpGetListName = JSON.parse(xhr.responseText);
         mylistInfo = phpGetListName;
         libraryLightListName(mylistInfo);
       } else {
         alert(xhr.statusText);
       }
     };
     let url = "./phps/getListName.php";
     xhr.open("get", url, true);
     xhr.send(null);
   }
 }

 //登出刷新頁面
 function libraryLogout() {
  location.replace(location.href);
 }