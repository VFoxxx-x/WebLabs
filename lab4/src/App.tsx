import { useState, useEffect, type FormEvent } from 'react';
import { fetchComments } from './api';
import type { Comment } from './api';
import './App.css';

function App() {
  // Состояние для списка комментариев
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Состояние для полей формы (двусторонняя привязка)
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [notify, setNotify] = useState(false);

  // загрузка данных при монтировании
  useEffect(() => {
    const loadComments = async () => {
      const initialComments = await fetchComments();
      setComments(initialComments);
      setIsLoading(false);
    };
    loadComments();
  }, []); // Пустой массив зависимостей, выполнится 1 раз

  // обработка события отправки формы
  const handleSubmit = (event: FormEvent) => {
    // Предотвращение стандартного поведения (перезагрузки страницы)
    event.preventDefault();

    if (!author.trim() || !text.trim()) {
      alert('Пожалуйста, заполните имя и текст комментария.');
      return;
    }

    const newComment: Comment = {
      id: Date.now(), // Простой способ генерации уникального ID
      author,
      text,
    };

    // Добавляем новый комментарий в начало списка
    setComments([newComment, ...comments]);

    // Очищаем поля формы после отправки
    setAuthor('');
    setText('');
    setNotify(false);

    console.log(`Уведомления для ${author}: ${notify ? 'включены' : 'выключены'}`);
  };

  return (
      <div className="container">
        <section className="comments-section">
          <h2>Комментарии ({comments.length})</h2>
          {isLoading ? (
              <p>Загрузка комментариев...</p>
          ) : (
              <ul className="comments-list">
                {comments.map(comment => (
                    <li key={comment.id}>
                      <strong>{comment.author}</strong>
                      <p>{comment.text}</p>
                    </li>
                ))}
              </ul>
          )}
        </section>

        <section className="form-section">
          <h2>Оставить комментарий</h2>
          {/* Обработчик события onSubmit */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="author">Ваше имя</label>
              <input
                  type="text"
                  id="author"
                  // Двусторонняя привязка: value читает из состояния
                  value={author}
                  // onChange обновляет состояние
                  onChange={e => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="text">Комментарий</label>
              <textarea
                  id="text"
                  rows={4}
                  value={text}
                  onChange={e => setText(e.target.value)}
              />
            </div>

            <div className="form-group-checkbox">
              <input
                  type="checkbox"
                  id="notify"
                  // Для чекбокса используется `checked` вместо `value`
                  checked={notify}
                  onChange={e => setNotify(e.target.checked)}
              />
              <label htmlFor="notify">Уведомить меня об ответе</label>
            </div>

            <button type="submit">Опубликовать</button>
          </form>
        </section>
      </div>
  );
}

export default App;