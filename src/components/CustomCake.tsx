import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Cake, Palette, Sparkles, Send } from "lucide-react";
import Button from "./ui/Button";
import SectionHeading from "./ui/SectionHeading";

export default function CustomCake() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <section id="custom" className="py-24 bg-bakery-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bakery-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-bakery-beige rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          subtitle="One of a Kind" 
          title="Custom Cake Experience" 
        />

        <div className="max-w-4xl mx-auto bg-bakery-champagne backdrop-blur-xl border border-bakery-gold/20 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row shadow-bakery-chocolate/5">
          {/* Progress Sidebar */}
          <div className="bg-bakery-chocolate p-8 md:w-72 flex flex-col justify-between">
            <div>
              <div className="text-white/50 text-xs uppercase tracking-widest mb-8">Design Progress</div>
              <div className="flex flex-col gap-6">
                {[
                  { id: 1, label: "Occasion", icon: Sparkles },
                  { id: 2, label: "Flavor & Size", icon: Cake },
                  { id: 3, label: "Aesthetics", icon: Palette },
                  { id: 4, label: "Details", icon: Calendar },
                ].map((s) => (
                  <div key={s.id} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      step >= s.id ? "bg-bakery-gold text-white" : "border border-white/20 text-white/40"
                    }`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div className={`text-sm font-medium ${step >= s.id ? "text-white" : "text-white/30"}`}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <p className="text-white/40 text-[10px] leading-relaxed">
                *Our designers will reach out via WhatsApp within 2 hours to confirm your vision.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-8 md:p-12 min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                {step === 1 && (
                  <div>
                    <h3 className="text-2xl font-serif mb-6">What are we celebrating?</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {["Birthday", "Wedding", "Anniversary", "Baby Shower", "Promotion", "Other"].map(item => (
                        <button key={item} className="p-4 border border-bakery-gold/20 rounded-2xl hover:bg-bakery-gold hover:text-white transition-all text-left">
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-2xl font-serif mb-6">Pick your flavor palette</h3>
                    <div className="space-y-4">
                      {["Dark Truffle & Berries", "Belgian Chocolate", "Vanilla Bean & Mango", "Red Velvet Cheese", "Biscoff Dream"].map(flavor => (
                        <div key={flavor} className="flex items-center justify-between p-4 border border-bakery-gold/20 rounded-2xl cursor-pointer hover:border-bakery-gold">
                          <span>{flavor}</span>
                          <input type="radio" name="flavor" className="w-5 h-5 accent-bakery-gold" />
                        </div>
                      ))}
                      <div className="mt-8">
                        <label className="text-xs uppercase tracking-widest text-bakery-chocolate/60 block mb-2">Weight</label>
                        <select className="w-full p-4 bg-transparent border border-bakery-gold/20 rounded-2xl focus:border-bakery-gold outline-none">
                          <option>0.5 Kg (Perfect for 2-4)</option>
                          <option>1.0 Kg (Serves 6-10)</option>
                          <option>2.0 Kg + (Large Gatherings)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="text-2xl font-serif mb-6">Visual aesthetic</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-bakery-chocolate/60 block mb-3">Color Theme</label>
                        <div className="flex gap-4">
                          {["#FEECE9", "#FDFCF8", "#C5A059", "#3C2A21", "#B8D8BA"].map(c => (
                            <div key={c} style={{ backgroundColor: c }} className="w-10 h-10 rounded-full border border-bakery-gold/20 cursor-pointer hover:scale-110 transition-transform" />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-bakery-chocolate/60 block mb-3">Inspiring Image (Optional)</label>
                        <div className="border-2 border-dashed border-bakery-gold/20 rounded-3xl p-8 text-center hover:border-bakery-gold transition-colors cursor-pointer">
                          <p className="text-sm text-bakery-chocolate/40">Drag & Drop or click to upload</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif mb-6">Delivery Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Your Name" className="w-full p-4 bg-transparent border border-bakery-gold/20 rounded-2xl outline-none" />
                      <input type="tel" placeholder="WhatsApp Number" className="w-full p-4 bg-transparent border border-bakery-gold/20 rounded-2xl outline-none" />
                      <input type="date" className="w-full p-4 bg-transparent border border-bakery-gold/20 rounded-2xl outline-none" />
                      <input type="text" placeholder="Delivery Location" className="w-full p-4 bg-transparent border border-bakery-gold/20 rounded-2xl outline-none" />
                    </div>
                    <textarea placeholder="Special Message or Notes..." className="w-full p-4 bg-transparent border border-bakery-gold/20 rounded-2xl outline-none h-32"></textarea>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between items-center bg-white/20 p-2 rounded-full border border-bakery-gold/10">
              <button 
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  step === 1 ? "opacity-0" : "hover:bg-bakery-chocolate/5"
                }`}
              >
                Back
              </button>
              <div className="text-[10px] uppercase tracking-widest text-bakery-chocolate/40">
                Step {step} of {totalSteps}
              </div>
              <Button 
                onClick={step === totalSteps ? undefined : nextStep}
                className="px-10"
              >
                {step === totalSteps ? (
                  <span className="flex items-center gap-2">Send Request <Send className="w-4 h-4" /></span>
                ) : "Next Step"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
