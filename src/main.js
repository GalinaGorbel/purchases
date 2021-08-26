import { createApp } from 'vue';

import App from './App.vue';
import store from './store';
import Vuelidate from 'vuelidate'



import BaseWrapper from './components/BaseWrapper';
import TheUl from './components/TheUl';


const app = createApp(App);

app.component('base-wrap', BaseWrapper);
app.component('the-ul', TheUl);
app.use(Vuelidate);
app.use(store);

app.mount('#app');


