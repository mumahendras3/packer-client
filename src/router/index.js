import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import AddRepo from '../views/AddRepo.vue';
import Tasks from '../views/Tasks.vue';
import AddTask from '../views/AddTask.vue';
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
    },
    {
      path: '/add-repo',
      name: 'add-repo',
      component: AddRepo
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/add-task',
      name: 'add-task',
      component: AddTask
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
