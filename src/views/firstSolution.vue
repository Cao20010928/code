<template>
    <div style="width: 60%; margin: 0 auto">
        <div class="result">
            <h3 style="text-align: center;">{{result}}</h3>
            <div class="middle">
                <img class="image" :src="URL">
                <p style="margin: 10px 10px">{{method}}</p>
            </div>
        </div>
        <div class="rating">
            <div class="left">
                不满意？
                <div class="router" @click="manualWork">申请人工复测</div>
            </div>
            <div class="right">
                为该报告评分：
                <el-rate v-model="value"></el-rate>
            </div>
        </div>
        <el-dialog title="复测申请" v-model="dialogFormVisible" class="dialog">
            <el-form :model="form" label-width="120px">

                <el-form-item label="复检原因">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="作物种类错误" name="type" />
                        <el-checkbox label="病虫害种类错误" name="type" />
                        <el-checkbox label="病虫害诊断方案错误" name="type" />
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="具体原因">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    // import { reactive } from 'vue'

    // do not use same name with ref

    export default {
        name: "firstSolution",
        data(){
            return{
                value: null,
                method: '',
                result: '',
                URL: '',
                form: {
                    type: [],
                    desc: '',
                },
                dialogFormVisible: false
            }
        },
        methods:{
            manualWork(){
                this.dialogFormVisible = true
                // console.log(this.dialogFormVisible)
            },
            onSubmit(){
                this.dialogFormVisible = false
                const jsonData = {
                    name: JSON.parse(sessionStorage.getItem('baseInfo')).username,
                    time: this.$route.query.time,
                    type: this.form.type[0],
                    comment: this.form.desc
                }
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'test/auto_comment',
                    data: jsonData
                }).then(res=>{

                   console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        mounted(){
            this.method = this.$route.query.method
            this.result = this.$route.query.result
            this.time = this.$route.query.time
            this.URL = JSON.parse(sessionStorage.getItem('baseInfo')).username +'_'+ this.time
            this.URL = this.URL.replace(/ /g, '_')
            this.URL = this.URL.replace(/-/g, '_')
            this.URL = this.URL.replace(/:/g, '_')
            this.URL = this.$store.state.address + 'image/pre_pic/' + this.URL + '.jpg'
            console.log(this.URL)
            // console.log(this.URL[22])
        }
    }
</script>

<style scoped>
    .result{
        /*display: flex;*/
        background-color: #8c8c8c;
        width: 100%;
        height: fit-content;
        border-radius: 10px;
        margin: 30px auto;
    }
    .rating{
        display: flex;
        justify-content: space-between;
    }
    .left{
        display: flex;
    }
    .dialog{
        border-radius: 20px;
    }
    .router{
        color: #5856d6;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
    }
    .router:hover{
        color: #00aeec;
    }
    .right input{
        display: none;
    }
    .right label{
        display: block;
        cursor: pointer;
        width: 50px;
    }
    .right label:before{
        content: '\f005';
        position: relative;
        display: block;
        font-size: 50px;
        color: #101010;
    }
    .right label:after{
        content: '\f005';
        position: absolute;
        display: block;
    }
    .middle{
        display: flex;
    }
    .image{
        max-height: 250px;
        max-width: 250px;
        border-radius: 10px;
        margin: 10px;
    }
</style>