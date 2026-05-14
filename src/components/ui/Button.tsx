import React from "react";
import { motion } from "motion/react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = "primary", 
  className = "", 
  onClick,
  type = "button",
  disabled = false
}: ButtonProps) {
  const baseStyles = "px-8 py-3 font-semibold uppercase text-[10px] tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-bakery-chocolate text-bakery-cream hover:opacity-90",
    secondary: "bg-bakery-gold text-white hover:opacity-90",
    outline: "border border-bakery-chocolate text-bakery-chocolate hover:bg-bakery-chocolate hover:text-white rounded-full",
    ghost: "text-bakery-chocolate hover:opacity-50"
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant] === "outline" ? "rounded-full" : ""} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      />
    </motion.button>
  );
}
