<template>

    <div class="content">
        <div class="navForUser" v-show="type==='用户'">
            <div class="nav-menu">
                <div class="nav-title" @click="routerClick(0)">
                    智能检测
                    <i class="iconfont icon-duigoux" v-show="column[0]"></i>
                </div>
            </div>
            <div class="nav-menu">
                <div class="nav-title" @click="routerClick(1)">
                    历史任务
                    <i class="iconfont icon-duigoux" v-show="column[1]"></i>
                </div>
            </div>
            <div class="nav-menu">
                <div class="nav-title" >
                    工作人员
                </div>
                <div class="nav-content">
                    <a @click="routerClick(4)">
                        管理人员
                        <i class="iconfont icon-duigoux" v-show="column[4]"></i>
                    </a>
                    <a  @click="routerClick(2)">
                        技术人员
                        <i class="iconfont icon-duigoux" v-show="column[2]"></i>
                    </a>

                </div>
            </div>
            <div class="nav-menu">
                <div class="nav-title" @click="routerClick(3)">
                    作物图库
                    <i class="iconfont icon-duigoux" v-show="column[3]"></i>
                </div>
            </div>
        </div>
        <div class="navForManager" v-show="type==='管理人员'">
            <div class="nav-menu">
                <div class="nav-title" @click="routerClick(0)">
                    待处理任务
                    <i class="iconfont icon-duigoux" v-show="column[0]"></i>
                </div>
            </div>
            <div class="nav-menu">
                <div class="nav-title" @click="routerClick(1)">
                    历史任务
                    <i class="iconfont icon-duigoux" v-show="column[1]"></i>
                </div>
            </div>
            <div class="nav-menu">
                <div class="nav-title" >
                    工作人员
                </div>
                <div class="nav-content">
                    <a @click="routerClick(4)">
                        管理人员
                        <i class="iconfont icon-duigoux" v-show="column[4]"></i>
                    </a>
                    <a  @click="routerClick(2)">
                        技术人员
                        <i class="iconfont icon-duigoux" v-show="column[2]"></i>
                    </a>

                </div>
            </div>
            <div class="nav-menu">
                <div class="nav-title" @click="routerClick(3)">
                    作物图库
                    <i class="iconfont icon-duigoux" v-show="column[3]"></i>
                </div>
            </div>
        </div>
        <div class="navForManager" v-show="type==='技术人员'">
            <div class="nav-menu">
                <div class="nav-title" @click="routerClick(0)">
                    待处理任务
                    <i class="iconfont icon-duigoux" v-show="column[0]"></i>
                </div>
            </div>
            <div class="nav-menu">
                <div class="nav-title" @click="routerClick(1)">
                    历史任务
                    <i class="iconfont icon-duigoux" v-show="column[1]"></i>
                </div>
            </div>
            <div class="nav-menu">
                <div class="nav-title" >
                    工作人员
                </div>
                <div class="nav-content">
                    <a @click="routerClick(4)">
                        管理人员
                        <i class="iconfont icon-duigoux" v-show="column[4]"></i>
                    </a>
                    <a  @click="routerClick(2)">
                        技术人员
                        <i class="iconfont icon-duigoux" v-show="column[2]"></i>
                    </a>

                </div>
            </div>
            <div class="nav-menu">
                <div class="nav-title" @click="routerClick(3)">
                    作物图库
                    <i class="iconfont icon-duigoux" v-show="column[3]"></i>
                </div>
            </div>
        </div>
<!--        <div class="nav">-->
<!--            <div class="nav-menu">-->
<!--                <div class="nav-title" @click="routerClick(0)">-->
<!--                    病虫害检测-->
<!--                    <i class="iconfont icon-duigoux" v-show="column[0]"></i>-->
<!--                </div>-->
<!--&lt;!&ndash;                <div class="nav-content">&ndash;&gt;-->
<!--&lt;!&ndash;                    <a href="#">智能检测处理</a>&ndash;&gt;-->
<!--&lt;!&ndash;                    <a href="#">人工检测处理</a>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--            </div>-->
<!--            <div class="nav-menu">-->
<!--                <div class="nav-title" @click="routerClick(1)">-->
<!--                    检测结果管理-->
<!--                    <i class="iconfont icon-duigoux" v-show="column[1]"></i>-->
<!--                </div>-->
<!--&lt;!&ndash;                <div class="nav-content">&ndash;&gt;-->
<!--&lt;!&ndash;                    <a href="#">结果生成处理</a>&ndash;&gt;-->
<!--&lt;!&ndash;                    <a href="#">结果反馈处理</a>&ndash;&gt;-->
<!--&lt;!&ndash;                    <a href="#">结果沟通评价</a>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--            </div>-->
<!--            <div class="nav-menu">-->
<!--                <div class="nav-title">诊断方案管理</div>-->
<!--                <div class="nav-content">-->
<!--                    <a href="#">方案生成管理</a>-->
<!--                    <a href="#">方案查看管理</a>-->
<!--                    <a href="#">方案反馈处理</a>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="nav-menu">-->
<!--                <div class="nav-title" @click="routerClick(3)">-->
<!--                    检测任务管理-->
<!--                    <i class="iconfont icon-duigoux" v-show="column[3]"></i>-->
<!--                </div>-->
<!--&lt;!&ndash;                <div class="nav-content">&ndash;&gt;-->
<!--&lt;!&ndash;                    <a href="#">检测生成管理</a>&ndash;&gt;-->
<!--&lt;!&ndash;                    <a href="#">委派检测处理</a>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--            </div>-->
<!--            <div class="nav-menu">-->
<!--                <div class="nav-title">作物品类管理</div>-->
<!--                <div class="nav-content">-->
<!--                    <a href="#">作物信息管理</a>-->
<!--                    <a href="#">作物经验论坛</a>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="nav-menu">-->
<!--                <div class="nav-title">后台系统管理</div>-->
<!--                <div class="nav-content">-->
<!--                    <a href="#">系统用户管理</a>-->
<!--                    <a href="#">技术人员管理</a>-->
<!--                    <a href="#">管理人员管理</a>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>




