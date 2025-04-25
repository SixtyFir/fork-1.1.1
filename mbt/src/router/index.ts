import { createRouter, createWebHistory } from 'vue-router';
import Profile from '../views/Profile.vue';
import Leaderboard from '../views/Leaderboard.vue';
import Friends from '../views/Friends.vue';
import Home from '../views/Home.vue';
import Quiz from '../views/Quiz.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: Home
    },
    {
      path: '/profile',
      name: 'Профиль',
      component: Profile
    },
    {
      path: '/leaderboard',
      name: 'Таблица лидеров',
      component: Leaderboard
    },
    {
      path: '/friends',
      name: 'Друзья',
      component: Friends
    },
    {
      path: '/quiz/:levelId',
      name: 'quiz',
      component: Quiz
    }
  ]
});

export default router;