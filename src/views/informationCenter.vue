<template>
    <div style="width: 100%">
        <div style="margin-left: 120px; margin-top: 20px">
            <top-bar @child-event="changeTab"></top-bar>
        </div>

        <div style="overflow: scroll; width: 100%; height: 88%">
            <div class="wrapper" v-for="item in currentInfo" v-bind:key="item.id">
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Microsoft_Account.svg">
                </div>
                <div style="margin-left: 10px; width: 90%; display: flex; justify-content: space-between">
                    <div class="words">
                        <h2>{{item.topic}}</h2>
                        <p>{{item.contain_what}} </p>
                    </div>
                    <div id="info">
                        <a>{{item.which_time}}</a>
                        <div class="icon">
                            <div class="read" :id="item.id" :style="{color: item.isRead? 'grey': 'black'}">
                                {{item.isRead? '已读':'未读'}}</div>
                            <check-box @click="changeRead(item)" :is-read="item.isRead"></check-box>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import checkBox from "@/components/checkBox";
    import topBar from "@/components/topBar";
    export default {
        name: "informationCenter",
        components: {
            checkBox,
            topBar
        },
        data(){
            return{
                info: [],
                allInfo: [],
                currentInfo: []
            }
        },
        methods: {
            changeRead(item){
                item.isRead = true
                const notification = document.getElementById(item.id)
                // console.log(notification)
                notification.style.color = 'grey'
                const jsonData = {
                    seq: item.seq
                }
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'message/get_user_read',
                    data: jsonData
                })
            },
            changeTab(is){
                if(is)
                    this.currentInfo = this.info
                else
                {
                    this.currentInfo = this.allInfo

                }

            },
        },
        mounted(){
            if(JSON.parse(sessionStorage.getItem('baseInfo'))){
                const jsonData = {
                    name: JSON.parse(sessionStorage.getItem('baseInfo')).username
                }
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'message/get_user_message_list',
                    data: jsonData
                }).then(res => {
                    this.allInfo = res.data.list
                    for(let i in res.data.list){
                        if(res.data.list[i].isRead===false)
                            this.info.push(res.data.list[i])
                    }
                    for(let i in this.info){
                        this.info[i].id = i
                    }
                    for(let i in this.allInfo){
                        this.allInfo[i].id = i

                    }
                    this.currentInfo = this.info
                })
            }

        }
    }
</script>

<style scoped>
    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width:10px;
    }
    /* 滚动槽 */
    ::-webkit-scrollbar-track {
        /*-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);*/
        border-radius:10px;
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius:10px;
        background:rgba(0,0,0,0.1);
        /*-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);*/
    }
    .icon{
        display: flex;
        position: absolute;
        right: 40px;
        bottom: -30px;
    }
    .wrapper {
        position: relative;
        display: flex;
        text-decoration: none;
        color: black;
        /*justify-content: space-around;*/
        align-items: center;
        margin: 10px auto;
        height: fit-content;
        width: 80%;
        border-radius: 10px;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);

    }
    #info{
        height:100%;
    }
    .read{
        white-space: nowrap; margin-right: 10px
    }
    .read.active{
        color: white;
    }
    h2 {
        /*position: relative;*/
        /*width: fit-content;*/
        font-size: 20px;
        color: black;
        /*line-height: 12px;*/
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 4px;
        /*display: inline-block;*/
        opacity: 1;
    }

    a {
        font-size: 15px;
        position: absolute;
        white-space: nowrap;
        right: 5px;
        color: rgb(97,97,101);
    }

    p {
        font-size: 18px;
        position: relative;

        color: black;
        /*line-height: 16px;*/
        max-width: 700px;
        margin: 0;
    }

    img {
        display: block;
        padding: 10px;
        margin-left: auto;
        margin-right: auto;
        height: 70px;
        position: relative;

    }
</style>