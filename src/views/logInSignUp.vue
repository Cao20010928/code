<template>

    <div class="container" :class="{'sign-up-mode': !loginMode}">
        <div class="forms-container">
            <div class="signin-signup">
                <form class="sign-in-form">
                    <h2 class="login-title">登录</h2>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" v-model="login_username" placeholder="用户名" />
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" v-model="login_password" placeholder="密码" @keyup.enter="login"/>
                    </div>

                    <button @click="login" class="btn" @click.prevent="btn">立即登录</button>
                </form>
                <form action="#" class="sign-up-form">
                    <h2 class="login-title">注册</h2>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" v-model="register_username" placeholder="用户名" />
                    </div>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="email" v-model="register_mail" placeholder="邮箱" />
                    </div>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="text" v-model="register_telephone" placeholder="电话" />
                    </div>
                    <div class="radio">
                        <input type="radio" value="customer" v-model="register_type"/>
                        <label style="line-height: 53px">用户</label>
                        <input type="radio" value="technic" v-model="register_type"/>
                        <label style="line-height: 53px">技术人员</label>
                        <input type="radio" value="admin" v-model="register_type"/>
                        <label style="line-height: 53px">管理人员</label>
                        <input type="radio" value="operator" v-model="register_type"/>
                        <label style="line-height: 53px">运维人员</label>
                    </div>

                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" v-model="register_password1" placeholder="密码" />
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" v-model="register_password2" placeholder="确认密码" />
                    </div>
                    <button class="btn" @click="register" @click.prevent="btn">立即注册</button>
                    <!--<input class="btn" value="立即注册" @click="register"/>-->
                </form>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>加入我们</h3>
                    <p>
                        加入我们，成为本站的一份子。
                    </p>
                    <button class="btn transparent" id="sign-up-btn" @click="loginMode = false">
                        去注册
                    </button>
                </div>
<!--                <img src="../assets/img/log.svg" class="image" alt="" />-->
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>已有帐号？</h3>
                    <p>
                        立即登录已有帐号。
                    </p>
                    <button class="btn transparent" id="sign-in-btn" @click="loginMode = true">
                        去登录
                    </button>
                </div>
