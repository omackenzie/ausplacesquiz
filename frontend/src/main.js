import { createApp } from 'vue';
import { createRouter,  createWebHistory } from 'vue-router';
import './index.css';
import App from './App.vue';
import Results from './views/Results.vue';
import Home from './views/Home.vue';
import Credits from './views/Credits.vue';
import PageNotFound from './views/PageNotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/results/:id', name: 'Results', component: Results},
    {path: '/credits', name: 'Credits', component: Credits},
    {path: '/:pathMatch(.*)*', component: PageNotFound}
  ]
})

createApp(App)
  .use(router)
  .mount('#app');