</template>

<script>
    // import { ElButton, ElInput } from 'element-plus'
    import $ from 'jquery'
    export default {
        props: ['type'],
        data(){
            return{
                column: [true, false, false, false, false, false, false]
            }
        },
        methods: {
            routerClick(t){
                if(this.type==='用户'){
                    switch (t) {
                        case 0:
                            this.$router.push('/mainMenu')
                            break
                        case 1:
                            this.$router.push('/tasksForUsers')
                            break
                        case 2:
                            this.$router.push('/expertsList')
                            break
                        case 3:
                            this.$router.push('/farmCatalog')
                            break
                        case 4:
                            this.$router.push('/managersList')
                            break
                    }
                }
                else if(this.type==='技术人员'){
                    switch (t) {
                        case 0:
                            this.$router.push('/tasksForExperts')
                            break
                        case 1:
                            this.$router.push('/historyOfExperts')
                            break
                        case 2:
                            this.$router.push('/expertsList')
                            break
                        case 3:
                            this.$router.push('/farmCatalog')
                            break
                        case 4:
                            this.$router.push('/managersList')
                            break
                    }
                }
                else{
                    switch (t) {
                        case 0:
                            this.$router.push('/tasksForManagers')
                            break
                        case 1:
                            this.$router.push('/historyOfManagers')
                            break
                        case 2:
                            this.$router.push('/expertsList')
                            break
                        case 3:
                            this.$router.push('/farmCatalog')
                            break
                        case 4:
                            this.$router.push('/managersList')
                            break
                    }
                }


                this.column[t] = true
                for(let i in this.column){
                    if(i==t)continue
                    this.column[i] = false
                }
            }
        },
        mounted(){
            $(function(){
                $('.nav-menu').each(function () {
                    $(this).children(".nav-content").hide();
                })
                $('.nav-title').each(function () {
                    $(this).click(function () {
                        let navConEle = $(this).parents(".nav-menu").children(".nav-content")
                        // console.log(navConEle)
                        if(navConEle.css("display")!=='none'&&navConEle.hasClass("nav-content")){
                            console.log('yes')
                            navConEle.hide(500)
                        }
                        else {
                            // console.log('fuck')
                            let navEle = $(this).parents('.nav-menu')
                            let menuEle = navEle.siblings()
                            console.log(menuEle)
                            menuEle.each(function () {

                                $(this).children('.nav-content').hide(500)
                            })
                            navConEle.show(500)
                        }


                    })
                })
            });
        }
    }

</script>

<style scoped>
    *{
        padding: 0;
        margin: 0;

    }
    .content{
        width: 170px;
        height: 100%;
        background-color: #151c22;
        overflow: hidden;
        /*position: fixed;*/
    }
    .icon-duigoux{
        color: white;
        font-size: 20px;
    }
    .nav{
        margin-top: 0px;
    }
    .nav-title{
        height:40px;
        width: 100%;
        color: white;
        text-indent: 20px;
        line-height: 40px;
        cursor: pointer;
    }
    .nav-content{
        width:100%;
        height:100%;
        background-color: #0c1119;
        cursor: pointer;
    }
    .nav-content>a{
        display: block;
        height: 30px;
        width: 100%;
        color: #cccccc;
        text-decoration: none;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
    }
    .nav-content>a:hover{
        display: block;
        height: 30px;
        width: 100%;
        color: #ffffff;
        text-decoration: none;
        text-align: center;
        line-height: 30px;
        background-color: #12040c;
    }

</style>