<!--                <img src="../assets/img/register.svg" class="image" alt="" />-->
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store/index'

    export default {
        name: "logInSignUp",
        inject: ['updateName', 'updateSide','searchInfo', 'sideFalse', 'initWebSocket', 'checkImg'],
        data (){
            return {
                loginMode: true,
                login_username: '',
                login_password: '',
                register_username: '',
                register_password1: '',
                register_password2: '',
                register_mail: '',
                register_type: '',
                register_telephone: '',

            }
        },
        store,
        methods: {
            login() {
                const jsonData = {
                    name: this.login_username,
                    password: this.login_password
                }
                // console.log(this.$store.state.address + 'user/login')
                this.$axios({
                    method: "post",
                    // url: '/api/user/login',
                    url: this.$store.state.address + 'user/login',
                    data: jsonData,
                })
                    .then(res => {
                        console.log(res)

                        if(res.data.status === 200) {
                            let type = ''
                            switch (res.data.type) {
                                case 'technic':
                                    type = '技术人员'
                                    break
                                case 'customer':
                                    type = '用户'
                                    break
                                case 'admin':
                                    type = '管理人员'
                                    break
                                case 'operator':
                                    type = '运维人员'
                                    break
                            }
                            let id = res.data.id
                            let url = ''
                            let name = this.login_username
                            if(name.length===1)url = name
                            else{
                                let array = name.split(' ')
                                for(let i in array){
                                    url += array[i]
                                    if(i < (array.length-1))
                                        url += '_'
                                }
                            }
                            let baseInfo = {
                                id: id,
                                username: this.login_username,
                                type: type,
                                path: 'http://39.107.54.54:8080/image/portraits/'+ url
                                    + '.jpg' + "?t=" + Math.random(),

                            }
                            this.updateName(baseInfo)
                            sessionStorage.setItem('baseInfo', JSON.stringify(baseInfo))

                            this.searchInfo(this.login_username)
                            sessionStorage.setItem('picName', url)
                            sessionStorage.setItem('register', 'false')

                            // this.$store.commit('storeID', id)
                            //
                            this.checkImg(baseInfo.path)
                            this.$store.commit('reverseSide')
                            sessionStorage.setItem('show', 'true')
                            this.updateSide()
                            switch (type) {
                                case '用户':
                                    this.$router.push('/mainMenu')
                                    break
                                case "管理人员":
                                    this.$router.push('/tasksForManagers')
                                    break
                                case "技术人员":
                                    this.$router.push('/tasksForExperts')
                                    break
                                case "运维人员":
                                    this.$router.push('/dataImport')
                            }

                            this.initWebSocket()
                            // if(baseInfo.isAdmin === true) {
                            //     this.$router.push('/adminHome')
                            // }
                            // else {
                            //     this.$router.push('/')
                            // }
                        }
                        else {
                            this.$message({
                                message: res.data.msg,
                                showClose: true,
                                type: 'error',
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

                //
                // console.log(this.$store.state.showSide)
            },
            register() {
                if(this.register_password1 !== this.register_password2){
                    this.$message({
                        message: '密码不一致',
                        showClose: true,
                        type: 'success',
                    })
                    return
                }
                const jsonData = {
                    name: this.register_username,
                    password: this.register_password1,
                    email: this.register_mail,
                    type: this.register_type,
                    telephone: this.register_telephone
                }
                console.log(this.$store.state.address + 'user/register')
                console.log(jsonData)
                this.$axios({
                    method: "post",
                    url: this.$store.state.address + 'user/register',
                    data: jsonData,
                })
                    .then(res => {
                        console.log(res)
                        if(res.data.message === '重复的用户名！'){
                            this.$message({
                                        message: '用户名重复！',
                                        showClose: true,
                                        type: 'success',
                                    })

                        }
                        else if(res.data.message === '注册成功！'){

                            sessionStorage.setItem('register', 'true')
                            this.searchInfo(this.register_username)
                            this.initWebSocket()
                            this.updateSide()
                            let type = ''
                            switch (this.register_type) {
                                case 'technic':
                                    type = '技术人员'
                                    break
                                case 'customer':
                                    type = '用户'
                                    break
                                case 'admin':
                                    type = '管理人员'
                                    break
                                case 'operator':
                                    type = '运维人员'
                                    break
                            }
                            let id = res.data.id
                            let url = ''
                            let name = this.register_username
                            if(name.length===1)url = name
                            else{
                                let array = name.split(' ')
                                for(let i in array){
                                    url += array[i]
                                    if(i < (array.length-1))
                                        url += '_'
                                }
                            }
                            let baseInfo = {
                                id: id,
                                username: this.register_username,
                                type: type,
                                path: 'http://39.107.54.54:8080/image/portraits/'+ url
                                    + '.jpg' + "?t=" + Math.random(),
                            }
                            sessionStorage.setItem('baseInfo', JSON.stringify(baseInfo))
                            this.updateName(baseInfo)
                            this.checkImg(baseInfo.path)
                            sessionStorage.setItem('picName', url)
                            switch (type) {
                                case '用户':
                                    this.$router.push('/mainMenu')
                                    break
                                case "管理人员":
                                    this.$router.push('/tasksForManagers')
                                    break
                                case "技术人员":
                                    this.$router.push('/tasksForExperts')
                                    break
                                case "运维人员":
                                    this.$router.push('/dataImport')
                            }
                            this.initWebSocket()
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
                console.log(jsonData)
            },
        },
        mounted() {
            this.sideFalse()
        }
    }
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body,
    input {
        font-family: "Poppins", sans-serif;
    }
    label {
        font-family: "Poppins", sans-serif;
        color: #acacac;
        /*transition: 0.5s;*/
        font-size: 15px;
    }

    .container {
        position: relative;
        width: 100%;
        background-color: #fff;
        min-height: 100vh;
        overflow: hidden;
    }

    .forms-container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .signin-signup {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 75%;
        width: 50%;
        transition: 0.5s 0.35s ease-in-out;
        display: grid;
        grid-template-columns: 1fr;
        z-index: 5;
    }

    form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0rem 5rem;
        transition: all 0.2s 0.7s;
        overflow: hidden;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }

    form.sign-up-form {
        opacity: 0;
        z-index: 1;
    }

    form.sign-in-form {
        z-index: 2;
    }

    .login-title {
        font-size: 2.2rem;
        color: #444;
        margin-bottom: 10px;
    }
    input[type="radio"] {
        /*opacity: 0;*/
        margin: 0 0 0 10px;
        zoom: 150%;
    }
    /*label {*/
    /*    display: inline-block;*/
    /*    cursor: pointer;*/
    /*    padding: 0 .5rem ;*/
    /*}*/
    /*html {*/
    /*    font-size: 16px;*/
    /*    padding: 30px;*/
    /*    line-height: 1.2rem;*/
    /*}*/
    /*input[type="radio"]:checked+label:before,input[type="radio"]+label:before {*/
    /*    content: "";*/
    /*    height: 1rem;*/
    /*    width: 1rem;*/
    /*    display: block;*/
    /*    margin-top: 20px;*/
    /*    border: .125rem solid #aaa;*/
    /*    border-radius: 50%;*/
    /*    position: absolute;*/
    /*    margin-left: -1.5rem;*/
    /*}*/
    /*input[type="radio"]:checked+label:before {*/
    /*    box-shadow: .125rem .125rem 0 #fff inset, -.125rem -.125rem 0 #fff inset,*/
    /*    -.125rem .125rem 0 #fff inset, .125rem -.125rem 0 #fff inset,*/
    /*    .3rem  .3rem 0 #aaa inset,-.5rem -.5rem 0 #bbb inset;*/
    /*}*/
    .radio{
        display: flex;
        justify-content: center;
        max-width: 380px;
        width: 100%;
        background-color: #f0f0f0;
        margin: 10px 0;
        height: 55px;
        border-radius: 55px;
        /*display: grid;*/
        /*grid-template-columns: 15% 85%;*/
        /*padding: 0 0.4rem;*/
        position: relative;
    }
    .input-field {
        max-width: 380px;
        width: 100%;
        background-color: #f0f0f0;
        margin: 10px 0;
        height: 55px;
        border-radius: 55px;
        display: grid;
        grid-template-columns: 15% 85%;
        padding: 0 0.4rem;
        position: relative;
    }

    .input-field i {
        text-align: center;
        line-height: 55px;
        color: #acacac;
        transition: 0.5s;
        font-size: 1.1rem;
    }

    .input-field input {
        background: none;
        outline: none;
        border: none;
        line-height: 1;
        font-weight: 600;
        font-size: 1.1rem;
        color: #333;
    }

    .input-field input::placeholder {
        color: #aaa;
        /*line-height: 100px;*/
        font-weight: 500;
    }

    .social-text {
        padding: 0.7rem 0;
        font-size: 1rem;
    }

    .social-media {
        display: flex;
        justify-content: center;
    }

    .social-icon {
        height: 46px;
        width: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.45rem;
        color: #333;
        border-radius: 50%;
        border: 1px solid #333;
        text-decoration: none;
        font-size: 1.1rem;
        transition: 0.3s;
    }

    .social-icon:hover {
        color: #4481eb;
        border-color: #4481eb;
    }

    .btn {
        width: 150px;
        background-color: #5995fd;
        border: none;
        outline: none;
        height: 49px;
        border-radius: 49px;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
        margin: 10px 0;
        cursor: pointer;
        transition: 0.5s;
    }

    .sign-in-form .btn input::placeholder{
        border: solid red;
        position: relative;
        left: 20px;
    }

    .btn:hover {
        background-color: #4d84e2;
    }
    .panels-container {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .container:before {
        content: "";
        position: absolute;
        height: 2000px;
        width: 2000px;
        top: -10%;
        right: 48%;
        transform: translateY(-50%);
        background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
        transition: 0.9s ease-in-out;
        border-radius: 50%;
        z-index: 6;
    }

    .image {
        width: 100%;
        transition: transform 1.1s ease-in-out;
        transition-delay: 0.2s;
    }

    .panel {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
        text-align: center;
        z-index: 6;
    }

    .left-panel {
        pointer-events: all;
        padding: 3rem 17% 2rem 12%;
    }

    .right-panel {
        pointer-events: none;
        padding: 3rem 12% 2rem 17%;
    }

    .panel .content {
        color: #fff;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    .panel h3 {
        font-weight: 600;
        line-height: 1;
        font-size: 1.5rem;
    }

    .panel p {
        font-size: 0.95rem;
        padding: 0.7rem 0;
    }

    .btn.transparent {
        margin: 0;
        background: none;
        border: 2px solid #fff;
        width: 130px;
        height: 41px;
        font-weight: 600;
        font-size: 0.8rem;
    }

    .right-panel .image,
    .right-panel .content {
        transform: translateX(800px);
    }

    /* ANIMATION */

    .container.sign-up-mode:before {
        transform: translate(100%, -50%);
        right: 52%;
    }

    .container.sign-up-mode .left-panel .image,
    .container.sign-up-mode .left-panel .content {
        transform: translateX(-800px);
    }

    .container.sign-up-mode .signin-signup {
        left: 25%;
    }

    .container.sign-up-mode form.sign-up-form {
        opacity: 1;
        z-index: 2;
    }

    .container.sign-up-mode form.sign-in-form {
        opacity: 0;
        z-index: 1;
    }

    .container.sign-up-mode .right-panel .image,
    .container.sign-up-mode .right-panel .content {
        transform: translateX(0%);
    }

    .container.sign-up-mode .left-panel {
        pointer-events: none;
    }

    .container.sign-up-mode .right-panel {
        pointer-events: all;
    }

    @media (max-width: 870px) {
        .container {
            min-height: 800px;
            height: 100vh;
        }
        .signin-signup {
            width: 100%;
            top: 95%;
            transform: translate(-50%, -100%);
            transition: 1s 0.8s ease-in-out;
        }

        .signin-signup,
        .container.sign-up-mode .signin-signup {
            left: 50%;
        }

        .panels-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
        }

        .panel {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2.5rem 8%;
            grid-column: 1 / 2;
        }

        .right-panel {
            grid-row: 3 / 4;
        }

        .left-panel {
            grid-row: 1 / 2;
        }

        .image {
            width: 200px;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.6s;
        }

        .panel .content {
            padding-right: 15%;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.8s;
        }

        .panel h3 {
            font-size: 1.2rem;
        }

        .panel p {
            font-size: 0.7rem;
            padding: 0.5rem 0;
        }

        .btn.transparent {
            width: 110px;
            height: 35px;
            font-size: 0.7rem;
        }

        .container:before {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            left: 30%;
            bottom: 68%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
        }

        .container.sign-up-mode:before {
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
        }

        .container.sign-up-mode .left-panel .image,
        .container.sign-up-mode .left-panel .content {
            transform: translateY(-300px);
        }

        .container.sign-up-mode .right-panel .image,
        .container.sign-up-mode .right-panel .content {
            transform: translateY(0px);
        }

        .right-panel .image,
        .right-panel .content {
            transform: translateY(300px);
        }

        .container.sign-up-mode .signin-signup {
            top: 5%;
            transform: translate(-50%, 0);
        }
    }

    @media (max-width: 570px) {
        form {
            padding: 0 1.5rem;
        }

        .image {
            display: none;
        }
        .panel .content {
            padding: 0.5rem 1rem;
        }
        .container {
            padding: 1.5rem;
        }

        .container:before {
            bottom: 72%;
            left: 50%;
        }

        .container.sign-up-mode:before {
            bottom: 28%;
            left: 50%;
        }
    }
</style>
