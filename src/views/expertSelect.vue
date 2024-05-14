<template>
    <div style="width:100%; display: flex">
        <div class="left">
            <h3>{{username}}的复检申请</h3>
            <div class="bottom">
                <div style="display: flex">

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
                <div style="margin-left: 5px; margin-top: 20px; text-align: left">原检测结果：
                    <span style="color: #198844">{{originResult}}</span>
                </div>
                <div style="display: flex;">
                    <div style="margin-left: 5px; text-align: left">原防治方案：
                        <span style="color: #198844">{{originSolution}}</span></div>
                </div>
                <img :src="path" style="width:auto; height: auto; max-height: 64%; max-width: 90%;
                border-radius: 10px;margin-top: 10px; float: left; margin-left:20px;">
            </div>

        </div>
        <div class="right">
            <h3>人工复检</h3>
            <div class="bottom">
                <div style="width: 100%; height: 10px"></div>
                <div class="result">检测结果：<span id="result" contenteditable="true"></span></div>
                <div class="solution">防治方案：<span id="solution" contenteditable="true"></span></div>
                <border-button content="确定" up-down="10px" left-right="25px"
                               @click="complete" class="button"></border-button>
            </div>

        </div>
    </div>
</template>

<script>
    import { useCommonMethods } from '@/store/CommonMethods'
    import BorderButton from "@/components/borderButton";
    export default {
        name: "expertSelect",
        components: {BorderButton},
        data(){
            return{
                username: '',
                time: '',
                searchType: '',
                errorType: '',
                path: '',
                originResult: '',
                originMethod: '',
            }
        },
        methods: {
            complete(){
                const {formatDateTime} = useCommonMethods()
                let result = document.getElementById('result').textContent;
                let solution = document.getElementById('solution').textContent;
                let time = new Date()

                const jsonData = {
                    manual_id: Number(this.$route.query.id),
                    time: formatDateTime(time),
                    result: result,
                    method: solution,
                }
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'test/technic_finish_detail',
                    data:jsonData
                }).then(res => {
                    // console.log(res)
                    if(res.status===200){

                        this.$router.push({path: '/tasksForExperts'})
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted(){
            const {dateToImage} = useCommonMethods()
            let jsonData = {
                manual_id: Number(this.$route.query.id)
            }
            this.$axios({
                method: 'post',
                url: this.$store.state.address + 'test/get_name_and_time',
                data: jsonData
            }).then(res => {
                // console.log(res)
                this.username = res.data.list[0].name
                this.time = res.data.list[0].time
                this.path = dateToImage(this.username, this.time)
                jsonData = {
                    manual_id: Number(this.$route.query.id),
                    time: this.time
                }
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'test/technic_check_detail',
                    data: jsonData
                }).then(res => {
                    this.errorType = res.data.list[0].comment
                    this.searchType = res.data.list[0].type
                }).catch(err => {
                    console.log(err)
                })
                jsonData = {
                    name: this.username,
                    time: this.time
                }
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
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .result {
        text-align: left;
        width: 95%;
        margin: 10px auto;
        height: auto; /* 调整为需要的高度，或者移除以允许内容决定高度 */
    }

    .result span {
        text-align: left;
        color: #198844
        /*margin: 10px;*/
    }
    .solution {
        text-align: left;
        width: 95%;
        margin: 10px auto;
        height: auto; /* 调整为需要的高度，或者移除以允许内容决定高度 */
    }

    .solution span {
        text-align: left;
        color: #198844
        /*margin: 10px;*/
    }

    .button{
        position: absolute;
        bottom: 20px;
        left: 83%;
        cursor: pointer;
        /*transform: translateX(-50%);*/
    }
    .left{
        width: 60%;
        height: 90%;
        display: block;
        text-align: center;
        margin: 20px auto;
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
    .bottom{
        /*display: flex;*/
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
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