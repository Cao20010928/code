<template>
    <div style="width: 100%">
        <div class="search-list">
            <input type="text" autocomplete="off"
                   id="input"
                   class="search-input"
                   v-model="input"
                   placeholder="搜索作物名称或者病虫害"
                   @keyup.enter="search()">
            <div class="search-icon" @click="search">
                <img src="../assets/farmCatalog/search.png" style="position: relative;
            padding: 10px; height: 25px; width: 25px">
            </div>
        </div>
        <div class="tags">
            <div class="tag">
                作物名称
            </div>
            <div class="tag">
                简介
            </div>
            <div class="tag">
                图库链接
            </div>
        </div>

        <div class="detail">
            <div v-for="item in crops" v-bind:key="item">
                <div class="content" >
                    <div class="name">
                        <img :src="item.url"
                             :onload="onLoadImg"
                             style="max-width: 110px; max-height: 110px;
                             border-radius: 10px;margin-top: 20px">
                        <h3 style="text-align: center; font-size: 15px; margin: 0 0 10px 0">{{item.name}}</h3>
                    </div>

                    <div class="intro">{{item.intro}}</div>
                    <router-link :to="{path: '/farmDetails', query: {name: item.name, intro: item.intro}}" class="button">
                        查看图库</router-link>

                </div>
                <hr style="width: 95%; margin: 0 auto">
            </div>



        </div>

<!--        <br>-->

    </div>
</template>

<script>
    // import router from "@/router";

    export default {
        name: "farmCatalog",
        data(){
            return{
                input:'',
                crops: []
            }
        },
        methods:{
            search(){
                let intro = ''
                for(let i in this.crops){
                    if(this.crops[i].name===this.input){
                        intro = this.crops[i].intro
                        break
                    }
                }
                this.$router.push({
                    path: '/farmDetails',
                    query:{
                        name: this.input,
                        intro: intro
                    }
                })
            },
            onLoadImg(){
                console.log('yes')
            }
        },
        created(){
            this.$axios({
                method: 'post',
                url: this.$store.state.address + "crop/get_crops",
                data: {}
            })
                .then(res => {
                    // console.log(res.data.list)
                    this.crops = res.data.list
                    for(let i in this.crops){
                        this.crops[i].url = "http://39.107.54.54:8080/image/crops/"+this.crops[i].name+".jpg"
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        },
        updated(){
            // console.log(this.crops)
            // for(let i in this.crops){
            //     console.log('http://39.107.54.54:8080/image/crops/' + this.crops[i].name + '.jpg')
            // }
        }
    }
</script>

<style scoped>
    .search-list{
        display: flex;
        margin-top: 10px;
        justify-content: center;
        width: 100%;
        height: 50px;
    }
    .search-input{
        position: relative;
        font-size: 18px;
        width: 500px;
        height: 50px;
        padding: 0 20px 0 10px;
        border-radius: 10px;
        border-color: #505050;
        box-shadow: 0 0 5px;
        /*border: none;*/
    }
    .search-icon{
        max-width: 50px;
        max-height: 50px;
        margin: 3px 13px;
        line-height: 50px;
        border-radius: 60%;
        border-color: #505050;
        box-shadow: 0 0 5px;
        /*margin: auto;*/
    }
    .search-icon:hover{
        background-color: #c2c2c2;
    }
    .search-icon:active{
        background-color: #9494b8;
    }
    .tags{
        display: grid;
        grid-template-columns: 18% 64% 12%;
        /*justify-content: space-between;*/
        justify-items: start;
        width: 95%;
        margin: auto;
    }
    .tag{
        border-color: #505050;
        /*padding: 10px;*/
        width: 80px;
        text-align: center;
        border-radius: 20px;
        box-shadow: 0 0 5px;
        margin: 10px auto 10px 20px;
    }
    .detail{
        box-shadow: 0 0 5px;
        width: 90%;
        height: 80%;
        margin: auto;
        border-radius: 10px;
        overflow: scroll;
    }
    .content{
        display: flex;
        margin: 5px;
        height: 100px;
        align-items: center;
    }
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
    .intro{
        margin-top: 5px;
        margin-left: 30px;
        width: 70%;
        overflow: hidden;
        margin-right: 30px;
    }
    .button{
        border: none;
        text-decoration: none;
        border-radius: 10px;
        /*display: block;*/
        position: relative;
        padding: 5px 10px;
        font-size: 10px;
        height: auto;
        background: #2474b5;
        cursor: pointer;
        /*user-select: none;*/
        color: white;
        word-break:keep-all;
        white-space:nowrap;
        /*overflow: hidden;*/
    }
    .button:active{
        background: #3fa7f5;
    }
    .name{
        margin-left: 20px;
    }
</style>