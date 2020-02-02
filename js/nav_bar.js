let vm = new Vue({
    el: "#nav_app",
    data: {
        mobile_list: false,
        search_bar: false,
        mem_list: false,
        mem_login: false,

        search_keyword: [],
    },
    mounted() {
        // nav_bar init
        document.querySelector('.mem_list ul').setAttribute('style', `height: ${window.innerHeight}px;`);
        document.querySelector('.mobile_list ul').setAttribute('style', `height: ${window.innerHeight}px;`);
        document.querySelectorAll('.paint_border')[0].setAttribute('style', `height: ${window.innerHeight}px;`);
        document.querySelectorAll('.paint_border')[1].setAttribute('style', `height: ${window.innerHeight}px;`);

        let href = location.href;
        if (href.lastIndexOf('remix') != -1) {
            document.querySelector('.mobile_list .REMIX').style.background = 'url("./img/public/nav_m_b_bt01.png") center center no-repeat';
            document.querySelector('.main_list .REMIX').style.background = 'url("./img/public/nav_b_bt01.png") center center no-repeat';
        } else if (href.lastIndexOf('collection') != -1) {
            document.querySelector('.mobile_list .COLLECTION').style.background = 'url("./img/public/nav_m_b_bt02.png") center center no-repeat';
            document.querySelector('.main_list .COLLECTION').style.background = 'url("./img/public/nav_b_bt02.png") center center no-repeat';
        } else if (href.lastIndexOf('activity') != -1) {
            document.querySelector('.mobile_list .ACTIVITY').style.background = 'url("./img/public/nav_m_b_bt03.png") center center no-repeat';
            document.querySelector('.main_list .ACTIVITY').style.background = 'url("./img/public/nav_b_bt03.png") center center no-repeat';
        } else if (href.lastIndexOf('library') != -1) {
            document.querySelector('.mobile_list .LIBRARY').style.background = 'url("./img/public/nav_m_b_bt04.png") center center no-repeat';
            document.querySelector('.main_list .LIBRARY').style.background = 'url("./img/public/nav_b_bt04.png") center center no-repeat';
        }

        let get_login_info = () => {
            let xhr = new XMLHttpRequest();
            xhr.onload = () => {
                member = JSON.parse(xhr.responseText);
                if (member.mem_acct) {
                    this.mem_login = true;
                } else {
                    this.mem_login = false;
                }
            }
            xhr.open("get", "./phps/getLoginInfo.php", true);
            xhr.send(null);
        }
        get_login_info();

        let get_search_keyword = () => {
            let xhr = new XMLHttpRequest();
            xhr.onload = () => {
                let keyword = JSON.parse(xhr.responseText);
                for (let i = 0; i < keyword.length; i++) {
                    this.search_keyword.push(keyword[i].song_name);
                }
            }
            xhr.open("get", "./phps/getSearchKeyword.php", true);
            xhr.send(null);
        }
        get_search_keyword();

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
    },
    methods: {
        // nav_bar
        hamburger_click(e) {
            document
                .querySelector(".hamburger").classList.toggle("is-active");
        },
        search_bt_click(e) {
            e.stopPropagation();
            if (this.search_bar == false) {
                this.search_bar = true;
                this.mem_list = false;
                this.mobile_list = false;
                document.querySelector(".search_bar").style.height = '257px';
                document.querySelector(".search_bar").style.filter = 'opacity(1)';
                document.querySelector("input.search").focus();
                document
                    .querySelector(".mem_list")
                    .setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
                document
                    .querySelector(".mobile_list")
                    .setAttribute("style", "transform: translateX(-270px); filter: opacity(0);");
            } else {
                this.search_bar = false;
                document.querySelector(".search_bar").style.height = '0px';
                document.querySelector(".search_bar").style.filter = 'opacity(0)';
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
                document.querySelector(".search_bar").style.height = '0px';
                document.querySelector(".search_bar").style.filter = 'opacity(0)';
                document
                    .querySelector(".mobile_list")
                    .setAttribute("style", "transform: translateX(-270px); filter: opacity(0);");
            } else {
                this.mem_list = false;
                document
                    .querySelector(".mem_list")
                    .setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
                document.querySelector(".search_bar").style.height = '0px';
                document.querySelector(".search_bar").style.filter = 'opacity(0)';
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
                document.querySelector(".search_bar").style.height = '0px';
                document.querySelector(".search_bar").style.filter = 'opacity(0)';
            } else {
                this.mobile_list = false;
                document
                    .querySelector(".mobile_list")
                    .setAttribute("style", "transform: translateX(-270px); filter: opacity(0);");
                document
                    .querySelector(".mem_list")
                    .setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
                document.querySelector(".search_bar").style.height = '0px';
                document.querySelector(".search_bar").style.filter = 'opacity(0)';
            }
        },

        keyword_click(e) {
            document.querySelector('.nav_bar .search').value = e.target.innerText;
        },

        search_click() {
            let value = document.querySelector('.nav_bar .search').value.replace(' ', '');
            location.href = `./search.html?${value}`
        },

        search_bar_style() {
            if (this.mem_login == true) {
                return 'right:60px'
            } else {
                return 'right:90px'
            }
        },

        logout() {
            let xhr = new XMLHttpRequest();
            xhr.onload = () => {
                this.mem_login = false;
                document.querySelector(".mem_list").setAttribute("style", "transform: translateX(270px); filter: opacity(0);");
                let href = location.href;
                if (href.lastIndexOf('activity') != -1 || href.lastIndexOf('remix') != -1 || href.lastIndexOf('collection') != -1 || href.lastIndexOf('library') != -1 || href.lastIndexOf('profile') != -1 || href.lastIndexOf('songsadded') != -1 || href.lastIndexOf('store') != -1 || href.lastIndexOf('donate') != -1) {
                    location.href = './home.html'
                }
            }
            xhr.open("get", "./phps/logout.php", true);
            xhr.send(null)
        }
    }
});
