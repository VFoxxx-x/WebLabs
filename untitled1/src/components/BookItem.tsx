import type { Book} from '../api';

// Описываем тип для props нашего компонента
interface BookItemProps {
    book: Book;
}

// Компонент является функцией, принимающей props
export const BookItem = ({ book }: BookItemProps) => {
    return (
        <li className="book-item">
            <div className="book-details">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
            </div>
            {/* Условное отображение статуса наличия */}
            <div className={`book-status ${book.isAvailable ? 'available' : 'unavailable'}`}>
                {book.isAvailable ? 'В наличии' : 'Нет в наличии'}
            </div>
        </li>
    );
};