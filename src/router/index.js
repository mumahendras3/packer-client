import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import { useGlobalStore } from '../stores/global';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
});

router.beforeEach((to, from) => {
  // We need the isLoggedIn state here
  const globalStore = useGlobalStore();

  if (!globalStore.isLoggedIn) {
    if (to.path !== '/login' && to.path !== '/register')
      return '/login';
  }
  if (globalStore.isLoggedIn && to.path === '/login')
    return '/';
});

export default router;
