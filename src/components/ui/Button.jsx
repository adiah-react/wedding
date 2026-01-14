import { motion } from "framer-motion";
const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none tracking-wide uppercase text-sm";

  const variants = {
    primary:
      "bg-wedding-gold text-white hover:bg-[#b08d43] focus:ring-wedding-gold",
    secondary:
      "bg-wedding-black text-white hover:bg-gray-900 focus:ring-wedding-black",
    outline:
      "border border-wedding-black text-wedding-black hover:bg-wedding-black hover:text-white focus:ring-wedding-black bg-transparent",
  };

  const sizes = {
    sm: "h-9 px-4",
    md: "h-11 px-8",
    lg: "h-14 px-10 text-base",
  };

  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
