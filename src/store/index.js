import { createStore } from 'vuex';

import requestModule from './modules/requestModule';
import purchasesModule from './modules/purchasesModule';

const store = createStore({
    modules: {
        request: requestModule,
        purchases: purchasesModule,
    }
})

export default store;