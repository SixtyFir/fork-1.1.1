<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import type { Quiz } from '../types/level';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

route
userStore
onMounted

const currentQuestionIndex = ref(0);
const selectedAnswer = ref<number | null>(null);
const score = ref(0);
const showResult = ref(false);

const quiz = ref<Quiz[]>([
  {
    question: 'Какова основная цель тестирования ПО?',
    options: [
      'Найти все баги',
      'Убедиться в качестве продукта',
      'Написать много тест-кейсов',
      'Сделать код идеальным'
    ],
    correct: 1
  },
  {
    question: 'Что такое регрессионное тестирование?',
    options: [
      'Тестирование новой функциональности',
      'Проверка исправления багов',
      'Проверка что старая функциональность работает после изменений',
      'Тестирование производительности'
    ],
    correct: 2
  },
  {
    question: 'Какой тип тестирования проверяет удобство использования?',
    options: [
      'Функциональное',
      'Юзабилити',
      'Интеграционное',
      'Модульное'
    ],
    correct: 1
  }
]);

const submitAnswer = async () => {
  if (selectedAnswer.value === null) return; // Исправлено на selectedAnswer.value
  
  if (selectedAnswer.value === quiz.value[currentQuestionIndex.value].correct) {
    score.value++;
  }

  if (currentQuestionIndex.value < quiz.value.length - 1) {
    currentQuestionIndex.value++;
    selectedAnswer.value = null; 
  } else {
    showResult.value = true; // Можно добавить показ результата, если это последний вопрос
  }
};

const finishQuiz = () => {
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-6 flex flex-col justify-center">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <div v-if="!showResult">
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="flex justify-between mb-4">
                  <span class="text-blue-600 font-medium">Вопрос {{ currentQuestionIndex + 1 }} из {{ quiz.length }}</span>
                  <span class="text-gray-500">Очки: {{ score }}</span>
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                  {{ quiz[currentQuestionIndex].question }}
                </h3>

                <div class="space-y-3">
                  <div v-for="(option, index) in quiz[currentQuestionIndex].options" 
                       :key="index"
                       @click="selectedAnswer = index"
                       class="p-4 border rounded-xl cursor-pointer transition-colors duration-200"
                       :class="{
                         'border-blue-500 bg-blue-50': selectedAnswer === index,
                         'border-gray-200 hover:border-blue-200': selectedAnswer !== index
                       }">
                    {{ option }}
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-6">
              <button @click="submitAnswer"
                      :disabled="selectedAnswer === null"
                      class="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ currentQuestionIndex === quiz.length - 1 ? 'Завершить' : 'Следующий вопрос' }}
              </button>
            </div>
          </div>

          <div v-else class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Результаты</h3>
            <p class="text-xl mb-6">
              Вы набрали {{ score }} из {{ quiz.length }} очков
            </p>
            <button @click="finishQuiz"
                    class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200">
              Вернуться к урокам
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>