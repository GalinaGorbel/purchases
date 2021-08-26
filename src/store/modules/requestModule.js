import axios from 'axios';

let url = 'http://localhost:3000';

export default {
    namespaced: true,
    state() {
        return {
            requests: [],
            chartRequests: [],
            date1: new Date(),
            date2: new Date(),
        }
    },
    mutations: {
        setRequests(state, payload) {

            state.requests = payload;
        },
        setChartRequests(state, payload) {
            state.chartRequests = payload;
        },
        addPurchase(state, payload) {
            state.requests.push(payload);
        },
        changeDate1(state, payload) {
            state.date1 = payload
        },
        changeDate2(state, payload) {
            state.date2 = payload
        }
    },
    actions: {
        async loadExperience(context) {
     
            let date1 = context.getters.date1.toLocaleDateString().split('.').reverse().join('-');
            let date2 = context.getters.date2.toLocaleDateString().split('.').reverse().join('-');
            try {
                const res = await axios.get(`${url}/purchase?date_gte=${date1}&date_lte=${date2}`);
                context.commit('setRequests', res.data)
            } catch (e) {
                console.error(e);
            }
            context.dispatch('purchases/totalSum', null, { root: true });
        },
        async loadAll(context) {
   
            try {
                const res = await axios.get(`${url}/purchase`);
                context.commit('setChartRequests', res.data)
            } catch (e) {
                console.error(e);
            }
        },
        async saveChanges(context, payload) {

            const id = payload.id;
            try {
                await axios.patch(`${url}/purchase/${id}`, { ...payload });
            } catch (e) {
                console.error(e);
            }
            context.dispatch('loadExperience');
            context.dispatch('purchases/totalSum', null, { root: true });
        },
        async addNewPurchase(context, payload) {

            try {
                const newPurchase = payload;
                const res = await axios.post(
                    `${url}/purchase/`,
                    { ...newPurchase }
                )
                context.commit('addPurchase', res.data);
            } catch (e) {
                console.error(e);
            }
            context.dispatch('purchases/totalSum', null, { root: true });
        },
        async delPurchase(context, payload) {
            try {
                const id = payload.id;
                await axios.delete(
                    `${url}/purchase/${id}`
                )
            } catch (e) {
                console.error(e);
            }
            context.dispatch('loadExperience')
        },
    },
    getters: {
        requests(state) {
            return state.requests
        },
        chartRequests(state) {
            return state.chartRequests
        },
        date1(state) {
            return state.date1
        },
        date2(state) {
            return state.date2
        }
    }
}