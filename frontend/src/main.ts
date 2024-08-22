import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({ components, directives });

app.use(pinia);
app.use(vuetify);
app.use(router);

app.mount('#app');
