import React from 'react';
import { Card } from 'react-bootstrap';

interface LivesProps {
    lives: number;
}

const Lives: React.FC<LivesProps> = ({ lives }) => {
    const hearts = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
    return (
        <Card className="text-center section-card">
            <Card.Body>
                <Card.Title>❤️ Жизни</Card.Title>
                <Card.Text style={{ fontSize: '2rem' }}>{hearts}</Card.Text>
                <Card.Text>{lives} / 3</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Lives;