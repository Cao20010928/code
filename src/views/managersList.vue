<template>
    <div style="width: 100%">
        <div class="list">
            <router-link :to="{path: '/managersPortal', query: {name: items.name}}" class="listItem"
                         v-for="items in expertsList" v-bind:key="items">
                <h2 style="text-align: center; font-size: 20px; margin-left: 10px">{{items.name}}</h2>
                <div class="info">
                    <p style="margin: 0 10px 0 10px">当前任务数: {{items.working}}</p>
                    <p style="margin: 0 10px 0 10px; ">已处理任务数: {{items.completed}}</p>

                </div>

            </router-link>

        </div>
    </div>

</template>

<script>
    export default {
        name: "managersList",
        data(){
            return {
                label: [],
                expertsList: [],
                working: 2
            }
        },
        methods:{
            handle(str){
                // console.log(str)
                return JSON.parse(str.replace(/'/g, '"'))
            },

        },
        mounted(){
            const jsonData = {
                type: 'admin'
            }
            this.$axios({
                method: "post",
                // url: '/api/user/login',
                url: this.$store.state.address + 'user/get_list',
                data: jsonData,
            })
                .then(res => {
                    console.log(res)
                    this.expertsList = res.data.list
                    console.log(this.expertsList)
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
                    // let new_arr = this.expertsList.map(obj => {return obj.feature})
                    // console.log(new_arr)
                    // this.label = new_arr

                })
                .catch(err => {
                    console.log(err)
                })
        },
    }
</script>

<style scoped>
    .list{
        width: 85%;
        margin: 10px auto;
        /*margin: 20px;*/
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        overflow: hidden;
    }
    .listItem{
        display: flex;
        text-decoration: none;
        color: black;
        justify-content: space-around;
        align-items: center;
        margin: 10px;
        height: 100px;
        width: 45%;
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