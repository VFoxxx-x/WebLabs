export interface Comment {
    id: number;
    author: string;
    text: string;
}

const existingComments: Comment[] = [
    { id: 1, author: 'Елена', text: 'Отличная статья, спасибо!' },
    { id: 2, author: 'Иван', text: 'Мне кажется, стоило бы добавить больше примеров.' },
];

export const fetchComments = (): Promise<Comment[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(existingComments);
        }, 1200); // Имитация задержки сети в 1.2 секунды
    });
};