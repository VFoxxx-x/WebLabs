import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Timer from './components/Timer';
import Score from './components/Score';
import Lives from './components/Lives';
import GameTask from './components/GameTask';
import ExampleManager from './components/ExampleManager';
import { playCorrectSound, playWrongSound, playRecordSound } from './components/Sound';
import type { Question } from './types';

const DEFAULT_EXAMPLES: Question[] = [
    { text: '2 + 2', answer: 4 },
    { text: '3 * 3', answer: 9 },
    { text: '10 - 7', answer: 3 },
    { text: '12 / 4', answer: 3 },
];

interface GameState {
    time: number;
    score: number;
    lives: number;
    maxScore: number;
    gameActive: boolean;
    currentQuestion: Question | null;
    examples: Question[];
}

const loadInitialState = (): Partial<GameState> => {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch {
            return {};
        }
    }
    return {};
};

// Функция для получения случайного вопроса из списка
const getRandomQuestion = (list: Question[]): Question | null => {
    if (list.length === 0) return null;
    return list[Math.floor(Math.random() * list.length)];
};

const App: React.FC = () => {
    // Ленивая инициализация
    const [time, setTime] = useState<number>(() => loadInitialState().time ?? 0);
    const [score, setScore] = useState<number>(() => loadInitialState().score ?? 0);
    const [lives, setLives] = useState<number>(() => loadInitialState().lives ?? 3);
    const [maxScore, setMaxScore] = useState<number>(() => loadInitialState().maxScore ?? 0);
    const [gameActive, setGameActive] = useState<boolean>(() => loadInitialState().gameActive ?? true);
    const [examples, setExamples] = useState<Question[]>(() => {
        const saved = loadInitialState().examples;
        return saved && saved.length ? saved : DEFAULT_EXAMPLES;
    });

    // Инициализация вопроса: если сохранённый есть – берём его, иначе случайный
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(() => {
        const savedQ = loadInitialState().currentQuestion;
        if (savedQ) return savedQ;
        return getRandomQuestion(examples);
    });

    // Сохранение в localStorage (без вызовов setState внутри)
    useEffect(() => {
        const state: GameState = {
            time,
            score,
            lives,
            maxScore,
            gameActive,
            currentQuestion,
            examples,
        };
        localStorage.setItem('gameState', JSON.stringify(state));
    }, [time, score, lives, maxScore, gameActive, currentQuestion, examples]);


    // Реализуем через собственный обработчик:
    const handleExamplesUpdate = (newExamples: Question[]) => {
        setExamples(newExamples);
        // Если вопрос стал невалидным (например, текущего вопроса нет в новом списке) – выбираем новый
        if (newExamples.length === 0) {
            setCurrentQuestion(null);
        } else if (currentQuestion && !newExamples.some(ex => ex.text === currentQuestion.text && ex.answer === currentQuestion.answer)) {
            setCurrentQuestion(getRandomQuestion(newExamples));
        } else if (!currentQuestion && newExamples.length > 0) {
            setCurrentQuestion(getRandomQuestion(newExamples));
        }
    };

    const handleAnswer = (isCorrect: boolean): void => {
        if (!gameActive || lives <= 0) return;

        if (isCorrect) {
            const newScore = score + 10;
            setScore(newScore);
            playCorrectSound();
            if (newScore > maxScore) {
                setMaxScore(newScore);
                playRecordSound();
            }
        } else {
            const newLives = lives - 1;
            setLives(newLives);
            playWrongSound();
            if (newLives <= 0) {
                setGameActive(false);
            }
        }
        // Следующий вопрос
        setCurrentQuestion(getRandomQuestion(examples));
    };

    // Таймер
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (gameActive && lives > 0) {
            interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [gameActive, lives]);

    // Смена цвета фона
    useEffect(() => {
        if (lives <= 0) {
            document.body.style.backgroundColor = '#8B0000';
        } else if (lives === 1) {
            document.body.style.backgroundColor = '#FF6B6B';
        } else if (lives === 2) {
            document.body.style.backgroundColor = '#FFB347';
        } else {
            document.body.style.backgroundColor = '#f8f9fa';
        }
    }, [lives]);

    const resetGame = (): void => {
        setTime(0);
        setScore(0);
        setLives(3);
        setGameActive(true);
        setCurrentQuestion(getRandomQuestion(examples));
    };

    return (
        <Container className="game-panel">
            <h1 className="text-center mb-4">🎮 Игровой тренажёр</h1>
            <Row>
                <Col md={4}>
                    <Timer seconds={time} />
                </Col>
                <Col md={4}>
                    <Score score={score} maxScore={maxScore} />
                </Col>
                <Col md={4}>
                    <Lives lives={lives} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={6}>
                    <div className="p-3 border rounded bg-white">
                        {currentQuestion ? (
                            <GameTask
                                question={currentQuestion}
                                onAnswer={handleAnswer}
                                disabled={!gameActive || lives <= 0}
                            />
                        ) : (
                            <Alert variant="warning">Нет доступных примеров. Добавьте через меню справа.</Alert>
                        )}
                    </div>
                </Col>
                <Col md={6}>
                    <div className="p-3 border rounded bg-white">
                        <ExampleManager
                            examples={examples}
                            onUpdateExamples={handleExamplesUpdate}
                        />
                    </div>
                </Col>
            </Row>
            <div className="text-center mt-4">
                <Button variant="danger" onClick={resetGame}>🔄 Новая игра</Button>
            </div>
        </Container>
    );
};

export default App;