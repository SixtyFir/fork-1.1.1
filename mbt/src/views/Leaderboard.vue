<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../types/user';
import { useUserStore } from '../store/user';

const userStore = useUserStore();
const currentUser = userStore.currentUser;

const topUsers = ref<User[]>([
  { id: 2, username: 'Пупсик', avatar: 'https://i.ytimg.com/vi/V7w7J6NAt1c/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFcgYihlMA8=&rs=AOn4CLB0NB_Saf9MUP995zPI9tgU0XZB6Q', level: 10, completedLevels: 1, friendCode: '', achievements: [] },
  { id: 1, username: 'Leader2', avatar: 'https://via.placeholder.com/50', level: 9, completedLevels: 45, friendCode: '', achievements: [] },
]);

const userRank = ref(15);
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
        <h2 class="text-2xl font-bold text-white">Таблица лидеров</h2>
        <p class="text-blue-100 mt-1">Топ игроков по уровню</p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Топ</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Пользователь</th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Уровень</th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Пройдено</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(user, index) in topUsers" :key="user.id" 
                :class="{ 'bg-blue-50': user.id === currentUser.id }"
                class="transition-colors duration-200 hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div :class="{
                    'text-yellow-600': index === 0,
                    'text-gray-400': index === 1,
                    'text-amber-600': index === 2
                  }">
                    <svg v-if="index < 3" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <span class="font-semibold" :class="{
                    'text-yellow-600': index === 0,
                    'text-gray-400': index === 1,
                    'text-amber-600': index === 2,
                    'text-gray-600': index > 2
                  }">#{{ index + 1 }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="user.avatar" :alt="user.username" class="w-10 h-10 rounded-full">
                  <span class="font-medium text-gray-900">{{ user.username }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {{ user.level }}
                </span>
              </td>
              <td class="px-6 py-4 text-right font-medium text-gray-900">
                {{ user.completedLevels }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="userRank > 10" 
         class="bg-white rounded-2xl shadow-lg p-6 text-center">
      <p class="text-gray-600">Ваш текущий топ:</p>
      <p class="text-3xl font-bold text-gray-900 mt-2">#{{ userRank }}</p>
      <p class="text-sm text-gray-500 mt-2">Продолжайте обучение чтобы подняться в рейтинге!</p>
    </div>
  </div>
</template>