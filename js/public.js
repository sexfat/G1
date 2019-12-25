new Vue({
  el: "#app",
  data: {
    mobile_list: false,
    search_bar: false,
    mem_list: false,
    mem_login: false,
  },
  mounted() {
    // nav_bar start
    document.querySelector('.mem_list ul').setAttribute('style', `height: ${window.innerHeight}px;`);
    document.querySelector('.mobile_list ul').setAttribute('style', `height: ${window.innerHeight}px;`);
    document.querySelectorAll('.paint_border')[0].setAttribute('style', `height: ${window.innerHeight}px;`);
    document.querySelectorAll('.paint_border')[1].setAttribute('style', `height: ${window.innerHeight}px;`);

    document.addEventListener('click', () => {
      this.mem_list = false;
      this.search_bar = false;
      this.mobile_list = false;

      document
        .querySelector(".search_bar")
        .setAttribute("style", "height: 0px; filter: opacity(0);");
      document
        .querySelector(".mem_list")
        .setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
      document
        .querySelector(".mobile_list")
        .setAttribute("style", "transform: translateX(-270px); filter: opacity(0);");
    });
    // nav_bar end


  },
  methods: {
    // nav_bar
    hamburger_click(e) {
      // e.stopPropagation();
      document
        .querySelector(".hamburger").classList.toggle("is-active");
    },
    search_bt_click(e) {
      e.stopPropagation();
      if (this.search_bar == false) {
        this.search_bar = true;
        this.mem_list = false;
        this.mobile_list = false;
        document
          .querySelector(".search_bar")
          .setAttribute("style", "height: 240px; filter: opacity(1);");
        document.querySelector("input.search").focus();
        document
          .querySelector(".mem_list")
          .setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
        document
          .querySelector(".mobile_list")
          .setAttribute("style", "transform: translateX(-270px); filter: opacity(0);");
      } else {
        this.search_bar = false;
        document
          .querySelector(".search_bar")
          .setAttribute("style", "height: 0px; filter: opacity(0);");
        document.querySelector("input.search").blur();
        document
          .querySelector(".mem_list")
          .setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
        document
          .querySelector(".mobile_list")
          .setAttribute("style", "transform: translateX(-270px); filter: opacity(0);");
      }
    },
    stopPropagation(e) {
      e.stopPropagation();
    },
    mem_bt_click(e) {
      e.stopPropagation();
      if (this.mem_list == false) {
        this.mem_list = true;
        this.search_bar = false;
        this.mobile_list = false;
        document
          .querySelector(".mem_list")
          .setAttribute("style", "transform: translateX(0); filter: opacity(1);");
        document
          .querySelector(".search_bar")
          .setAttribute("style", "height: 0px; filter: opacity(0);");
        document
          .querySelector(".mobile_list")
          .setAttribute("style", "transform: translateX(-270px); filter: opacity(0);");
      } else {
        this.mem_list = false;
        document
          .querySelector(".mem_list")
          .setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
        document
          .querySelector(".search_bar")
          .setAttribute("style", "height: 0px; filter: opacity(0);");
        document
          .querySelector(".mobile_list")
          .setAttribute("style", "transform: translateX(-270px); filter: opacity(0);");
      }
    },
    hamburger_click(e) {
      e.stopPropagation();
      if (this.mobile_list == false) {
        this.mobile_list = true;
        this.mem_list = false;
        this.search_bar = false;
        document
          .querySelector(".mobile_list")
          .setAttribute("style", "transform: translateX(0); filter: opacity(1);");
        document
          .querySelector(".mem_list")
          .setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
        document
          .querySelector(".search_bar")
          .setAttribute("style", "height: 0px; filter: opacity(0);");
      } else {
        this.mobile_list = false;
        document
          .querySelector(".mobile_list")
          .setAttribute("style", "transform: translateX(-270px); filter: opacity(0);");
        document
          .querySelector(".mem_list")
          .setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
        document
          .querySelector(".search_bar")
          .setAttribute("style", "height: 0px; filter: opacity(0);");
      }
    },
  }
});