import { motion } from "motion/react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-bakery-gold font-bold uppercase tracking-[0.3em] text-[10px] block mb-6 italic opacity-80"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-bakery-chocolate tracking-tighter ${align === "center" ? "" : ""}`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`h-[1px] bg-bakery-chocolate/20 mt-12 w-full max-w-sm ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}
