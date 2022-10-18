import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        word: ''
    },
    actions: {
        getWordAction(context, pageId) {
            const payload = {
                message: ''
            }
            axios.get(`http://localhost:9090/word`)
                .then((response) => {
                    payload.message = response.data
                    context.commit('getWord', payload)
                })
        }
    },
    mutations: {
        getWord(state, payload) {
            state.word = payload.message
        }
    },
    getters: {
        getWord: (state, getters) => {
            return state.word
        }
    }
})

export default store
