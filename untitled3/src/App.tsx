import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from './components/ProgressBar';
import GradeCell from './components/GradeCell';

// Тип и начальные данные
interface Student {
  id: number;
  name: string;
  group: string;
  grades: number[];
}

const initialStudents: Student[] = [
  { id: 1, name: 'Владислав Неклюдов', group: '241-337', grades: [95, 88, 92] },
  { id: 2, name: 'Владислав Неклюдов', group: '241-337', grades: [78, 82, 80] },
  { id: 3, name: 'Владислав Неклюдов', group: '241-337', grades: [100, 98, 99] },
  { id: 4, name: 'Владислав Неклюдов', group: '241-337', grades: [65, 70, 72] },
  { id: 5, name: 'Владислав Неклюдов', group: '241-337', grades: [85, 90, 88] },
];

// Вспомогательная функция для расчета среднего
const calculateAverage = (grades: number[]) => {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return Math.round(sum / grades.length);
};

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortStudents = () => {
    const sorted = [...students].sort((a, b) => {
      const avgA = calculateAverage(a.grades);
      const avgB = calculateAverage(b.grades);
      return sortOrder === 'desc' ? avgB - avgA : avgA - avgB;
    });
    setStudents(sorted);
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
      <div className="container mt-5 p-4 border rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Таблица успеваемости</h1>
          <button className="btn btn-primary" onClick={sortStudents}>
            Сортировать по среднему баллу ({sortOrder === 'desc' ? '↓' : '↑'})
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Студент</th>
              <th scope="col">Группа</th>
              {/* ИЗМЕНЕНИЕ: Добавляем colSpan={3}, чтобы заголовок растянулся на 3 колонки */}
              <th scope="col" colSpan={3} className="text-center">Оценки</th>
              {/* ИЗМЕНЕНИЕ: Растягиваем заголовок на 2 колонки (число и прогресс-бар) */}
              <th scope="col" colSpan={2}>Средний балл</th>
            </tr>
            </thead>
            <motion.tbody layout>
              <AnimatePresence>
                {students.map((student, index) => {
                  const average = calculateAverage(student.grades);
                  return (
                      <motion.tr
                          key={student.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                      >
                        <th scope="row">{index + 1}</th>
                        <td>{student.name}</td>
                        <td>{student.group}</td>

                        {/* Ячейки с оценками */}
                        {student.grades.map((grade, i) => (
                            <GradeCell key={i} grade={grade} />
                        ))}
                        <td>
                          <ProgressBar percentage={average} />
                        </td>
                        <td>
                        <GradeCell grade={average} />
                        </td>
                      </motion.tr>
                  );
                })}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </div>
  );
}

export default App;