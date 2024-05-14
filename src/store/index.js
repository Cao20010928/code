import {createStore} from 'vuex'


const store = createStore({
    state: {
        userInfo: {
            id: 1,
            username: "Ego",
            email: "",
            telephone: '',
            type: '',

        },
         baseInfo: [],
        address: 'http://39.107.54.54:8080/',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOmZhbHNlLCJleHAiOjE2NzA2OTkzMjR9.o3dbl9a1UGU2JOz_v7WOpQ_EuO-TJY5QN6LT0NQu_QU',
        url: 'http://139.9.134.209:8000/media/avatars/',
        input: '',
        msg_plm_has_new: 0,
        msg_rec_has_new: 0,

        showSide: false
    },
    getters: {
        getName(){
            return this.state.userInfo.username;
        }
    },
    mutations: {
        reverseSide(){
            this.state.showSide = this.state.showSide === false;
        },
        staySide(){
            this.state.showSide = true
        },
        hideSide(){
            this.state.showSide = false
        },
        storeID(id){
            this.state.userInfo.id = id
        },
        storeUserInfo(state, baseInfo){
            state.userInfo.username = baseInfo.username
            state.userInfo.id = baseInfo.id

            console.log(baseInfo)
            console.log(this.state.userInfo.username)
        },
        getBaseInfo(baseInfo){
            this.state.userInfo.username = baseInfo.username
            this.state.userInfo.email = baseInfo.email
            this.state.userInfo.telephone = baseInfo.telephone
            this.state.userInfo.type = baseInfo.type
        }
    },
    actions: {
    },
    modules: {
    }
})
export default store