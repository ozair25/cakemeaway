import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Quote } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Riya Verma",
    text: "The Chocolate Truffle Royale we ordered for my sister's wedding was not just a cake, it was a piece of art. The guests are still talking about it!",
    role: "Celebrity Fashion Stylist"
  },
  {
    id: 2,
    name: "Aman Malhotra",
    text: "Best bento cakes in Indore. Perfectly moist, just the right amount of sweet, and so aesthetic. Highly recommended for small surprises.",
    role: "Lifestyle Blogger"
  },
  {
    id: 3,
    name: "Sneha Jain",
    text: "Ordered a customized Harry Potter cake and they nailed every single detail. It looked too good to eat, but tasted even better!",
    role: "Founder, Bloom Events"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  return (
    <section className="py-24 bg-bakery-champagne text-bakery-chocolate overflow-hidden relative">
      {/* Decorative Quote Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-bakery-gold/5 select-none pointer-events-none">
        <Quote size={400} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading subtitle="Kind Words" title="The Experience" />

        <div className="max-w-4xl mx-auto relative h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center"
            >
              <div className="flex justify-center mb-10">
                <div className="w-20 h-1 bg-bakery-gold/20" />
              </div>
              <p className="text-2xl md:text-4xl font-serif italic mb-10 leading-relaxed font-light">
                "{testimonials[index].text}"
              </p>
              <div>
                <h4 className="text-xl font-bold mb-1">{testimonials[index].name}</h4>
                <p className="text-sm uppercase tracking-[0.3em] text-bakery-gold">{testimonials[index].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-4 mt-20">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`transition-all duration-500 rounded-full h-1.5 ${
                  index === i ? "w-12 bg-bakery-gold" : "w-4 bg-bakery-gold/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
