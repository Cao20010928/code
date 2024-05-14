<template>

    <div class="top_bar" style="height: 10vh; position: relative; width: 100%; "
         v-show="canSee">
        <img :class="bgClass">
        <div class="stuff">
            <h1 class="header">病虫害检测系统</h1>
<!--            <div class="message" @click="showMessage">{{notification}}</div>-->
            <div class="overall" style="display: flex; margin-right: 10px; height: 100%">
                <div class="icon">
                    <img :src="path"
                         :onload="loadPicture"
                         style="max-height: 90%; max-width: 90%;
                         border: #d8e3e7;border-radius: 10px; border-style:solid; border-width:2px;">
<!--                    <img src="http://39.107.54.54:8080/image/portraits/Xingru_Jiang.jpg"-->
<!--                         :onload="loadPicture"-->
<!--                         style="max-height: 100%; max-width: 100%; margin: auto">-->
                </div>

                <div class="info">
                    <p>{{name}}</p>
                    <p>{{type}}</p>
                </div>
                <div class="dropdownMenu">
                    <div class="profile">{{email}}</div>
                    <div class="profile">{{telephone}}</div>
                    <div class="exit" @click="openPopUp">修改个人信息</div>
<!--                    <div class="exit">反馈</div>-->
<!--                    <div class="exit">推出</div>-->
                    <div class="exit" @click="goLogin">退出</div>
                </div>
            </div>
        </div>
        <message-push ref="message"></message-push>
    </div>

    <div style="display: flex; height: 90vh">
<!--        <side-navigation :type="type" ref="childRef" class="side" v-show="canSee"></side-navigation>-->
        <menuNavigation v-show="type==='用户'&&canSee" @update-data="changeBackground"></menuNavigation>
        <menu-navigation2nd v-show="type==='技术人员'&&canSee" @update-data="changeBackground"></menu-navigation2nd>
        <menu-navigation3rd v-show="type==='管理人员'&&canSee" @update-data="changeBackground"></menu-navigation3rd>
        <menu-navigation4th v-show="type==='运维人员'&&canSee" @update-data="changeBackground"></menu-navigation4th>
        <router-view/>
    </div>
    <div class="notification">

    </div>
    <pop-up :name="name" ref="childRef"></pop-up>

</template>

<script>

// import sideNavigation from "@/components/sideNavigation";
import messagePush from "@/components/messagePush";
import menuNavigation from "@/components/menuNavigation";
import menuNavigation2nd from "@/components/menuNavigation2nd";
import menuNavigation3rd from "@/components/menuNavigation3rd";
import menuNavigation4th from "@/components/menuNavigation4th";
import popUp from "@/components/popUp";
import $ from 'jquery';
export default {
    components: {
        // sideNavigation,
        messagePush,
        menuNavigation4th,
        menuNavigation3rd,
        menuNavigation2nd,
        menuNavigation,
        popUp
    },
    data(){
      return {
          canSee: false,
          notification: 2,
          path: require('../src/assets/images/user.png'),
          type: '用户',
          name: 'Ego',
          email: '',
          telephone: '',
          websocket: null,
          background: require('../src/assets/images/BigSur2.jpeg'),
          isBgImage: true
      }
    },
    computed: {
        bgClass() {
            return this.isBgImage ? 'bg1' : 'bg2';
        }
    },
    provide(){
      return{
          updateBaseInfo: this.updateBaseInfo,
          updateName: this.updateName,
          updateSide: this.updateSide,
          searchInfo: this.searchInfo,
          sideFalse: this.sideFalse,
          initWebSocket: this.initWebSocket,
          checkImg: this.checkImg,

      }
    },
    methods: {
        changeBackground(){
            this.isBgImage = !this.isBgImage;
        },
        goLogin(){
            this.$router.push({path: '/'})
            this.websocket.close();
        },
        updateSide(){
            this.canSee = true
        },
        sideFalse(){
            this.canSee = false
        },
        updateBaseInfo(baseInfo){
            this.email = baseInfo.email
            this.telephone = baseInfo.telephone
        },
        updateName(baseInfo){
            sessionStorage.setItem('name', baseInfo.username)
            this.name = baseInfo.username
            this.path = baseInfo.path
            this.type = baseInfo.type
        },
        loadPicture(){
            // console.log('yes')
        },
        openPopUp() {
            this.$refs.childRef.loadMessage()
            const popup = document.querySelector(".popup");
            popup.classList.toggle("show");
        },
        showMessage(){
            const notification = document.querySelector((".notification"))
            notification.classList.toggle("active")
        },
        searchInfo(name){
            const jData = {
                name: name
            }
            this.$axios({
                method: 'post',
                url: this.$store.state.address + 'user/check_user',
                data: jData
            })
                .then(res=>{
                    // console.log(res)
                    this.name = res.data.list[0].name
                    this.email = res.data.list[0].email
                    this.telephone = res.data.list[0].telephone
                })
                .catch(err =>{
                    console.log(err)
                })
        },
        initWebSocket(){
            if(sessionStorage.getItem('picName')){
                let name = sessionStorage.getItem('picName')

                this.websocket = new WebSocket('ws://39.107.54.54:8080/wsserver/' + name)
                this.websocket.onopen = () => {
                    console.log('connected!')
                }
                this.websocket.onmessage = (event) => {
                    let data = JSON.parse(event.data)
                    console.log('接收到消息：', data)
                    this.$refs.message.messageShow(data)
                }
                this.websocket.onclose = () => {
                    console.log('WebSocket连接已关闭')
                }
                this.websocket.onerror = (error) => {
                    console.log('WebSocket发生错误：', error)
                }
            }

        },

        testSendMsg() {
            let msg = {msg: '这是一条测试信息，发给服务器', toId: ''};
            this.webSocketSend(JSON.stringify(msg));
        },
        checkImg(imgurl) {
            // console.log(imgurl)
            return new Promise(function(resolve, reject) {
                var imgObj = new Image();
                imgObj.src = imgurl;
                imgObj.onload = () => resolve();
                imgObj.onerror = () => reject();
            }).then(()=>{

                // console.log('有效链接')
                this.path = imgurl
            }).catch(()=>{

                this.path = require('../src/assets/images/user.png')
            })
        },
    },

    mounted() {
        if(this.$router.path!=='/')
            this.canSee = true
        if(sessionStorage.getItem('baseInfo')){
            this.name = JSON.parse(sessionStorage.getItem('baseInfo')).username
            this.type = JSON.parse(sessionStorage.getItem('baseInfo')).type
            this.checkImg(JSON.parse(sessionStorage.getItem('baseInfo')).path)
            const jsonData = {
                name: this.name
            }
            this.$axios({
                method: 'post',
                url: this.$store.state.address + 'user/check_user',
                data: jsonData
            }).then(res=>{
                this.telephone = res.data.list[0].telephone
                this.email = res.data.list[0].email
            })
        }




        // console.log(this.path)
        // console.log(this.path)

        $(function(){
            $('.dropdownMenu').hide()
            $('.overall').hover(
                function () {
                    $('.dropdownMenu').show()
                },
                function () {
                    $('.dropdownMenu').hide()
                }
            )
        })


    },
    created: function () {
        sessionStorage.setItem('type', 'user')
        // 同步处理先获取id，再创建WebSocket连接
        // this.initWebSocket();
    },
    unmounted() {
        // 在Vue销毁前断开WebSocket服务器连接
        this.websocket.close();
    }
}


