$(document).ready(function(){
 //撥放器縮放
 $('#expand').click(function () {
    $('.player_b').addClass('open');
    $('.player_s').css('bottom', '-70px');
  });
  $('#closePlayer').click(function () {
    $('.player_b').removeClass('open');
    $('.player_s').css('bottom', '0');
  });

  //手機推移
  $('.left .pushBtn').click(function () {
    $('.left').css('height', '10%');
    $('.right').css('height', '90%');
    $('.right .pushBtn').css('display', 'block');
    $('.left .pushBtn').css('display', 'none');
  });
  $('.right .pushBtn').click(function () {
    $('.left').css('height', '90%');
    $('.right').css('height', '10%');
    $('.left .pushBtn').css('display', 'block');
    $('.right .pushBtn').css('display', 'none');
  });

  //select選歌單
  $('#selectBtn').click(function () {
    $('.lightCover').show();
    $('#myAllList').show();
  });

  $('.close').click(function () {
    $('.lightCover').hide();
    $('#myAllList').hide();
  });
  $('.lightCover').click(function(){
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
  $('#player .songCover').mouseover(function(){
    $(this).find('.listPlay').fadeIn(200);
    $(this).parent().siblings().find('.songCover').find('.listPlay').fadeOut();
  });

  $(".listPlay").click(function(){
    $('.coverRec ').addClass('recordOut').addClass('recRotate');
  });
});