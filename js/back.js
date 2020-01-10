var back = new Vue({
  el: "#app",
  data: {
    screenWidth: document.body.clientWidth,
    currpos: "檢舉管理",
    currchild: "未處理",
    update: false,
    upact_infos: {
      activity_img: '',
      activity_num: '',
      activity_name: '',
      activity_start: '',
      activity_fin: '',
      activity_Introduction: '',
      activity_g: '',
    },
    // 管理員帳號管理
    controller: [],
    // 會員帳號管理
    memberinfos: [],
    // 音樂庫管理
    total_music: [],
    // 活動投票管理
    vote: [],
    // 活動上下架 
    activity: [],
    // 留言處理
    report: []


  },
  methods: {
    resize() {
      const vm = this;
      // resize 的部分
      window.onresize = () => {
        return (() => {
          vm.screenWidth = document.body.clientWidth;
        })()
      }
    },
    clean_form() {
      var vm = this;
      // 清除表格資料
      vm.upact_infos.activity_img = '';
      vm.upact_infos.activity_num = '';
      vm.upact_infos.activity_name = '';
      vm.upact_infos.activity_start = '';
      vm.upact_infos.activity_fin = '';
      vm.upact_infos.activity_Introduction = '';
      vm.upact_infos.activity_g = '';

      vm.update = false;
    },
    up_img() { // 顯示圖片的程式
      var vm = this;
      var upimg = document.getElementById('upimg').files[0];
      // console.log(upimg);
      var readFile = new FileReader();
      // console.log(upimg.name)
      vm.upact_infos.activity_g = upimg.name;
      readFile.readAsDataURL(upimg);
      readFile.addEventListener('load', function () {
        vm.upact_infos.activity_img = this.result;
      })
    },
    getday() { // 獲取日期
      var now = new Date();
      var year = now.getFullYear();
      var mon = now.getMonth() + 1;
      var date = now.getDate();
      return `${year}/${mon}/${date}`
    },
    get_actor() { // 管理員資訊
      var vm = this;
      axios.get('./phps/get.php?get=actor').then(function (res) {
        // console.log(res.data)
        vm.controller = res.data;

      }).catch(err => {
        console.log(err)
      })
    },
    get_member() { // 會員資訊
      var vm = this;
      axios.get('./phps/get.php?get=member').then(function (res) {
        // console.log(res.data)
        vm.memberinfos = res.data;

      }).catch(err => {
        console.log(err)
      })
    },
    get_song() { //　歌曲資訊
      var vm = this;
      axios.get('./phps/get.php?get=song').then(function (res) {
        // console.log(res.data)
        vm.total_music = res.data;
      }).catch(err => {
        console.log(err)
      })
    },
    get_vote() { // 活動票數資訊
      var vm = this;
      axios.get('./phps/get.php?get=vote').then(function (res) {
        // console.log(res.data)
        vm.vote = res.data;
      }).catch(err => {
        console.log(err)
      })
    },
    send_act() { //　創建活動
      var vm = this;
      if (vm.upact_infos.activity_img == '') {
        return alert('圖片欄不能為空');
      } else if (vm.upact_infos.activity_num == '') {
        return alert('活動編號不能為空');
      } else if (vm.upact_infos.activity_name == '') {
        return alert('活動名稱不能為空');
      } else if (vm.upact_infos.activity_start == '') {
        return alert('活動開始日期不能為空');
      } else if (vm.upact_infos.activity_fin == '') {
        return alert('活動結束日期不能為空');
      } else if (vm.upact_infos.activity_Introduction == '') {
        return alert('活動介紹日期不能為空');
      } else {
        setTimeout(function () {
          vm.clean_form();
          alert('上傳成功^__^');
          vm.get_activity();

          var collapseOne = document.getElementById('collapseOne');
          var collapseTwo = document.getElementById('collapseTwo');
          collapseOne.className = "collapse";
          collapseTwo.className = "collapse show";
        }, 1000)
      }

      // $.post('./phps/post.php', {
      //   post: "add_activity",
      //   activity_img: vm.upact_infos.activity_img,
      //   activity_num: vm.upact_infos.activity_num,
      //   activity_name: vm.upact_infos.activity_name,
      //   activity_start: vm.upact_infos.activity_start,
      //   activity_fin: vm.upact_infos.activity_fin,
      //   activity_Introduction: vm.upact_infos.activity_Introduction,
      //   activity_g: vm.upact_infos.activity_g,
      // }, data => {
      //   vm.upact_infos.activity_img = '';
      //   vm.upact_infos.activity_num = '';
      //   vm.upact_infos.activity_name = '';
      //   vm.upact_infos.activity_start = '';
      //   vm.upact_infos.activity_fin = '';
      //   vm.upact_infos.activity_Introduction = '';
      //   vm.upact_infos.activity_g = '';
      //   alert('上傳成功^__^');
      //   console.log(data);
      //   vm.get_activity();

      // })
    },
    get_activity() { // 已建活動資訊
      var vm = this;
      axios.get('./phps/get.php?get=activity').then(function (res) {
        // console.log(res.data)
        vm.activity = res.data;

      }).catch(err => {
        console.log(err)
      })
    },
    get_edit(no) { // 獲取要修改的活動資訊
      var vm = this;
      axios.get('./phps/get.php?get=edit&activity_no=' + no).then(function (res) {
        vm.upact_infos.activity_img = res.data.activity_img.substring(1);
        vm.upact_infos.activity_num = res.data.activity_no;
        vm.upact_infos.activity_name = res.data.activity_name;
        vm.upact_infos.activity_start = res.data.activity_str;
        vm.upact_infos.activity_fin = res.data.activity_fin;
        vm.upact_infos.activity_Introduction = res.data.activity_con;
        vm.upact_infos.activity_g = res.data.activity_img.substring(16);

        var collapseOne = document.getElementById('collapseOne');
        var collapseTwo = document.getElementById('collapseTwo');
        collapseOne.className = "collapse show";
        collapseTwo.className = "collapse";
      }).catch(err => {
        console.log(err)
      })
    },
    update_act() { // 更新活動資訊
      var vm = this;
      setTimeout(function () {
        alert('更新成功');
        vm.get_activity();
        var collapseOne = document.getElementById('collapseOne');
        var collapseTwo = document.getElementById('collapseTwo');
        collapseOne.className = "collapse";
        collapseTwo.className = "collapse show";
        vm.clean_form();
      }, 500)
    },
    get_delete(no) { // 刪除活動
      var ans = confirm('確定要刪除?');
      var vm = this;
      vm.clean_form();
      if (ans) {
        axios.get('./phps/get.php?get=delete&activity_no=' + no).then(res => {
          alert(res.data);
          vm.get_activity();
        })
      }


    },
    get_report() { // 留言資訊
      var vm = this;
      axios.get('./phps/get.php?get=report').then(res => {
        console.log(res.data)
        vm.report = res.data;
      })
    },
    get_hid_report(no){ // 屏蔽留言
      var vm = this;
      axios.get('./phps/get.php?get=hid_report&re_no='+no).then(res=>{
        console.log(res.data);
        vm.get_report();
      });
    }
  },
  mounted() {
    this.resize();
    this.get_actor();
    this.get_member();
    this.get_song();
    this.get_vote();
    this.get_activity();
    this.get_report();
  },
  computed: {
    report0() { // 檢舉未處理
      var vm = this;
      return vm.report.filter(item => {
        return item.re_sta == 0
      })
    },
    report1() { // 檢舉已處理
      var vm = this;
      return vm.report.filter(item => {
        return item.re_sta == 1
      })
    },

  },
  watch: {
    screenWidth() {

    }
  },
})