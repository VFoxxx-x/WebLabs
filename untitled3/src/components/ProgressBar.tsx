import { motion } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  const color = percentage > 80 ? '#28a745' : percentage > 60 ? '#ffc107' : '#dc3545';

  return (
      <svg width="100%" height="20" className="rounded">
        <rect width="100%" height="20" fill="#e9ecef" rx="5" />
        <motion.rect
            width={`${percentage}%`}
            height="20"
            fill={color}
            rx="5"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>
  );
};

export default ProgressBar;