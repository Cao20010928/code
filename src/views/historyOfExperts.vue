<template>
    <div class="all">
        <router-link class="row" v-for="item in task" v-bind:key="item" style="display: flex; align-items: center;
            justify-content: center; text-decoration: none; color: black"
                     :to="{path: '/historyOfExperts/expertsDetail', query: {id: item.manual_id}}">
            <div class="content" >

                <div id="perfect" style=" display: flex;justify-content: center;">
                    <img :src="item.image" style="max-height: 190px; max-width: 200px;
                        border-radius: 10px; margin-left: 10px">
                    <div class="left">
                        <div style="text-align: center; font-size: 20px;
                        margin-left: 10px; ">{{item.name}}的复检申请</div>
                        <div style="margin: 0 10px;">错误类型：{{item.topic}}</div>
                        <p style="margin: 0 10px">详细原因：{{item.comment}}</p>
                    </div>
                </div>

            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "historyOfExperts",
        data(){
            return{
                task: []
            }
        },
        mounted(){
            const jsonData = {
                name: JSON.parse(sessionStorage.getItem('baseInfo')).username
            }
            this.$axios({
                method: 'post',
                url: this.$store.state.address + 'test/get_technic_test_list',
                data: jsonData
            }).then(res=>{
                console.log(res)
                for(let i in res.data.list[0]){
                    if(res.data.list[0][i].completed===true)
                        this.task.push(res.data.list[0][i])
                }
                for(let i in this.task){
                    const jsonData = {
                        manual_id: this.task[i].manual_id
                    }
                    this.$axios({
                        method: 'post',
                        url: this.$store.state.address + 'test/get_name_and_time',
                        data:jsonData
                    }).then(res=>{
                        let name = res.data.list[0].name.split(' ')
                        if(name.length===2)name = name[0]+'_'+name[1]
                        let time = res.data.list[0].time.replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_')
                        this.task[i]['image'] = this.$store.state.address + 'image/pre_pic/' + name +
                            '_' + time + '.jpg'
                        // console.log(this.task[i].image)
                    }).catch(err=>{
                        console.log(err)
                    })


                }
                console.log(this.task)
            })
        }
    }
</script>

<style scoped>
    .row{
        width: 46%;
        height: 220px;
        color: black;
        overflow: hidden;
        margin: 10px 20px;
        border-radius: 10px;
        box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
    }
    .all{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
    }
    .content{
        /*display: flex;*/
        position: relative;


    }
    .right{
        display: flex;
    }
    .left{
        /*width: 30%;*/
    }
    .tag{
        display: flex;
        justify-content: center;
    }
    .label{
        margin: 5px;
        font-size: 10px;
        color: #9494b8;
        padding: 5px;
        text-align: center;
        background-color: #99ffdc;
        border-radius: 30px;
    }
</style>