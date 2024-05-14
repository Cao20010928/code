<template>
    <div class="list">
        <router-link :to="{path: '/expertsPortal', query: {name: items.name, button: false}}" class="listItem"
             v-for="items in expertsList" v-bind:key="items">
            <h2 style="text-align: center; width: 20%">{{items.name}}</h2>
            <div class="info">
                <p style="margin: 0 10px 0 10px">当前任务数: {{items.working}}</p>
                <p style="margin: 0 10px 0 10px; ">已处理任务数: {{items.completed}}</p>
                <div class="label" v-for="(item, index) in handle(items.feature)" v-bind:key="index">{{item}}</div>
            </div>

        </router-link>



    </div>
</template>

<script>
    export default {
        name: "expertsList",
        data(){
            return {
                label: [],
                expertsList: [],
                working: 2
            }
        },
        methods:{
            handle(str){
                console.log(str)
                if(str===null){
                    // console.log('fuck')
                    return []
                }
                return JSON.parse(str.replace(/'/g, '"'))
            },

        },
        mounted(){
            const jsonData = {
                type: 'technic'
            }
            this.$axios({
                method: "post",
                // url: '/api/user/login',
                url: this.$store.state.address + 'user/get_list',
                data: jsonData,
            })
                .then(res => {
                    // console.log(res)
                    this.expertsList = res.data.list
                    // console.log(this.expertsList)
                    for(let i in this.expertsList){
                        const jData = {
                            name: this.expertsList[i].name
                        }
                        this.$axios({
                            method: "post",
                            url: this.$store.state.address + "user/check_user",
                            data: jData
                        }).then(res => {
                            // console.log(res.data.list[0].working)
                            this.expertsList[i].working = res.data.list[0].working
                            this.expertsList[i].completed = res.data.list[0].completed
                        }).catch(err => {
                            console.log(err)
                        })
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        },
        computed(){

        }
    }
</script>

<style scoped>
    .list{
        width: 100%;
        /*margin: 20px;*/
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: flex-start;
        overflow: hidden;
    }
    .listItem{
        display: flex;
        text-decoration: none;
        color: black;
        justify-content: space-around;
        margin: 10px;
        height: 100px;
        width: 40%;
        border-radius: 10px;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
    }
    .listItem:hover{
        background-color: #e0e0eb;
    }
    .listItem:active{
        background-color: #9494b8;
    }
    .info{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        /*justify-content: space-around;*/
        width: 80%;
        margin-left: 20px;
    }
    .label{
        margin: 5px;
        font-size: 10px;
        color: #9494b8;
        padding: 5px;
        background-color: #99ffdc;
        border-radius: 30px;
    }

</style>