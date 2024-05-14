<template>
    <div class="content">
        <div class="top">
            <img :src="path" class="image">
            <div class="top_left">
                <p style="font-weight: bold">{{name}}</p>
                <p>年龄：38</p>
            </div>
            <div class="top_center">
                <p>性别：男</p>
                <p>综合评分：{{score}}</p>
            </div>
            <div class="top_left">
                <p>当前任务数：{{working}}</p>
                <p>已处理任务数：{{completed}}</p>
            </div>
        </div>
        <div class="medium">
            <h2>个人简介</h2>
            <p style="color: #198844">{{comment}}</p>
        </div>
        <div class="bottom">
            <h2>评价详情</h2>
            <div style="overflow: scroll; height: 390px;">
                <div v-for="item in commentList" :key="item">
                    <p style="color: #c2c2c2">{{item.name}}</p>
                    <p style="color: #5856d6">{{item.comment}}</p>
                    <p style="color: #c2c2c2; text-align: right">评分：{{item.score}}</p>
                    <hr>
                </div>
            </div>

            <border-button content="选择" up-down="10px" left-right="25px" @click="selectExpert(this.$route.query.name)"
                           v-show="this.$route.query.button==='true'" class="button"></border-button>
        </div>

    </div>

</template>

<script>
    import BorderButton from "@/components/borderButton";
    import {useCommonMethods} from "@/store/CommonMethods";
    export default {
        name: "expertsPortal",
        components: {BorderButton},
        data(){
            return{
                name: '',
                type: '',
                email: '',
                telephone: '',
                comment: '',
                emotion: 0,
                score: 0,
                working: 0,
                completed: 0,
                commentList: [],
                path: '',
                items: []
            }
        },
        methods: {
            selectExpert(name){

                const {formatDateTime} = useCommonMethods()
                // console.log(this.$route.query.list)
                this.items = this.$route.query.list ? JSON.parse(this.$route.query.list) : []
                console.log(this.items)
                console.log(name)
                for(let i in this.items){
                    // console.log(this.$route.query.list[i])
                    if(name===this.items[i].name){
                        const jsonData = {
                            manual_id: Number(this.$route.query.id),
                            choice: Number(this.items[i].technic_id)
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
                        this.$message({
                            message: '选择成功',
                            showClose: true,
                            type: 'success',
                        })
                        this.$router.push({path: '/tasksForManagers'})
                        break
                    }
                }
            },
        },
        mounted(){
            // console.log(typeof this.$route.query.button)
            const {handleImage} = useCommonMethods()
            this.name = this.$route.query.name
            handleImage((this.name)).then(res => {
                this.path = res
            }).catch(err => {
                this.path = err
            })
            const jsonData = {
                name: this.$route.query.name
            }
            // console.log(this.$route.query.name)
            this.$axios({
                method: 'post',
                url: this.$store.state.address + "user/check_user",
                data: jsonData
            })
                .then(res => {
                    console.log(res)
                    this.comment = res.data.list[0].comment
                    this.telephone = res.data.list[0].telephone
                    this.email = res.data.list[0].email
                    this.emotion = res.data.list[0].emotion
                    this.score = res.data.list[0].score
                    this.working = res.data.list[0].working
                    this.completed = res.data.list[0].completed
                    this.commentList = res.data.list.slice(1)

            })
                .catch(err => {
                    console.log(err)
                })
        }
    }
</script>

<style scoped>
    .image{
        padding: 15px;
        width: 70px; height: 70px;
        border-radius: 20px;
    }
    .content{
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        position: relative;
        /*left: calc(50% - 75px);*/
        width: 80%;
        margin: 10px auto;
    }
    .top{
        width: 60%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .medium{
        margin: 5px 43px;
    }
    .bottom{
        margin: 5px 43px;
        /*overflow: scroll;*/
    }
    p{
        margin: 5px;
    }
    .button{
        position: absolute;
        cursor: pointer;
        left: 50%; /* 如果也需要水平居中 */
        bottom: 10px;
        /*width: 100px;*/
        font-size: 20px;
        transform: translateX(-50%);
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

</style>