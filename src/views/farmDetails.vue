<template>
    <div class="content">
        <div class="contents">
            <div class="top">
                <img :src="imgUrl" class="picture">
                <p class="intro">{{intro}}</p>
            </div>
            <h3>{{name}}常见疾病</h3>
            <h4 style="margin-left: 5px">{{name}}病害</h4>
            <div class="disease">
                <router-link :to="{path: '/diseaseDetails', query: {name: item}}" class="label" v-for="item in diseases" v-bind:key="item">{{item}}</router-link>
                <div v-show="!diseases.length" class="none">暂无数据</div>
            </div>
            <h4 style="margin-left: 5px;">{{name}}虫害</h4>
            <div class="pests">
                <router-link :to="{path: '/diseaseDetails', query: {name: item}}" class="label" v-for="item in pests" v-bind:key="item">{{item}}</router-link>
                <div v-show="!pests.length" class="none">暂无数据</div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "farmDetails",
        data() {
            return {
                name: '',
                imgUrl: '',
                intro: '',
                diseases: [],
                pests: []
            }
        },
        mounted(){
            this.name = this.$route.query.name
            this.intro = this.$route.query.intro
            this.imgUrl = "http://39.107.54.54:8080/image/crops/" + this.name + '.jpg'
            const jsonData = {
                category: this.name
            }
            this.$axios({
                method: 'post',
                url: this.$store.state.address + '/crop/get_certain_diseases',
                data: jsonData
            })
                .then(res=>{
                    // console.log(res)
                    let disease = this.name + '病害'
                    let pest = this.name + '虫害'
                    this.diseases = res.data.list[0][disease]
                    this.pests = res.data.list[1][pest]

                })
                .catch(err=>{
                    console.log(err)
                })
        }

    }
</script>

<style scoped>
    .content{
        width:100%;
        display: flex;
        align-items: center;
    }
    .contents{
        width: 90%;
        margin: auto;
        box-shadow: 0 0 5px;
        border-radius: 10px;
        /*top: 50%;*/

    }
    .none{
        margin-left: 5px;
        margin-bottom: 5px;
        color: #9494b8;
    }
    .picture{
        max-width: 110px; max-height: 110px;
        border-radius: 10px;margin: 10px 10px;
    }
    .top{
        display: flex;
    }
    .disease{
        display: flex;
    }
    .pests{
        display: flex;
    }
    .intro{
        margin: 10px 10px;
    }
    .label{
        text-decoration: none;
        margin: 5px;
        font-size: 10px;
        color: #9494b8;
        padding: 5px;
        background-color: #99ffdc;
        border-radius: 30px;
    }
</style>