export default {
    namespaced: true,
    state() {
        return {
            total: null
        }
    },
    mutations: {
        totalSum(state, payload) {
            state.total = payload
        }
    },
    actions: {
        totalSum(context) {
            let total = 0;
            const requests = context.rootGetters['request/requests'];
            requests.forEach(elem => total += +elem.price);
            context.commit('totalSum', total)
        }
    },
    getters: {
        total(state) {
            return state.total
        }
    }
}