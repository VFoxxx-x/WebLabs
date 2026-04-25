import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Timer from './components/Timer';
import Score from './components/Score';
import Lives from './components/Lives';
import GameTask from './components/GameTask';
import ExampleManager from './components/ExampleManager';
import { playCorrectSound, playWrongSound, playRecordSound } from './components/Sound';
import { Question } from './types';

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
    examples: Question[];
}

const App: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [lives, setLives] = useState<number>(3);
    const [maxScore, setMaxScore] = useState<number>(0);
    const [examples, setExamples] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [gameActive, setGameActive] = useState<boolean>(true);

    // Загрузка из localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            const { time, score, lives, maxScore, examples }: GameState = JSON.parse(savedState);
            setTime(time);
            setScore(score);
            setLives(lives);
            setMaxScore(maxScore);
            if (examples && examples.length) setExamples(examples);
        }
        if (!examples.length) setExamples(DEFAULT_EXAMPLES);
    }, []);

    // Сохранение в localStorage
    useEffect(() => {
        const state: GameState = { time, score, lives, maxScore, examples };
        localStorage.setItem('gameState', JSON.stringify(state));
    }, [time, score, lives, maxScore, examples]);

    // Выбор случайного примера
    const pickRandomQuestion = useCallback((): Question | null => {
        if (examples.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * examples.length);
        return examples[randomIndex];
    }, [examples]);

    // При изменении списка примеров – перевыбрать текущий вопрос
    useEffect(() => {
        if (examples.length > 0) {
            setCurrentQuestion(pickRandomQuestion());
        } else {
            setCurrentQuestion(null);
        }
    }, [examples, pickRandomQuestion]);

    // Обработка ответа
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
        setCurrentQuestion(pickRandomQuestion());
    };

    // Таймер
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (gameActive && lives > 0) {
            interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        } else if (!gameActive || lives === 0) {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [gameActive, lives]);

    // Смена цвета фона в зависимости от жизней
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
        setCurrentQuestion(pickRandomQuestion());
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
                        <ExampleManager examples={examples} setExamples={setExamples} />
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