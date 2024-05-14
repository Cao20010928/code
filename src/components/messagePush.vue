<template>
    <div class="wrapper">
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Microsoft_Account.svg">
        </div>
        <div style="margin-left: 10px;">
            <div style="display: flex; justify-content: space-between">
                <h2>{{topic}}</h2>
                <a>{{time}}</a>
            </div>
            <p>{{content}} </p>
        </div>


    </div>

</template>

<script>
    export default {
        name: "messagePush",
        data(){
            return{
                content: '暂无消息',
                topic: '消息',
                time: ''
            }
        },
        methods: {
            messageShow(news){
                const notification = document.querySelector((".wrapper"))
                notification.classList.toggle("active")
                console.log(news)
                let information = news
                if('topic' in information)this.topic = information.topic
                if('what_time' in information)this.time = information.what_time
                if('which_time' in information)this.time = information.which_time
                if('contain_what' in information)this.content = information.contain_what
                if('type' in information)this.content = information.type
                setTimeout(() => {
                    this.messageHide();       // 设置时间后自动隐藏消息
                }, 5000);
            },
            messageHide(){
                const notification = document.querySelector((".wrapper"))
                notification.classList.toggle("active")
            }
        }
    }
</script>

<style scoped>

    .wrapper {
        position: relative;
        display: flex;
        top: -200px;
        margin: 0 auto;
        z-index: 100;
        background-color: rgba(255,255,255,0.7);
        padding: 12px;
        border-radius: 18px;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        width: 360px;
        height: auto;
        /*margin: 0 auto;*/
        opacity: 0.8;
        animation-timing-function: ease-in-out;
        transition: 0.5s;
    }
    .wrapper.active {
        top: -80px;
    }

    h2 {
        /*position: relative;*/

        font-size: 12px;
        color: black;
        /*line-height: 12px;*/
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 4px;
        /*display: inline-block;*/
        opacity: 1;
    }

    a {
        font-size: 10px;
        position: relative;
        white-space: nowrap;
        right: 5px;
        color: rgb(97,97,101);
    }

    p {
        font-size: 12px;
        position: relative;

        color: black;
        /*line-height: 16px;*/
        max-width: 300px;
        margin: 0;
    }

    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: 33px;
        position: relative;

    }

</style>