import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default function createStore() {
    const store = new Vuex.Store({
        state: {
            userInfo: {
                name: 'ycl',
                sex: 'man'
            }
        },
        mutations: {
            changeUser(state, data) {
                state.userInfo = data;
            }
        },
        strict: true
    });

    return store;
}