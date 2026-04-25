import React from 'react';
import { Card } from 'react-bootstrap';

interface TimerProps {
    seconds: number;
}

const Timer: React.FC<TimerProps> = ({ seconds }) => {
    const formatTime = (totalSec: number): string => {
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Card className="text-center section-card">
            <Card.Body>
                <Card.Title>⏱️ Игровое время</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {formatTime(seconds)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Timer;