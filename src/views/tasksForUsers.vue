<template>
    <div class="stuff">
<!--        <div class="top">-->
<!--            <button class="already" @click="changeTabs">已检测任务数：-->
<!--                <div class="num1">23</div>-->
<!--            </button>-->
<!--            <button class="toDo" @click="changeTabsX">待检测任务数：-->
<!--                <div class="num2">2</div>-->
<!--            </button>-->
<!--            <div class="line"></div>-->
<!--        </div>-->
        <div class="content">
            <el-tabs class="demo-tabs" v-model="activeName" @tab-click="handleClick" style="margin-left: 20px">
                <el-tab-pane label="已检测任务" name="first">
                    <div class="applicant" v-for="item in completed" v-bind:key="item">
                        <h3 style="font-size: 15px; margin-left: 10px">{{item.auto_time}}的复检申请</h3>
                        <div class="bottle">
                            <img :src="item.image" style="max-width: 110px; max-height: 110px;
                border-radius: 10px;margin: 0px 10px">
                            <div class="words">
                                <div><b>复检类型：</b>{{item.topic}}</div>
                                <div><b>复检理由：</b>{{item.comment}}</div>
                            </div>
                            <router-link class="button"
                                         :to="{path:'/tasksForUsers/taskDetails',
                                         query: {time: item.auto_time,
                                         image: item.image, show: true}}">查看详情</router-link>
                        </div>

                        <hr style="width: 95%; margin: 10px auto">

                    </div>
                    <div class="applicant" v-for="item in toBeCheck" v-bind:key="item">
                        <h3 style="font-size: 15px; margin-left: 10px">{{item.auto_time}}的复检申请</h3>
                        <div class="bottle">
                            <img :src="item.image" style="max-width: 110px; max-height: 110px;
                border-radius: 10px;margin: 0px 10px">
                            <div class="words">
                                <div><b>检测结果：</b>{{item.result}}</div>
                                <div><b>防治方法：</b>{{item.method}}</div>
                            </div>
                            <div class="button" @click="openPop(item.auto_time)">申请复检</div>
                        </div>

                        <hr style="width: 95%; margin: 10px auto">

                    </div>
                </el-tab-pane>
                <el-tab-pane label="待检测任务" name="second">
                    <div class="applicant" v-for="item in waitList" v-bind:key="item">
                        <h3 style="font-size: 15px; margin-left: 10px">{{item.auto_time}}的复检申请</h3>
                        <div class="bottle">
                            <img :src="item.image" style="max-width: 110px; max-height: 110px;
                border-radius: 10px;margin: 0px 10px">
                            <div class="words">
                                <div><b>复检类型：</b>{{item.topic}}</div>
                                <div><b>复检理由：</b>{{item.comment}}</div>
                            </div>
                            <router-link class="button"
                            :to="{path:'/tasksForUsers/taskDetails', query: {time: item.auto_time,
                            image: item.image, show: false}}">查看详情</router-link>
                        </div>
                        <div style="width: auto; margin: 10px 100px">
                            <el-steps :space="200" :active="active(item.stage)" finish-status="success" align-center>
                                <el-step title="系统调度" />
                                <el-step title="管理人员委派" />
                                <el-step title="技术人员检测" />
                            </el-steps>
                        </div>
                        <hr style="width: 95%; margin: 0 auto">


                    </div>
                </el-tab-pane>
            </el-tabs>

        <detect-again :time="time"></detect-again>
        </div>
    </div>

</template>

<script>
    import detectAgain from "@/components/detectAgain";
    export default {
        name: "tasksForUsers",
        components: {
            detectAgain
        },
        data(){
            return{
                activeName: 'first',
                showTabs: false,
                completed: [],
                waitList: [],
                toBeCheck: [],
                time: ''
            }
        },
        methods: {
            openPop(time) {
                const popup = document.querySelector(".popup");
                popup.classList.toggle("show");
                this.time = time
            },
            active(stage){
                if(stage==='adminSelect')
                    return 1
                else if(stage==='technicJudge')
                    return 2
                else return 0
            },
            changeTabs(){
                this.showTabs = true
            },
            changeTabsX(){
                this.showTabs = false

            }
        },
        mounted(){
            const jsonData = {
                name: sessionStorage.getItem('name')
            }
            console.log(this.$store.state.address)
            this.$axios({
                method: "post",
                url: this.$store.state.address + "test/get_user_test_list",
                data: jsonData
            })
                .then(res => {
                    console.log(res)
                    for(let i in res.data.list[0]){
                        let task = res.data.list[0][i]
                        let name = sessionStorage.getItem('name').split(' ')
                        // console.log(name)
                        let picName = name[0]+'_'+name[1]
                        let time = task.auto_time.replace(/:/g, '_')
                        time = time.replace(/-/g, '_')
                        time = time.replace(' ', '_')
                        task['image'] = this.$store.state.address +'image/pre_pic/'+ picName +
                            '_' + time + '.jpg'
                        // console.log(task)
                        if("stage" in res.data.list[0][i] && res.data.list[0][i].stage !== 'completed'){
                            // console.log(res.data.list[0][i].topic)

                            this.waitList.push(task)
                        }
                        else if("stage" in res.data.list[0][i]){
                            this.completed.push(task)
                        }
                        else this.toBeCheck.push(task)
                    }

                    // console.log('no')
                    console.log(this.waitList)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
</script>

<style scoped>
    .stuff{
        width: 100%;
        display: block;
    }
    .top{
        margin-left: 20px;
        display: flex;
        height: 4%;
        width: auto;
    }
    .num1{
        color: #5ac8fc;
    }
    .num2{
        color: #ff3b30;
    }
    .already{
        display: flex;
        width: 130px;
        justify-content: center;
        align-items: baseline;
        margin: 20px;
        border: none;
        /*padding: 0;*/
        background-color: white;
        cursor: pointer;
        /*height: 50px;*/
    }
    .already:hover{
        color: #5ac8fc;
    }
    .toDo{
        display: flex;
        width: 130px;
        justify-content: center;
        align-items: baseline;
        margin: 20px;
        border: none;
        /*padding: 0;*/
        background-color: white;
        cursor: pointer;
    }
    .toDo:hover{
        color: #ff3b30;
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
    .content{
        width: 92%;
        height: 90%;
        margin: 20px auto;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        overflow: scroll;
    }
    .bottle{
        display: flex;
    }
    .button{
        border: none;
        text-decoration: none;
        border-radius: 10px;
        display: block;
        /*position: absolute;*/
        /*right: 30px;*/
        margin: auto;
        padding: 5px 20px;
        font-size: 20px;
        /*height: 50px;*/
        background: #74759b;
        cursor: pointer;
        user-select: none;
        color: white;
        transition: .3s ease-in-out;
        /*overflow: hidden;*/
    }
    .button:hover{
        background: #ccccd6;
    }
    .words{
        width: 70%;
    }
    .line{
        position: absolute;
        background-color: #3fa7f5;
        left: 410px;
        top: 120px;
        width: 105px;
        height: 1px;
    }
</style>