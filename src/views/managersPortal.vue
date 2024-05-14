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


    </div>
</template>

<script>
    import {useCommonMethods} from '@/store/CommonMethods'
    export default {
        name: "managersPortal",
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
                path: ''
            }
        },
        mounted(){
            const {handleImage} = useCommonMethods()
            this.name = this.$route.query.name
            handleImage(this.name).then(res => {
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

                    this.telephone = res.data.list[0].telephone
                    this.email = res.data.list[0].email

                    this.score = res.data.list[0].score
                    this.working = res.data.list[0].working
                    this.completed = res.data.list[0].completed


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
    }
    p{
        margin: 5px;
    }
</style>