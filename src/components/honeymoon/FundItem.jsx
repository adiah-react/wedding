import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Button from "../ui/Button";
import ProgressBar from "./ProgressBar";

const FundItem = ({ item, onContribute, index }) => {
  const percentage = Math.round((item.currentAmount / item.targetAmount) * 100);
  const isFullyFunded = percentage >= 100;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
      }}
      className={`bg-white border border-gray-100 p-6 rounded-sm flex flex-col h-full transition-shadow duration-300 ${!isFullyFunded ? "hover:shadow-md" : ""}`}
    >
      <div className="text-4xl mb-4 text-center">{item.icon}</div>

      <h3 className="text-2xl font-serif text-wedding-black text-center mb-2">
        {item.title}
      </h3>

      <p className="text-gray-500 font-light text-center mb-6 flex-grow">
        {item.description}
      </p>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-xs uppercase tracking-widest text-gray-400">
          <span>${item.currentAmount.toLocaleString()} raised</span>
          <span>{percentage}%</span>
        </div>

        <ProgressBar current={item.currentAmount} target={item.targetAmount} />

        <div className="text-right text-xs text-gray-400">
          Goal: ${item.targetAmount.toLocaleString()}
        </div>
      </div>

      {isFullyFunded ? (
        <div className="w-full py-3 bg-green-50 text-green-700 rounded-sm flex items-center justify-center font-medium">
          <CheckCircle className="w-4 h-4 mr-2" />
          Fully Funded
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white"
          onClick={() => onContribute(item)}
        >
          Contribute
        </Button>
      )}
    </motion.div>
  );
};

export default FundItem;
