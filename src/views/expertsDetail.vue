<template>
    <div style="width: 100%">
        <div class="left">
            <h3>{{username}}的复检申请</h3>
            <div class="bottom">
                <div style="display: flex">
                    <img :src="path" style="max-width: 150px; max-height: 150px;
                border-radius: 10px;margin-top: 20px; float: left; margin-left:20px;">
                    <div class="words">
                        <div style="display: flex;">
                            <div style="margin-left: 5px; margin-top: 20px; text-align: left">错误类型：
                                <span style="color: #198844">{{searchType}}</span>
                            </div>
                        </div>
                        <div style="display: flex;">
                            <div style="margin-left: 5px; text-align: left">复检类型：
                                <span style="color: #198844">{{errorType}}</span></div>
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
                <div style="margin-left: 5px; margin-top: 20px; text-align: left">人工检测结果：
                    <span style="color: #198844">{{manualResult? manualResult: '暂无数据'}}</span>
                </div>
                <div style="margin-left: 5px; text-align: left">人工防治方案：
                    <span style="color: #198844">{{manualMethod? manualMethod: '暂无数据'}}</span>
                </div>
                <div class="info">
                    <div>技术人员姓名：<span id="expert" @click="baseInfo(expert.name, false)">
                        {{expert.name? expert.name: '暂无数据'}}</span></div>
                    <div>技术人员邮件：<span>{{expert.email? expert.email: '暂无数据'}}</span></div>
                    <div>技术人员电话：<span>{{expert.telephone? expert.telephone: '暂无数据'}}</span></div>
                    <div>技术人员任务开始时间：<span>{{expert.start? expert.start: '暂无数据'}}</span></div>
                    <div>技术人员任务结束时间：<span>{{expert.end? expert.end: '暂无数据'}}</span></div>
                </div>
                <div class="info">
                    <div>管理人员姓名：<span id="admin" @click="baseInfo(admin.name, true)">{{admin.name}}</span></div>
                    <div>管理人员邮件：<span>{{admin.email}}</span></div>
                    <div>管理人员电话：<span>{{admin.telephone}}</span></div>
                    <div>管理人员任务开始时间：<span>{{admin.start}}</span></div>
                    <div>管理人员任务结束时间：<span>{{admin.end}}</span></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {useCommonMethods} from "@/store/CommonMethods";

    export default {
        name: "expertsDetail",
        data(){
            return{
                username: '',
                time: '',
                searchType: '',
                errorType: '',
                path: '',
                originResult: '',
                originMethod: '',
                manualResult: '',
                manualMethod: '',
                expert: {
                    name: '',
                    email: '',
                    start: '',
                    end: '',
                    telephone: ''
                },
                admin: {
                    name: '',
                    email: '',
                    start: '',
                    end: '',
                    telephone: ''
                }
            }
        },
        methods: {
            baseInfo(name, tell){
                if(tell){
                    this.$router.push({path: '/managersPortal', query: {name: name}})
                }
                else {
                    this.$router.push({path: '/expertsPortal', query: {name: name}})
                }

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
                    this.manualResult = res.data.list[0].manual.manual_result
                    this.manualMethod = res.data.list[0].manual.manual_method
                    this.expert.name = res.data.list[0].manual.technic_name
                    this.expert.email = res.data.list[0].manual.technic_email
                    this.expert.start = res.data.list[0].manual.technic_start_time
                    this.expert.end = res.data.list[0].manual.technic_end_time
                    this.expert.telephone = res.data.list[0].manual.technic_telephone
                    this.admin.name = res.data.list[0].manual.admin_name
                    this.admin.email = res.data.list[0].manual.admin_email
                    this.admin.start = res.data.list[0].manual.admin_start_time
                    this.admin.end = res.data.list[0].manual.admin_end_time
                    this.admin.telephone = res.data.list[0].manual.admin_telephone
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
    .left{
        width: 60%;
        height: 90%;
        display: block;
        text-align: center;
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
    .info{
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
    }
    .info span{
        color: #198844
    }
    .info div{
        margin: 0 5px;
    }
    #admin:hover{
        color: #3fa7f5;
        cursor: pointer;
    }
    #expert:hover{
        color: #3fa7f5;
        cursor: pointer;
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