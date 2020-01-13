<div id="nav_app">
    <div class="nav_bar flexbox">
        <div class="hamburger" @click="hamburger_click">
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </div>
        <div class="mobile_list" @click="stopPropagation">
            <div class="paint_border"></div>
            <ul>
                <li class="REMIX flexbox">
                    <a href="./remix.html">
                    </a>
                </li>
                <li class="COLLECTION flexbox">
                    <a href="./collection.html">
                    </a>
                </li>
                <li class="ACTIVITY flexbox">
                    <a href="./activity.html">
                    </a>
                </li>
                <li class="LIBRARY flexbox">
                    <a href="./library.html">
                    </a>
                </li>
            </ul>
        </div>
        <div class="logo_container">
            <a href="./index.html">
                <div class="logo"></div>
                <div class="finger"></div>
            </a>
        </div>
        <ul class="main_list flexbox">
            <li class="REMIX flexbox">
                <a href="./remix.html">
                </a>
            </li>
            <li class="COLLECTION flexbox">
                <a href="./collection.html">
                </a>
            </li>
            <li class="ACTIVITY flexbox">
                <a href="./activity.html">
                </a>
            </li>
            <li class="LIBRARY flexbox">
                <a href="./library.html">
                </a>
            </li>
        </ul>
        <div class="search_bt" @click="search_bt_click">
            <a href="#"></a>
        </div>
        <div class="search_bar" @click="stopPropagation">
            <input class="search" type="text" />
            <div class="tag_container">
            </div>
        </div>

        <div class="mem_bt" @click="mem_bt_click" v-if="mem_login == true">
            <a href="#"></a>
        </div>
        <div class="login_bt" @click="" v-if="mem_login == false">
            <a href="./login.html"></a>
        </div>
        <div class="mem_list" @click="stopPropagation">
            <div class="paint_border"></div>
            <ul>
                <li>
                    <a href="./profile.html">
                        <h4>Profile</h4>
                    </a>
                </li>
                <li>
                    <a href="./songsadded.html">
                        <h4>
                            Song Upload
                            <br />&amp; Remove
                        </h4>
                    </a>
                </li>
                <li>
                    <a href="./store.html">
                        <h4>
                            Store Value
                            <br />&amp;Store Record
                        </h4>
                    </a>
                </li>
                <li>
                    <a href="./donate.html">
                        <h4>Donate Record</h4>
                    </a>
                </li>
                <li>
                    <a href="#" @clicl="logout">
                        <h4>Log Out</h4>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
<script>
    let vm = new Vue({
        el: "#nav_app",
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
                e.stopPropagation();
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

            logout() {
                let xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    this.mem_login = false;
                }
                xhr.open("get", "logout.php", true);
                xhr.send(null)
            }
        }
    });
    window.addEventListener('load', () => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            member = JSON.parse(xhr.responseText);
            if (member.mem_acct) {
                vm.mem_login = true;
            }
        }
        xhr.open("get", "getLoginInfo.php", true);
        xhr.send(null);
    });
</script>