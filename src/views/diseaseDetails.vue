<template>
    <div class="content">
        <div class="contents">
            <h3>{{name}}</h3>
            <h4>{{english}}</h4>
            <h4>病虫害简介</h4>
            <p>{{intro}}</p>
            <h4>防治方法</h4>
            <p>{{predict}}</p>
            <h4>病虫害图片</h4>
            <div class="top">
                <img :src="item" class="picture" v-for="item in imgUrl" v-bind:key="item">

            </div>
<!--            <h3>{{name}}常见疾病</h3>-->
<!--            <h4 style="margin-left: 5px">{{name}}病害</h4>-->
<!--            <div class="disease">-->
<!--                <div class="label" v-for="item in diseases" v-bind:key="item">{{item}}</div>-->
<!--                <div v-show="!diseases.length" class="none">暂无数据</div>-->
<!--            </div>-->
<!--            <h4 style="margin-left: 5px;">{{name}}虫害</h4>-->
<!--            <div class="pests">-->
<!--                <div class="label" v-for="item in pests" v-bind:key="item">{{item}}</div>-->
<!--                <div v-show="!pests.length" class="none">暂无数据</div>-->
<!--            </div>-->
        </div>

    </div>
</template>

<script>
    export default {
        name: "diseaseDetails",
        data() {
            return {
                name: '',
                imgUrl: [],
                intro: '',
                english: '',
                predict: '',
                picture: 1
            }
        },
        created(){
            this.name = this.$route.query.name
            this.intro = this.$route.query.intro
            // this.imgUrl = "http://39.107.54.54:8080/image/diseases/" + this.name + '.jpg'
            const jsonData = {
                name: this.name
            }
            this.$axios({
                method: 'post',
                url: this.$store.state.address + '/crop/get_disease_info',
                data: jsonData
            })
                .then(res=>{
                    // console.log(res)
                    this.english = res.data.list[0].english
                    this.intro = res.data.list[0].intro
                    this.predict = res.data.list[0].predict
                    this.picture = res.data.list[0].pic_num
                    for(let i=1; i<=this.picture; i++)
                        this.imgUrl.push("http://39.107.54.54:8080/image/diseases/"+this.name+"_"+i+".jpg")
                    console.log(this.imgUrl)
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
    .picture{
        max-width: 110px; max-height: 110px;
        border-radius: 10px;margin: 10px 5px;
    }
    .top{
        display: flex;
    }
    p{
        margin: 0 5px;
    }
    h4{
        margin: 0 5px;
    }
</style>