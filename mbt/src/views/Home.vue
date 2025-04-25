<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface SubLevel {
  id: string;
  title: string;
  tasks: string[];
  quiz?: QuizQuestion[];
}

interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  progress: number;
  locked: boolean;
  subLevels: SubLevel[];
}

const levels = ref<Level[]>([
  {
    id: 1,
    title: 'Основы тестирования',
    description: 'Изучите базовые принципы тестирования программного обеспечения',
    difficulty: 'Начальный',
    estimatedTime: '5 мин',
    progress: 0,
    locked: false,
    subLevels: [
      {
        id: '1.1',
        title: 'Что такое тестирование?',
        tasks: [
          'Определение тестирования ПО',
          'Основные принципы тестирования',
          'Роль тестировщика в команде'
        ],
        quiz: [
          {
            question: 'Какова основная цель тестирования ПО?',
            options: [
              'Найти все баги',
              'Убедиться в качестве продукта',
              'Написать много тест-кейсов',
              'Сделать код идеальным'
            ],
            correct: 1
          }
        ]
      },
      {
        id: '1.2',
        title: 'Виды тестирования',
        tasks: [
          'Функциональное тестирование',
          'Нефункциональное тестирование',
          'Практические примеры'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Тестирование API',
    description: 'Освойте основы тестирования API и валидации запросов',
    difficulty: 'Средний',
    estimatedTime: '30 мин',
    progress: 0,
    locked: true,
    subLevels: [
      {
        id: '2.1',
        title: 'Основы REST API',
        tasks: [
          'HTTP методы и коды ответов',
          'Структура REST запросов',
          'Практика с Postman'
        ]
      },
      {
        id: '2.2',
        title: 'Тестирование эндпоинтов',
        tasks: [
          'Валидация данных',
          'Проверка граничных значений',
          'Обработка ошибок'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Тестирование безопасности',
    description: 'Изучите распространенные уязвимости и методы тестирования безопасности',
    difficulty: 'Продвинутый',
    estimatedTime: '45 мин',
    progress: 0,
    locked: true,
    subLevels: [
      {
        id: '3.1',
        title: 'OWASP Top 10',
        tasks: [
          'Изучение основных уязвимостей',
          'Методы предотвращения атак',
          'Практические примеры'
        ]
      },
      {
        id: '3.2',
        title: 'Безопасность API',
        tasks: [
          'Аутентификация и авторизация',
          'Защита от инъекций',
          'Безопасность данных'
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Автоматизация тестирования',
    description: 'Научитесь создавать автоматизированные тесты',
    difficulty: 'Продвинутый',
    estimatedTime: '60 мин',
    progress: 0,
    locked: true,
    subLevels: [
      {
        id: '4.1',
        title: 'Основы Selenium',
        tasks: [
          'Настройка окружения',
          'Локаторы элементов',
          'Базовые команды'
        ]
      },
      {
        id: '4.2',
        title: 'Фреймворки тестирования',
        tasks: [
          'Jest и его возможности',
          'Cypress для E2E тестов',
          'Создание тестового фреймворка'
        ]
      }
    ]
  }
]);

const selectedLevel = ref<Level | null>(null);

const selectLevel = (level: Level) => {
  if (!level.locked) {
    selectedLevel.value = level;
  }
};

const startQuiz = (levelId: number) => {
  router.push(`/quiz/${levelId}`);
};
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Добро пожаловать в QA Learning</h2>
      <p class="text-gray-600">Освойте тестирование ПО через интерактивные задания</p>
    </div>

    <div class="grid gap-6">
      <div v-for="level in levels" :key="level.id" 
           class="bg-white rounded-2xl shadow-lg overflow-hidden"
           :class="{ 'opacity-75 cursor-not-allowed': level.locked }"
           @click="selectLevel(level)">
        <div class="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-white">{{ level.title }}</h3>
            <span class="px-3 py-1 bg-white/20 text-white rounded-full text-sm">
              {{ level.difficulty }}
            </span>
          </div>
          <p class="text-blue-100 mt-2">{{ level.description }}</p>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 text-gray-600">
              <span class="text-sm">Примерное время:</span>
              <span class="font-medium">{{ level.estimatedTime }}</span>
            </div>
            <div v-if="level.locked" class="flex items-center gap-2 text-gray-600">
              <span class="text-sm">🔒 Заблокировано</span>
            </div>
          </div>
          <div class="space-y-3 mb-4" v-if="selectedLevel?.id === level.id && !level.locked">
            <div v-for="subLevel in level.subLevels" :key="subLevel.id" 
                 class="bg-gray-50 p-4 rounded-xl">
              <h4 class="font-semibold text-gray-800 mb-2">{{ subLevel.title }}</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li v-for="task in subLevel.tasks" :key="task">{{ task }}</li>
              </ul>
            </div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div class="bg-blue-600 h-2 rounded-full" :style="{ width: level.progress + '%' }"></div>
          </div>
          <button 
            @click="startQuiz(level.id)"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="level.locked"
          >
            {{ level.locked ? 'Сначала пройдите предыдущие уровни' : 'Начать уровень' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>