function getLoginInfo(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
      member=JSON.parse(xhr.responseText);
    //   if(member.memName){
    //   }
    }  
    xhr.open("post", url, true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    let member_data = "mem_acct=" + document.getElementById('mem_acct').value+"&&mem_psw=" + document.getElementById('mem_psw').value ;
    xhr.send(member_data);   
}