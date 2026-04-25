import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import type {Question} from '../types.ts';

interface GameTaskProps {
    question: Question;
    onAnswer: (isCorrect: boolean) => void;
    disabled: boolean;
}

const GameTask: React.FC<GameTaskProps> = ({ question, onAnswer, disabled }) => {
    const [input, setInput] = useState<string>('');
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (disabled) return;
        const userAnswer = Number(input);
        if (isNaN(userAnswer)) {
            setFeedback('Введите число');
            return;
        }
        const isCorrect = userAnswer === question.answer;
        onAnswer(isCorrect);
        setFeedback(isCorrect ? '✅ Верно!' : '❌ Ошибка!');
        setInput('');
        setTimeout(() => setFeedback(null), 1500);
    };

    return (
        <div className="mb-4">
            <h4>Решите пример:</h4>
            <div className="p-3 bg-light rounded mb-3" style={{ fontSize: '1.8rem', textAlign: 'center' }}>
                {question.text} = ?
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="number"
                        placeholder="Ваш ответ"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={disabled}
                    />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={disabled}>
                    Проверить
                </Button>
            </Form>
            {feedback && <Alert variant={feedback.includes('Верно') ? 'success' : 'danger'} className="mt-3">{feedback}</Alert>}
        </div>
    );
};

export default GameTask;