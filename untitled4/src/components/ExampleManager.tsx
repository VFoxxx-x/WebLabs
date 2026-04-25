import React, { useState } from 'react';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { Question } from '../types.ts';

interface ExampleManagerProps {
    examples: Question[];
    setExamples: React.Dispatch<React.SetStateAction<Question[]>>;
}

const ExampleManager: React.FC<ExampleManagerProps> = ({ examples, setExamples }) => {
    const [show, setShow] = useState<boolean>(false);
    const [newText, setNewText] = useState<string>('');
    const [newAnswer, setNewAnswer] = useState<string>('');

    const handleAdd = (): void => {
        if (newText.trim() && newAnswer !== '') {
            const answerNum = Number(newAnswer);
            if (!isNaN(answerNum)) {
                setExamples([...examples, { text: newText.trim(), answer: answerNum }]);
                setNewText('');
                setNewAnswer('');
                setShow(false);
            }
        }
    };

    const handleDelete = (idx: number): void => {
        const updated = [...examples];
        updated.splice(idx, 1);
        setExamples(updated);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Доступные примеры ({examples.length})</h5>
                <Button variant="outline-success" size="sm" onClick={() => setShow(true)}>➕ Добавить свой</Button>
            </div>
            <ListGroup>
                {examples.map((ex, idx) => (
                    <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                        {ex.text} = {ex.answer}
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(idx)}>🗑️</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить пример</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Условие</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="например: 5 * 3"
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Правильный ответ (число)</Form.Label>
                            <Form.Control
                                type="number"
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Отмена</Button>
                    <Button variant="primary" onClick={handleAdd}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ExampleManager;