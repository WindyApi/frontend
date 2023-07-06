import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'

export const store = createStore({
    state () {
        return {
            user: {
                nickname: "unknown",
                avatar: "unknown",
                gender: "unknown",
                role: "unknown"
            }
        }
    },
    mutations: {
        setUser (state, payload) {
            state.user.nickname = payload.nickname
            state.user.avatar = payload.avatar
            state.user.gender = payload.gender
            state.user.role = payload.role
        }
    },
    plugins: [persistedState({ storage: window.sessionStorage })]
})