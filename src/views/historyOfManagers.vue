<template>
    <div class="all">
        <router-link class="row" v-for="item in task" v-bind:key="item"
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
        name: "historyOfManagers",
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
                url: this.$store.state.address + 'test/get_admin_test_list',
                data: jsonData
            }).then(res=>{
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

                    })

                }
                console.log(this.task)
            })
        }
    }
</script>

<style scoped>
    .row{
        width: 45%;
        text-decoration: none;
        color: black;
        height: 220px;
        overflow: hidden;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
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
    .all{
        width: 100%;
        overflow: scroll;
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }
    .content{
        /*display: flex;*/
        margin-top: 10px;
        position: relative;
    }
</style>