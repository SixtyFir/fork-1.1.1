<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { friends } = storeToRefs(userStore);
const friendCode = ref('');

const searchFriend = () => {
  console.log('Searching friend with code:', friendCode.value);
};
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4">Add Friend</h3>
      <div class="flex gap-3">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            v-model="friendCode"
            type="text"
            placeholder="Enter friend code"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
        <button 
          @click="searchFriend"
          class="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Add Friend
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-800">Friends</h3>
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {{ friends.length }}
        </span>
      </div>
      
      <div class="space-y-4">
        <div v-for="friend in friends" :key="friend.id" 
             class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-200 transition-colors duration-200">
          <div class="flex items-center gap-4">
            <img :src="friend.avatar" :alt="friend.username" class="w-12 h-12 rounded-xl">
            <div>
              <h4 class="font-semibold text-gray-900">{{ friend.username }}</h4>
              <p class="text-sm text-gray-600">Level {{ friend.level }}</p>
            </div>
          </div>
          <button class="text-blue-600 hover:text-blue-800 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>