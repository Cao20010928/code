import {createStore} from 'vuex'


const store = createStore({
    state: {
        userInfo: {
            uid: 1,
            username: "",
            email: "",
            profile: "I'm Ego",
        },

        showSide: false
    },
    getters: {
    },
    mutations: {
        reverseSide(){
            this.state.showSide = this.state.showSide === false;
        }
    },
    actions: {
    },
    modules: {
    }
})
export default store