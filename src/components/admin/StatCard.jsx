import { motion } from "framer-motion";
const StatCard = ({ title, value, icon, trend, delay = 0 }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
        duration: 0.5,
      }}
      className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-full text-wedding-gold">
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>

      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
        {title}
      </h3>
      <p className="text-3xl font-serif text-wedding-black">{value}</p>
    </motion.div>
  );
};

export default StatCard;
