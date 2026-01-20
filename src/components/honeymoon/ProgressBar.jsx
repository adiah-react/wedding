import { motion } from "framer-motion";
const ProgressBar = ({ current, target, height = 8 }) => {
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));
  return (
    <div
      className="w-full bg-gray-100 rounded-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <motion.div
        initial={{
          width: 0,
        }}
        animate={{
          width: `${percentage}%`,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="h-full bg-wedding-gold rounded -full"
      />
    </div>
  );
};

export default ProgressBar;
