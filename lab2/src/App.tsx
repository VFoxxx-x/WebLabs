import { useState } from 'react';
import './App.css';


// Структура одного объекта новости
interface NewsItem {
  id: number;
  title: string;
  content: string;
  isTop: boolean;
}

// Возможные значения для категорий, чтобы избежать опечаток
type Category = 'tech' | 'sports' | 'science';

// данные (Вне компонента, так как они не меняются) ---

const allNews: Record<Category, NewsItem[]> = {
  tech: [
    { id: 1, title: 'Выпущена отечественная среда разработки', content: 'Поддерживает все известные языки программирования', isTop: true },
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



function App() {
  // Используем хук useState для хранения текущей категории. При вызове setCategory React перерисует компонент.
  const [selectedCategory, setSelectedCategory] = useState<Category>('tech');

  // Вычисляемые данные (переменные, которые пересчитываются при каждом рендере).
  const currentNews = allNews[selectedCategory];

  const currentCategoryTitle = {
    tech: 'Новости технологий',
    sports: 'Новости спорта',
    science: 'Новости науки'
  }[selectedCategory];

  // Обработчик событий
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
      <div className="news-container">
        <header className="news-header">
          <h2>Последние новости</h2>
          <nav className="categories">
            {/* Кнопки для смены категорий. onClick */}
            <button
                onClick={() => handleCategoryChange('tech')}
                className={selectedCategory === 'tech' ? 'active' : ''}>
              Технологии
            </button>
            <button
                onClick={() => handleCategoryChange('sports')}
                className={selectedCategory === 'sports' ? 'active' : ''}>
              Спорт
            </button>
            <button
                onClick={() => handleCategoryChange('science')}
                className={selectedCategory === 'science' ? 'active' : ''}>
              Наука
            </button>
          </nav>
        </header>

        <main className="news-content">
          {/* Динамический заголовок */}
          <h3 className="category-title">{currentCategoryTitle}</h3>

          {/* Рендеринг списка новостей с помощью метода .map() */}
          <ul>
            {currentNews.map(news => (
                // `key` обязателен для списков в React
                // Условный класс добавляется с помощью тернарного оператора
                <li key={news.id} className={`news-item ${news.isTop ? 'top-news' : ''}`}>
                  <h4>{news.title}</h4>
                  <p>{news.content}</p>
                </li>
            ))}
          </ul>
        </main>
      </div>
  );
}

export default App;