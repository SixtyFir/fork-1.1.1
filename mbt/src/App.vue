<script setup lang="ts">
import { onMounted } from 'vue';
import  WebApp from '@twa-dev/sdk';

onMounted(() => {
  if (WebApp) {
    WebApp.ready();
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <main class="pb-24 px-4 pt-4">
      <router-view v-slot="{ Component }">
        <transition 
          name="page" 
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 safe-area-bottom">
      <div class="max-w-lg mx-auto">
        <div class="flex justify-around items-center h-16">
          <router-link 
            to="/" 
            class="flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200"
            :class="{ 'text-blue-600': $route.path === '/', 'text-gray-600': $route.path !== '/' }"
            active-class="text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="text-xs mt-1">Главная</span>
          </router-link>

          <router-link 
            to="/profile" 
            class="flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200"
            :class="{ 'text-blue-600': $route.path === '/profile', 'text-gray-600': $route.path !== '/profile' }"
            active-class="text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-xs mt-1">Профиль</span>
          </router-link>

          <router-link 
            to="/leaderboard" 
            class="flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200"
            :class="{ 'text-blue-600': $route.path === '/leaderboard', 'text-gray-600': $route.path !== '/leaderboard' }"
            active-class="text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span class="text-xs mt-1">Таблица лидеров</span>
          </router-link>

          <router-link 
            to="/friends" 
            class="flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200"
            :class="{ 'text-blue-600': $route.path === '/friends', 'text-gray-600': $route.path !== '/friends' }"
            active-class="text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-xs mt-1">Справочник</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>