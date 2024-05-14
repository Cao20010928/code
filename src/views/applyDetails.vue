<template>
    <div style="display: flex; width: 100%">
        <div class="left">
            <h3>{{name}}的复检申请</h3>
            <div class="bottom">
                <div style="display: flex">
                    <img :src="image" style="max-width: 110px; max-height: 110px;
                border-radius: 10px;margin-top: 20px; float: left; margin-left:20px;">
                    <div class="words">
                        <div style="display: flex;">
                            <div style="margin-left: 5px; margin-top: 20px; text-align: left">错误类型：
                                <span style="color: #198844">{{errorType}}</span>
                            </div>
                        </div>
                        <div style="display: flex;">
                            <div style="margin-left: 5px; text-align: left">复检类型：
                                <span style="color: #198844">{{searchType}}</span></div>
                        </div>
                    </div>
                </div>
                <div style="margin-left: 15px; margin-top: 20px; text-align: left">原检测结果：
                    <span style="color: #198844">{{originResult}}</span>
                </div>
                <div style="display: flex;">
                    <div style="margin-left: 15px; text-align: left">原防治方案：
                        <span style="color: #198844">{{originSolution}}</span></div>
                </div>
            </div>
        </div>
        <div class="right">
            <h3>智能推荐人员</h3>
            <div class="bottom">
                <div class="search-list">
                    <input type="text" autocomplete="off"
                           id="input"
                           class="search-input"
                           v-model="input"
                           placeholder=""
                           @keyup.enter="search(0)">
                    <div class="search-icon">
                        <img src="../assets/farmCatalog/search.png" style="position: relative;
            padding: 10px; height: 20px; width: 20px">
                    </div>
                </div>
                <h4>智能推荐</h4>
                <div class="btn-gradient">
                    <div class="border-gradient">
                        <div class="wrapper">
                            <div style="position: relative; width: 25%">
                                <img :src="recommend.path" style="border-radius: 50%; margin: 10px 0 auto;
                                max-width: 70px; max-height: 70px">

                            </div>

                            <div class="info">
                                <div style="display: flex;">
                                    <p><strong>{{recommend.name}}</strong></p>
<!--                                    <div class="label">rice</div>-->
                                </div>
                                <div style="display: flex">
                                    <p>当前任务数：{{recommend.working}}</p>
                                    <p>已处理任务：{{recommend.completed}}</p>
                                </div>
                                <div style="display: flex">
                                    <button class="select" @click="selectExpert(recommend.name)">选择</button>
                                    <router-link class="select" :to="{path: '/expertsPortal', query: {name: recommend.name,
                                    button: true, id: this.$route.query.id, list: JSON.stringify(this.expertsList),}}">查看</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h4>手动选择</h4>
                <div class="la" style="width: 100%; overflow: scroll; height: 400px">
                    <div class="none" v-for="item in expertsList" v-bind:key="item">
                        <!--                    <div class="border-gradient">-->
                        <div class="normal-wrapper" >
                            <div style="position: relative; width: 25%">
                                <img :src="item.path" style="border-radius: 50%; margin: 10px 0 auto;
                                max-width: 70px; max-height: 70px;">

                            </div>

                            <div class="info">
                                <div style="display: flex; flex-wrap: wrap">
                                    <p><strong>{{item.name}}</strong></p>
