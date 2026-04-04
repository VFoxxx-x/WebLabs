<template>
  <div class="news-container">
    <header class="news-header">
      <h2>Последние новости</h2>
      <nav class="categories">
        <!-- Кнопки для смены категорий. При клике вызывается метод changeCategory -->
        <button @click="changeCategory('tech')" :class="{ active: selectedCategory === 'tech' }">Технологии</button>
        <button @click="changeCategory('sports')" :class="{ active: selectedCategory === 'sports' }">Спорт</button>
        <button @click="changeCategory('science')" :class="{ active: selectedCategory === 'science' }">Наука</button>
      </nav>
    </header>

    <main class="news-content">
      <!-- Динамический заголовок, который зависит от выбранной категории -->
      <h3 class="category-title">{{ currentCategoryTitle }}</h3>

      <!-- Список новостей. Он будет автоматически обновляться благодаря computed-свойству -->
      <ul>
        <!-- v-for рисует список элементов, :key - обязательный уникальный идентификатор -->
        <!-- :class - это условный стиль. Класс .top-news добавится, только если news.isTop === true -->
        <li v-for="news in currentNews" :key="news.id" :class="{ 'top-news': news.isTop }">
          <h4>{{ news.title }}</h4>
          <p>{{ news.content }}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- 1. РЕАКТИВНЫЕ ДАННЫЕ ---

// Создаем "реактивную" переменную для хранения текущей выбранной категории.
// ref() делает переменную отслеживаемой. Vue заметит ее изменения.
const selectedCategory = ref('tech');

// Наши "базовые" данные. В реальном проекте они бы приходили с сервера.
const allNews = {
  tech: [
    { id: 1, title: 'Выпущен новый ИИ-ассистент', content: 'Он умеет писать код, музыку и рисовать картины.', isTop: true },
    { id: 2, title: 'Прорыв в квантовых вычислениях', content: 'Новый процессор в 100 раз быстрее предыдущего.', isTop: false },
  ],
  sports: [
    { id: 3, title: 'Финал чемпионата мира по футболу', content: 'Команда А победила команду Б со счетом 3-2.', isTop: true },
    { id: 4, title: 'Новый мировой рекорд в беге на 100 метров', content: 'Спортсмен пробежал дистанцию за 9.57 секунд.', isTop: false },
  ],
  science: [
    { id: 5, title: 'На Марсе обнаружены следы воды', content: 'Марсоход "Curiosity" подтвердил наличие замерзшей воды.', isTop: false },
    { id: 6, title: 'Ученые открыли новый вид глубоководных рыб', content: 'Они светятся в темноте и выдерживают огромное давление.', isTop: true },
  ]
};

// --- 2. МЕТОДЫ (ФУНКЦИИ) ---

// Функция для изменения категории. Она меняет значение нашей реактивной переменной.
function changeCategory(category) {
  selectedCategory.value = category;
}

// --- 3. ВЫЧИСЛЯЕМЫЕ СВОЙСТВА (COMPUTED) ---

// Это "умная" переменная. Ее значение автоматически пересчитывается,
// когда изменяются реактивные данные, от которых она зависит (в нашем случае - selectedCategory).
const currentNews = computed(() => {
  return allNews[selectedCategory.value];
});

// Еще одно вычисляемое свойство для красивого заголовка.
const currentCategoryTitle = computed(() => {
  if (selectedCategory.value === 'tech') return 'Новости технологий';
  if (selectedCategory.value === 'sports') return 'Новости спорта';
  if (selectedCategory.value === 'science') return 'Новости науки';
  return 'Все новости';
});
</script>

<style scoped>
/* Общие стили для чистоты и читаемости */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f0f2f5;
  color: #1c1e21;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.news-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px; /* Ограничиваем ширину для больших экранов */
  margin: 20px auto; /* Центрируем блок */
  overflow: hidden; /* Чтобы скругленные углы работали */
}

.news-header {
  padding: 20px;
  border-bottom: 1px solid #dddfe2;
}

.news-header h2 {
  margin: 0 0 15px 0;
  color: #1d2129;
}

.categories button {
  font-family: inherit;
  font-size: 16px;
  padding: 8px 16px;
  margin-right: 10px;
  border: 1px solid #ccd0d5;
  border-radius: 20px;
  background-color: #f0f2f5;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.categories button:hover {
  background-color: #e4e6eb;
}

/* Стиль для активной кнопки категории */
.categories button.active {
  background-color: #1877f2;
  color: white;
  border-color: #1877f2;
}

.news-content {
  padding: 20px;
}

.category-title {
  color: #606770;
  border-bottom: 2px solid #1877f2;
  padding-bottom: 10px;
  margin-top: 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 15px;
  border-bottom: 1px solid #e9ebee;
}

li:last-child {
  border-bottom: none;
}

li h4 {
  margin: 0 0 5px 0;
  color: #050505;
}

li p {
  margin: 0;
  color: #65676b;
}

/* === КЛЮЧЕВОЙ СТИЛЬ ДЛЯ ЗАДАНИЯ === */
/* Этот класс применяется условно для выделения топ-новостей */
.top-news {
  background-color: #fffbe2;
  border-left: 4px solid #f2c94c;
  padding-left: 11px; /* Компенсируем сдвиг от рамки */
}

.top-news h4 {
  font-weight: 600;
}
</style>