import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'

export const store = createStore({
    state () {
        return {
            user: {
                nickname: "unknown",
                avatar: "unknown",
                gender: "unknown",
                role: "unknown",
                createTime: "unknown"
            }
        }
    },
    mutations: {
        setUser (state, payload) {
            state.user.nickname = payload.nickname
            state.user.avatar = payload.avatar
            state.user.gender = payload.gender
            state.user.role = payload.role
            state.user.createTime = payload.createTime
        },
        resetUser (state) {
            state.user.nickname = "unknown"
            state.user.avatar = "unknown"
            state.user.gender = "unknown"
            state.user.role = "unknown"
            state.user.createTime = "unknown"
        }
    },
    plugins: [persistedState({ storage: window.sessionStorage })]
})