<!--                                    <div class="label" v-for="(items, index) in handle(item.feature)"-->
<!--                                         v-bind:key="index">{{items}}</div>-->
                                </div>
                                <div style="display: flex">
                                    <p>当前任务数：{{item.working}}</p>
                                    <p>已处理任务：{{item.completed}}</p>
                                </div>
                                <div style="display: flex">
                                    <button class="select" @click="selectExpert(item.name)">选择</button>
                                    <router-link class="select" :to="{path: '/expertsPortal', query: {name: item.name,
                                    button: true, id: this.$route.query.id, list: JSON.stringify(this.expertsList),}}">查看</router-link>
                                </div>


                            </div>
                            <!--                        </div>-->
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import { useCommonMethods } from '@/store/CommonMethods'
    export default {
        name: "applyDetails",
        data(){
            return{
                errorType: "",
                searchType: "",
                originResult:"",
                originSolution: "",
                name: '',
                time: '',
                image: '',
                recommend: {
                    name: '',
                    working: 0,
                    completed: 0,
                    label: [],
                    path: require('../assets/images/工作人员.png')
                },
                expertsList: [
                    {
                        name: 'Xingru Jiang',
                        working: 1,
                        completed: 2,
                        path: require('../assets/images/工作人员.png')
                    }
                ]
            }
        },
        methods: {
            search(){

            },
            selectExpert(name){
                const {formatDateTime} = useCommonMethods()
                for(let i in this.expertsList){
                    if(name===this.expertsList[i].name){
                        const jsonData = {
                            manual_id: Number(this.$route.query.id),
                            choice: Number(this.expertsList[i].technic_id)
                        }
                        console.log(jsonData)
                        this.$axios({
                            method: 'post',
                            url: this.$store.state.address + 'test/finish_personal_select',
                            data: jsonData,
                        }).then(res=>{
                            console.log(res)
                        }).catch(err=>{
                            console.log(err)
                        })
                        const now = new Date()
                        const jData = {
                            manual_id: Number(this.$route.query.id),
                            time: formatDateTime(now)
                        }
                        this.$axios({
                            method: 'post',
                            url: this.$store.state.address + 'test/admin_finish_detail',
                            data: jData
                        }).then(res => {
                            console.log(res)
                        }).catch(err => {
                            console.log(err)
                        })

                        this.$router.push({path: '/tasksForManagers'})
                        break
                    }
                }
            },
            handle(str){
                // console.log(str)
                return JSON.parse(str.replace(/'/g, '"'))
            },
            lookThrough(){

            }
        },
        created(){
            const { handleImage, renameKey} = useCommonMethods();
            let jsonData = {
                manual_id: Number(this.$route.query.id)
            }
            this.$axios({
                method: 'post',
                url: this.$store.state.address + 'test/auto_select_technic',
                data: jsonData
            }).then(res=>{
                // console.log(res)
                this.recommend.name = res.data.list[0].name

                handleImage(this.recommend.name).then(url=>{
                    this.recommend.path = url
                }).catch(url=>{
                    this.recommend.path = url
                })
                // console.log(this.recommend.path)
                let jData = {
                    name: this.recommend.name
                }
                this.$axios({
                    method: "post",
                    url: this.$store.state.address + "user/check_user",
                    data: jData
                }).then(res=>{
                    this.recommend.working = res.data.list[0].working
                    this.recommend.completed = res.data.list[0].completed
                }).catch(err=>{
                    console.log(err)
                })
            }).catch(err=>{
                console.log(err)
            })
            // console.log(this.$route.query.id)
            this.$axios({
                method: 'post',
                url: this.$store.state.address + 'test/get_name_and_time',
                data: jsonData
            }).then(res=>{
                this.name = res.data.list[0].name
                this.time = res.data.list[0].time
                let name = res.data.list[0].name.split(' ')
                if(name.length===2)name = name[0]+'_'+name[1]
                let time = res.data.list[0].time.replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_')
                this.image = this.$store.state.address + 'image/pre_pic/' + name +
                    '_' + time + '.jpg'
                jsonData = {
                    manual_id: Number(this.$route.query.id),
                    time: this.time
                }
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'test/admin_check_detail',
                    data: jsonData
                }).then(res => {
                    this.errorType = res.data.list[0].type
                    this.searchType = res.data.list[0].comment
                }).catch(err => {
                    console.log(err)
                })
                jsonData = {
                    name: this.name,
                    time: this.time
                }
                // console.log(jsonData)
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'test/get_user_test_detail',
                    data: jsonData
                }).then(res=>{
                    // console.log(res)
                    this.originResult = res.data.list[0].result
                    this.originSolution = res.data.list[0].method
                }).catch(err=>{
                    console.log(err)
                })
            }).catch(err=>{
                console.log(err)
            })

            jsonData = {
                manual_id: Number(this.$route.query.id)
            }
            this.$axios({
                method: "post",
                // url: '/api/user/login',
                url: this.$store.state.address + 'test/get_technic_list',
                data: jsonData,
            })
                .then(res => {
                    // console.log(res)
                    this.expertsList = res.data.list
                    console.log(this.expertsList)
                    console.log('no')
                    renameKey(this.expertsList, 'technic_name', 'name')
                    console.log(this.expertsList)
                    for(let i in this.expertsList){
                        const jData = {
                            name: this.expertsList[i].name
                        }
                        this.$axios({
                            method: "post",
                            url: this.$store.state.address + "user/check_user",
                            data: jData
                        }).then(res => {
                            // console.log(res.data.list[0].working)
                            this.expertsList[i].working = res.data.list[0].working
                            this.expertsList[i].completed = res.data.list[0].completed
                        }).catch(err => {
                            console.log(err)
                        })
                        this.expertsList[i].path = require('../assets/images/工作人员.png')
                        handleImage(this.expertsList[i].name).then(url=>{
                            this.expertsList[i].path = url
                        }).catch(url=>{
                            this.expertsList[i].path = url
                        })
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
</script>

<style scoped lang="scss">
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
    p{
        margin: 1px;
        /*font-size: 10px;*/
        white-space: nowrap;
    }
    h4{
        margin: 0 0 0 20px;
        text-align: left;
    }
    .left{
        width: 60%;
        height: 90%;
        display: block;
        text-align: center;
        margin: 20px auto;
    }
    .item{
        display: flex;
    }
    .bottom{
        /*display: flex;*/
        width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
    }
    .label{
        margin: 5px;
        font-size: 10px;
        color: white;
        padding: 5px;
        background-color: #5ac8fa;
        border-radius: 30px;
    }
    .right{
        display: block;
        text-align: center;
        width: 30%;
        height: 90%;
        /*border-radius: 10px;*/
        /*box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);*/
        margin: 20px auto;
    }
    .search-list{
        display: flex;
        margin: 10px auto;
        /*justify-content: center;*/
        width: 50%;
        height: 50px;
    }
    .search-input{
        position: relative;
        font-size: 18px;
        width: 130px;
        height: 30px;
        padding: 0 20px 0 10px;
        border-radius: 20px;
        border-color: #505050;
        margin: 20px 10px;
        /*border: none;*/
    }
    .search-icon{
        width: 40px;
        height: 40px;
        margin: 20px 13px;
        /*line-height: 50px;*/
        border-radius: 50%;
        border-color: #505050;
        box-shadow: 0 0 5px;
        /*margin: auto;*/
    }
    .btn-gradient {
        align-items: center;
        color: #000;
        display: inline-flex;
        justify-content: center;
        text-decoration: none;
        transition: all 0.3s ease-in-out;
        margin: 10px auto;
        width: 90%;

    &:hover .border-gradient {
         background-position: 100% center;
     }
    }

    .border-gradient {
        background-image: linear-gradient(90deg, #368d8d, #0f0 50%, #00f);
        background-size: 250%;
        border-radius: 10px;
        display: inline-block;
        padding: 3px;
        position: relative;
        transition: background-position .5s;
        width: 100%;
    }

    .wrapper {
        align-items: flex-start;
        background-color: white;
        border-radius: 8px;
        box-shadow: rgba(37, 39, 41, 0.4) 0 5px 15px;
        display: flex;
        font-family: "Open Sans", sans-serif;
        transition: all .3s ease-in-out;
    }
    .wrapper:hover .select{
        display: block;
    }
    .normal-wrapper{
        align-items: flex-start;
        background-color: white;
        border-radius: 8px;

        display: flex;
        /*width: 100%;*/
        font-family: "Open Sans", sans-serif;
        transition: all .3s ease-in-out;
    }
    .normal-wrapper:hover .select{
        display: block;

    }
    .normal-wrapper:hover{
        box-shadow: rgba(37, 39, 41, 0.4) 0 5px 15px;
    }
    .select{
        display: none;
        background-color: black;
        color: white;
        margin: 5px auto;
        padding: 5px 10px;
        border-radius: 10px;
        transition: all .3s ease-in-out;
        text-decoration: none;
        /*font-size: 15px;*/
    }
    .info{
        margin-top: 10px;
    }
    .none{
        width: 90%;
        margin: 10px auto;

    }
</style>