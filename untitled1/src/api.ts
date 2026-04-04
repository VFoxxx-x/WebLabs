export interface Book {
    id: number;
    title: string;
    author: string;
    isAvailable: boolean;
}

const libraryBooks: Book[] = [
    { id: 1, title: 'Дюна', author: 'Фрэнк Герберт', isAvailable: true },
    { id: 2, title: '1984', author: 'Джордж Оруэлл', isAvailable: false },
    { id: 3, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', isAvailable: true },
    { id: 4, title: 'Основание', author: 'Айзек Азимов', isAvailable: false },
    { id: 5, title: 'Ведьмак. Последнее желание', author: 'Анджей Сапковский', isAvailable: true },
];

export const fetchBooks = (): Promise<Book[]> => {
    console.log('Запрос на сервер...');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Имитируем возможную ошибку сети
            if (Math.random() > 0.9) {
                reject(new Error('Не удалось загрузить данные. Попробуйте снова.'));
            } else {
                console.log('Данные получены!');
                resolve(libraryBooks);
            }
        }, 1500); // Задержка в 1.5 секунды
    });
};