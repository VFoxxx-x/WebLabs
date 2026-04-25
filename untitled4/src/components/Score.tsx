import React from 'react';
import { Card } from 'react-bootstrap';

interface ScoreProps {
    score: number;
    maxScore: number;
}

const Score: React.FC<ScoreProps> = ({ score, maxScore }) => {
    return (
        <Card className="text-center section-card">
            <Card.Body>
                <Card.Title>🏆 Очки</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {score}
                </Card.Text>
                <Card.Text>Рекорд: {maxScore}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Score;