</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
    margin: 0;
}
    body{
        margin: 0;
    }
    .side{
        position: relative;
    }
    .top_image{
        position: absolute;
        width: 100%;
        object-fit: cover;
        height: 100%;
        z-index: 0;
        transition: backgrpund-image 0.5s ease-in-out;
    }
    .bg1{
        background-image: url("../src/assets/images/BigSur2.jpeg");
        position: absolute;
        width: 100%;
        background-size: cover;
        background-position: center;
        height: 100%;
        z-index: 0;
        margin: 0;
        transition: background-image 0.5s ease-in-out;
    }
    .bg2{
        background-image: url("../src/assets/images/BigSur3.jpeg");
        position: absolute;
        width: 100%;
        background-size: cover;
        background-position: center;
        height: 100%;
        z-index: 0;
        margin: 0;
        transition: background-image 0.5s ease-in-out;
    }
    .header{
        font-family: '华文楷体';
        position: relative;
        color: white;
        line-height: 80px;
        margin: 0 0 0 15px;
        padding: 0;
    }
    .stuff{
        display: flex;
        justify-content: space-between;
    }
    .message{
        position: absolute;
        right: 130px;
        background-color: red;
        color: white;
        text-align: center;
        font-size: 10px;
        line-height: 20px;
        z-index: 99;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 50%;
    }
    .icon{
        width: 10vh;
        height: 10vh;
        z-index: 1;
        padding-bottom: 10px;
        display: flex;
        border-radius: 10px;
        align-items: center;
    }
    .info{
        /*position: absolute;*/
        margin-top: 10px;
        z-index: 1;
    }
    .info p{
        font-size: 20px;
        color: white;
        font-family: '华文楷体';
        margin: 0
    }
    h3{
        margin: 5px;
    }
    .dropdownMenu{
        position: absolute;
        background-color: #151c22;
        color: white;
        border-radius: 10px;
        z-index: 2;
        /*padding: 10px;*/
        top: 80px;
        right: 10px;
        border-style: solid;
        border-color: #3fa7f5;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
    }
    .notification{
        position: absolute;
        background-color: white;
        top: 100px;
        right: 10px;
        width: 0;
        height:600px;
        animation-timing-function: ease-in-out;
        transition: 0.5s;
    }
    .notification.active{
        width: 300px;
        border-radius: 10px;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    .profile{
        padding: 10px;
        /*cursor: pointer;*/
        text-align: center;
    }
    /*.profile:hover{*/
    /*    background-color: #333333;*/
    /*    border-radius: 10px;*/
    /*    !*padding: 10px;*!*/
    /*    color: grey;*/
    /*}*/
    /*.profile:active{*/
    /*    color: white;*/
    /*}*/
    .exit{
        text-align: center;
        text-decoration: none;
        padding: 10px;
        cursor: pointer;
    }
    .exit:hover{
        background-color: #333333;
        border-radius: 10px;
        /*padding: 10px;*/
        color: grey;
    }
    .exit:active{
        color: white;
    }
</style>
