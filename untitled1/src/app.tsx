import { useState, useEffect } from 'react';
import { fetchBooks } from './api';
import type { Book } from './api';
import { BookItem } from './components/BookItem';
import './App.css';

type FilterStatus = 'all' | 'available';

function App() {
  // Состояние для хранения списка книг
  const [books, setBooks] = useState<Book[]>([]);
  // Состояние для отслеживания процесса загрузки
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Состояние для хранения ошибки
  const [error, setError] = useState<string | null>(null);
  // Состояние для текущего фильтра
  const [filter, setFilter] = useState<FilterStatus>('all');

  // Хук useEffect для выполнения асинхронной операции после первого рендера
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true); // Устанавливаем статус загрузки
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false); // Снимаем статус загрузки в любом случае
      }
    };

    loadData();
  }, []); // Пустой массив зависимостей означает, что эффект выполнится 1 раз

  // Вычисляем отфильтрованный список книг перед рендером
  const filteredBooks = books.filter(book => {
    if (filter === 'available') {
      return book.isAvailable;
    }
    return true; // для фильтра 'all' возвращаем все книги
  });

  const renderContent = () => {
    // Условное отображение: сначала проверяем загрузку
    if (isLoading) {
      return <div className="loader">Загрузка каталога...</div>;
    }
    // Условное отображение: затем проверяем ошибку
    if (error) {
      return <div className="error">Ошибка: {error}</div>;
    }
    // Условное отображение: если нет книг по фильтру
    if (filteredBooks.length === 0) {
      return <p>Книг по вашему запросу не найдено.</p>;
    }
    // Корректная работа циклов: рендерим список
    return (
        <ul className="book-list">
          {filteredBooks.map(book => (
              // Использование переданных свойств: передаем book и key
              <BookItem key={book.id} book={book} />
          ))}
        </ul>
    );
  };

  return (
      <div className="catalog-container">
        <header className="catalog-header">
          <h1>Онлайн-библиотека</h1>
          <div className="filters">
            <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
              Все книги
            </button>
            <button onClick={() => setFilter('available')} className={filter === 'available' ? 'active' : ''}>
              Только в наличии
            </button>
          </div>
        </header>
        <main>
          {renderContent()}
        </main>
      </div>
  );
}

export default App;