<template>
    <div class="main">
        <h2 class="header">立即开始检测</h2>
        <div class="dnd-file-uploader">
            <div class="drop-area">
                <p class="tip">将图片拖拽至此处或者
                    <a class="file">
                        <input type="file" name="" id="input" accept="image/png, image/jpeg" @change="changeFile">
                        上传文件
                    </a>
                </p>
<!--                <input type="file" id="image" name="image" accept="image/png, image/jpeg" />-->
            </div>
        </div>

    </div>

</template>

<script>
    import fileUploader, {TASK_STATUS} from "@/views/fileUploader";
    export default {
        name: "mainMenu",
        data(){
            return{
                method: '',
                result: '',
                time: ''
            }
        },
        mounted(){
            if(this.$route.path==='/mainMenu'){
                this.$store.commit('staySide')
            }
            const taskTemplate = document.querySelector('#template-task');
            new fileUploader({
                element: document.querySelector('.dnd-file-uploader'),
                // uploadUrl: 'http://localhost:3000/upload',
                uploadUrl: 'niganma',
                taskRenderer: function (task) {
                    const taskDOM = taskTemplate.content.firstElementChild.cloneNode(true);
                    console.log(taskDOM)
                    const nameDOM = taskDOM.querySelector('.task-name');
                    nameDOM.textContent = task.name;
                    const progressDOM = taskDOM.querySelector('.task-progress');
                    const progress = `${task.progress}%`
                    progressDOM.textContent = progress;
                    if (task.status === TASK_STATUS.PROCESSING) {
                        taskDOM.style.background = `linear-gradient(to right, #bae7ff ${progress}, #fafafa ${progress}, #fafafa 100%)`
                    } else if (task.status === TASK_STATUS.SUCCESS) {
                        taskDOM.style.background = '#d9f7be';
                        nameDOM.href = task.url;
                    } else if (task.status === TASK_STATUS.ERROR) {
                        taskDOM.style.background = '#ffccc7';
                    }
                    return taskDOM;
                }
            });
        },
        methods:{
            changeFile(event){
                let files = event.target.files[0]        //获取文件
                let formData = new FormData();
                let name = JSON.parse(sessionStorage.getItem('baseInfo')).username
                formData.append('name', name)
                formData.append("pre_pic", files);
                // console.log(this.$store.state.address + 'pic/up_pre_pic')
                console.log(formData)
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'pic/up_pre_pic',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                        // 'content-type': "application/json;charset=UTF-8"
                    }
                })
                    .then(res=>{
                        // console.log(res)
                        this.method = res.data.method
                        this.result = res.data.result
                        this.time = res.data.time
                        this.$router.push({
                            path: '/firstSolution',
                            query:{
                                method: this.method,
                                result: this.result,
                                time: this.time
                            }
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                // const formData = new FormData();
                // var file = e.target.files[0];
                // formData.append("name", "Zhengyang Zhao");
                // formData.append("pre_pic", file);
                // this.$axios({
                //         method: 'post',
                //         url: "http://39.107.54.54:8080/pic/up_pre_pic",
                //         data: formData,
                //         headers: {
                //             'Content-Type':'multipart/form-data'
                //         }
                //     }
                // ).then(res => {
                //     console.log(res);
                // })
            }
        }
    }
</script>

<style scoped>
    .header{
        position: relative;
        text-align: center;
        color: black;
    }
    /*#input{*/
    /*    position: absolute;*/
    /*}*/
    .main{
        width: 100%;
        position: relative;
    }
    .dnd-file-uploader{
        margin: 0 auto;
        width: 50vw;
    }
    .drop-area{
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:20px;
        z-index: 0;
        color: #8c8c8c;
        border: 6px dashed #bfbfbf;
        border-radius: 16px;
    }
    .glass{
        position: absolute;
        width: 250px;
        height: 60px;
        left: 50%;
        top: 10px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        background: transparent;
        backdrop-filter: blur(10px);
        transition: .2s;
        border-radius: 20px;
        color: white;
        text-align: center;
        line-height: 60px;
        transform: translateX(-50%);
        z-index: 99;
    }
    .tip{
        display: flex;
        align-items: center;
    }
    .file {
        position: relative;
        display: inline-block;
        /*background: #D0EEFF;*/
        /*border: 1px solid #99D3F5;*/
        border-radius: 4px;
        padding: 4px 0;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        /*line-height: 30px;*/
    }
    .file input {
        position: absolute;
        /*font-size: 100px;*/
        /*right: 0;*/
        /*top: 0;*/
        opacity: 0;
        /*z-index: 80;*/
        width: 100%;
        height: 100%;
    }
    .file:hover {
        /*background: #AADFFD;*/
        /*border-color: #78C3F3;*/
        color: #004974;
        text-decoration: none;
    }
</style>