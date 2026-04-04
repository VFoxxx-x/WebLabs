import { motion } from 'framer-motion';

interface GradeCellProps {
    grade: number;
}

const GradeCell = ({ grade }: GradeCellProps) => {
    return (
        <motion.td
            className="text-center fw-bold"
            whileHover={{
                backgroundColor: "rgba(35,104,241,0.45)",
                zIndex: 1,
                position: 'relative',
                borderRadius: '8px',
            }}
            transition={{ type: 'tween', duration: 0.4 }}
        >
            {grade}
        </motion.td>
    );
};

export default GradeCell;