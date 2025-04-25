<script setup lang="ts">
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);


import WebApp from "@twa-dev/sdk"

const telegramUser = WebApp.initDataUnsafe?.user;
const userData = {
  id: telegramUser?.id || currentUser.value.id,
  username: telegramUser?.username || currentUser.value.username,
  firstName: telegramUser?.first_name || '',
  lastName: telegramUser?.last_name || '',
  photoUrl: telegramUser?.photo_url ,
} 

userData
onMounted(() => {
   WebApp.ready();
});
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center gap-6">
        <div class="relative">
          <img :src="telegramUser?.photo_url" :alt="telegramUser?.username" class="w-24 h-24 rounded-2xl shadow-lg">
          <div class="absolute -bottom-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
            Lvl {{ currentUser.level }}
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-800">{{ telegramUser?.username }}</h2>
          <div class="mt-2 flex items-center gap-2 text-gray-600">
            <span>{{ currentUser.completedLevels }} Уровней пройдено</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold text-gray-800">Код друга</h3>
        <button class="text-blue-600 hover:text-blue-800 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <div class="bg-gray-50 rounded-xl p-4 font-mono text-center text-lg">
        {{ currentUser.friendCode }}
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4">Достижения</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="achievement in currentUser.achievements" :key="achievement.id" 
             class="border rounded-xl p-4 transition-all duration-200 hover:shadow-md"
             :class="{ 'bg-green-50 border-green-200': achievement.completed, 'border-gray-200': !achievement.completed }">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center"
                 :class="achievement.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold" :class="achievement.completed ? 'text-green-800' : 'text-gray-800'">
                {{ achievement.title }}
              </h4>
              <p class="text-sm" :class="achievement.completed ? 'text-green-600' : 'text-gray-600'">
                {{ achievement.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>