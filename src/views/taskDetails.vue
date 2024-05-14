<template>
    <div class="stuff">
        <div class="content">
            <div class="bottle">
                <div>
                    <img :src="this.$route.query.image" style="max-width: 160px; max-height: 160px;
                border-radius: 10px;margin: 10px 10px">
                    <h3 style="font-size: 15px;">{{this.$route.query.time}}的复检申请</h3>
                </div>

                <div>
                    <div class="words"><b>原检测结果：</b>{{result.result}}</div>
                    <div class="words" v-if="result.manual"><b>人工检测结果：</b>
                        {{result.manual.manual_result ? result.manual.manual_result: '暂无数据'}}
                    </div>
                    <div class="words" v-if="result.manual"><b>技术人员任务开始时间：</b>
                        {{result.manual.technic_start_time ? result.manual.technic_start_time: '暂无数据'}}
                    </div>
                    <div class="words" v-if="result.manual"><b>技术人员任务结束时间：</b>
                        {{result.manual.technic_end_time ? result.manual.technic_end_time: '暂无数据'}}
                    </div>
                </div>
                <div>
                    <div class="words" v-if="result.manual"><b>复检技术人员：</b>
                        <span @click="jumpPortal(result.manual.technic_name, true)">
                            {{result.manual.technic_name ? result.manual.technic_name: '暂无数据'}}
                        </span>
                    </div>
                    <div class="words" v-if="result.manual"><b>复检管理人员：</b>
                        <span @click="jumpPortal(result.manual.admin_name, false)">
                            {{result.manual.admin_name ? result.manual.admin_name : '暂无数据'}}
                        </span>
                    </div>
                    <div class="words" v-if="result.manual"><b>管理人员任务开始时间：</b>
                        {{result.manual.admin_start_time ? result.manual.admin_start_time : '暂无数据'}}
                    </div>
                    <div class="words" v-if="result.manual"><b>管理人员任务结束时间：</b>
                        {{result.manual.admin_end_time ? result.manual.admin_end_time : '暂无数据'}}
                    </div>
                </div>

            </div>
            <div class="words"><b>原防治方案：</b>{{result.method}}</div>
            <div class="words" v-if="result.manual"><b>人工防治方案：</b>
                {{result.manual.manual_method ? result.manual.manual_method : '暂无数据'}}
            </div>
            <div class="words" v-show="this.$route.query.show==='true'">
                <div>
                    <b>评价技术人员：</b>
                    <div id="ex" contenteditable="true" style="border: solid black; border-radius: 5px"></div>
                </div>
                <div><b>为技术人员打分：</b><el-rate v-model="valueExperts"></el-rate></div>
                <border-button content="确认提交" up-down="5px" left-right="10px" @click="judgeEx"></border-button>
            </div>
            <div class="words" v-show="this.$route.query.show==='true'">
                <div><b>为管理人员打分：</b><el-rate v-model="valueManagers"></el-rate></div>
                <border-button content="确认提交" up-down="5px" left-right="10px" @click="judgeAdmin"></border-button>
            </div>

        </div>
    </div>
</template>

<script>
    import borderButton from "@/components/borderButton";
    export default {
        name: "taskDetails",
        components: {
            borderButton
        },
        data(){
            return{
                result: {},
                valueExperts: 0,
                valueManagers: 0
            }
        },
        methods: {
            judgeEx(){
                let comment = document.getElementById('ex').textContent
                const jsonData = {
                    name: sessionStorage.getItem('name'),
                    comment: comment,
                    score: this.valueExperts.toFixed(1),
                    manual_id : Number(this.result.manual.manual_id)
                }
                // console.log(jsonData)
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'test/user_technic_score',
                    data: jsonData
                }).then(res => {
                    console.log(res)
                    this.$message({
                        message: '评价成功',
                        showClose: true,
                        type: 'success',
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            judgeAdmin(){
                const jsonData = {
                    name: sessionStorage.getItem('name'),
                    score: this.valueManagers.toFixed(1),
                    manual_id: Number(this.result.manual.manual_id)
                }
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'test/user_admin_score',
                    data: jsonData
                }).then(res => {
                    console.log(res)
                    this.$message({
                        message: '评价成功',
                        showClose: true,
                        type: 'success',
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            jumpPortal(name, tell){
                if(name===undefined)return
                if(tell){
                    this.$router.push({path: '/expertsPortal', query: {name: name}})
                }
                else{
                    this.$router.push({path: '/managersPortal', query: {name: name}})
                }
            }
        },
        mounted(){
            console.log(this.$route.query.time)
            const jsonData = {
                name: sessionStorage.getItem('name'),
                time: this.$route.query.time
            }
            this.$axios({
                method: 'post',
                url: this.$store.state.address + '/test/get_user_test_detail',
                data: jsonData
            }).then(res=>{
                console.log(res)
                this.result = res.data.list[0]

            }).catch(err=>{
                console.log(err)
            })
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
    .words span:hover{
        color: #3fa7f5;
        cursor: pointer;
    }
    .stuff{
        width: 100%;
        display: block;
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
        justify-content: space-around;
    }
    .words{
        margin: 10px 10px;
    }
</style>