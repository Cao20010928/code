<template>
    <button class="view-modal" @click="openPop">点击分享</button>
    <div class="popup">
        <header>
            <span>申请复检</span>
            <div class="close" @click="closePopUp">
<!--                <link rel="stylesheet" href="./src/assets/icon/iconfont.css">-->
                <i class="iconfont icon-guanbi" ></i>
            </div>
        </header>
        <div class="content">
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

            </el-form>
            <div class="field">
<!--                <i class="url-icon uil uil-link"></i>-->
<!--                <input type="text" readonly value="https://b23.tv/WdFTbnF">-->
                <button class="left-button" @click="closePopUp">取消</button>
                <button class="right-button" @click="changeInfo">确定</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "popUp",
        props: ['name', 'time'],
        data() {
            return{
                new_username: '',
                new_email: '',
                new_telephone: '',
                new_avatar: [],
                old_username: '',
                old_email: '',
                old_telephone: '',
                form: {
                    type: [],
                    desc: ''
                }
            }
        },
        inject: ['updateBaseInfo', 'checkImg'],
        methods: {
            openPop(){
                const popup = document.querySelector(".popup")
                popup.classList.toggle("show");
            },
            closePopUp(){
                const viewBtn = document.querySelector(".view-modal")
                viewBtn.click()
            },
            changeInfo(){
                const jsonData = {
                    name: JSON.parse(sessionStorage.getItem('baseInfo')).username,
                    time: this.time,
                    type: this.form.type[0],
                    comment: this.form.desc
                }
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'test/auto_comment',
                    data: jsonData
                }).then(res=>{

                    if(res.data.status===200){
                        this.$message({
                            message: '复检请求正在处理中',
                            showClose: true,
                            type: 'success',
                        })
                        this.closePopUp()
                    }
                }).catch(err=>{
                    console.log(err)
                })

            },

        },
        mounted(){

        }
    }

</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }
    /*body{*/
    /*    !* background: #f2f3fb; *!*/
    /*    background: #7d2ae8;*/
    /*}*/
    /*::selection{*/
    /*    color: #fff;*/
    /*    background: #7d2ae8;*/
    /*}*/
    .icon-guanbi{
        color: #5e616d;
        font-size: 20px;
        z-index: 99;
    }
    .icon-guanbi:hover{
        color: #a7a8bd;
    }
    .iconfont{
        font-size: 20px;
    }
    .view-modal, .popup{
        position: absolute;
        z-index: 99;
        /*display: none;*/
        opacity: 0;
        left: 50%;
    }
    input{
        color: #acacac;
        line-height: 40px;
        margin-top: 7px;
        margin-left: 10px;
    }
    button{
        outline: none;
        cursor: pointer;
        font-weight: 500;
        border-radius: 4px;
        border: 2px solid transparent;
        transition: background 0.1s linear, border-color 0.1s linear, color 0.1s linear;
    }
    .input-field input {
        background: none;
        outline: none;
        border: none;
        line-height: 1;
        font-weight: 500;
        font-size: 1.1rem;
        color: #333;
    }

    .input-field input::placeholder {
        /*margin-top: 100px;*/
        color: #aaa;
        font-weight: 500;
    }
    .view-modal{
        top: 0;
        color: #7d2ae8;
        font-size: 18px;
        padding: 10px 25px;
        background: #fff;
        transform: translate(-50%, -50%);
    }
    .popup{
        background: #fff;
        padding: 25px;
        border-radius: 15px;
        top: -150%;
        max-width: 380px;
        width: 100%;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0px 10px 15px rgba(0,0,0,0.1);
        transform: translate(-50%, -50%) scale(1.2);
        transition: top 0s 0.2s ease-in-out,
        opacity 0.2s 0s ease-in-out,
        transform 0.2s 0s ease-in-out;
    }
    .popup.show{
        top: 50%;
        opacity: 1;
        pointer-events: auto;
        transform:translate(-50%, -50%) scale(1);
        transition: top 0s 0s ease-in-out,
        opacity 0.2s 0s ease-in-out,
        transform 0.2s 0s ease-in-out;

    }
    .popup :is(header, .icons, .field){
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .popup header{
        padding-bottom: 15px;
        border-bottom: 1px solid #ebedf9;
    }
    header span{
        font-size: 21px;
        font-weight: 600;
    }
    header .close, .icons a{
        display: flex;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
        transition: all 0.3s ease-in-out;
    }
    header .close{
        color: #878787;
        font-size: 17px;
        background: #f2f3fb;
        height: 33px;
        width: 33px;
        cursor: pointer;
    }
    header .close:hover{
        background: #ebedf9;
    }
    .popup .content{
        /*margin: 20px 0;*/
    }
    .popup .icons{
        margin: 15px 0 20px 0;
    }
    .content p{
        font-size: 16px;
    }
    .content .icons a{
        height: 50px;
        width: 50px;
        font-size: 20px;
        text-decoration: none;
        border: 1px solid transparent;
    }
    .icons a i{
        transition: transform 0.3s ease-in-out;
    }
    .icons a:nth-child(1){
        color: #8BC7FF;
        border-color: #B9E8FF;
    }
    .icons a:nth-child(1):hover{
        background: #2EDDFF;
    }
    .icons a:nth-child(2){
        color: #8BEBC1;
        border-color: #9AF2D1;
    }
    .icons a:nth-child(2):hover{
        background: #5DFF99;
    }
    .icons a:nth-child(3){
        color: #6C6C6C;
        border-color: #9D9D9D;
    }
    .icons a:nth-child(3):hover{
        background: #000000;
    }
    .icons a:nth-child(4){
        color: #FF4668;
        border-color: #FFAEA2;
    }
    .icons a:nth-child(4):hover{
        background: #FF2E2E;
    }
    .icons a:nth-child(5){
        color: #8BC7FF;
        border-color: #5DDDFF;
    }
    .icons a:nth-child(5):hover{
        background: #00C6FF;
    }
    .icons a:hover{
        color: #fff;
        border-color: transparent;
    }
    .icons a:hover i{
        transform: scale(1.2);
    }
    .content .field{
        margin: 12px 0 -5px 0;
        height: 45px;
        display: flex;
        justify-content: space-around;
        border-radius: 4px;
        padding: 0 5px;
        border: 1px dashed #e1e1e1;
    }
    .input-field {
        max-width: 335px;
        width: 100%;
        background-color: #f0f0f0;
        margin: 10px 0;
        height: 40px;
        border-radius: 55px;
        /*display: grid;*/
        /*grid-template-columns: 15% 85%;*/
        padding: 0 0.4rem;
        position: relative;
    }
    .avatar{
        max-width: 120px;
        width: 100%;
        background-color: #93b5cf;
        margin: 10px auto;
        height: 40px;
        border-radius: 55px;
        padding: 0 0.4rem;
        position: relative;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color: #fff;
        transition: 0.3s;
    }
    .avatar:hover{
        background-color: #3170a7;
    }
    .avatar input{
        position: absolute;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 15px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .field:active{
        border-color: #7d2ae8;
    }
    .field i{
        width: 50px;
        font-size: 18px;
        text-align: center;
    }
    .field.active i{
        color: #7d2ae8;
    }
    .field input{
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 15px;
    }
    .right-button{
        color: #fff;
        padding: 4px 15px;
        background: #7d2ae8;

    }
    .right-button:hover{
        background: #8d39fa;
    }
    .left-button{
        color: #fff;
        padding: 4px 15px;
        background: #158b88;

    }
    .left-button:hover{
        background: #5cb3cc;
    }
</style>