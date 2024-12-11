import React, { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const ScrollIndicator = () => {
  return (
    <motion.div 
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.div 
        className="text-cream/50 text-lg tracking-wide"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Discover More
      </motion.div>
      <motion.div
        className="text-cream/50 text-2xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ↓
      </motion.div>
    </motion.div>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cream/10 rounded-full"
          animate={{
            y: ["0vh", "100vh"],
            x: Math.random() * 100 + "vw"
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
   <div className="container mx-auto px-8 pl-24 pt-32 relative">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className={`max-w-2xl transform transition-all duration-1000 ${
            isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
            <div className="flex items-center gap-4 mb-8">
            </div>

            <div className="mb-12">
              <h1 className="text-6xl font-light text-cream opacity-80">
                <span className="block hover:opacity-100 transition-opacity">Code.</span>
                <span className="block hover:opacity-100 transition-opacity">Create.</span>
                <span className="block hover:opacity-100 transition-opacity">Innovate.</span>
              </h1>
            </div>

            <p className="text-cream/80 text-xl mb-12 max-w-xl leading-relaxed">
              Hello! I'm Daniel Ochoa, a Greenville, South Carolina based Software Developer with a passion for creating innovative digital experiences.
            </p>

            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="bg-cream/90 hover:bg-cream text-olive px-8 py-3 rounded-full text-lg font-medium transition-all hover:-translate-y-1">
              Say Hello ✈️
            </button>
          </div>

          <div className={`relative transform transition-all duration-1000 ${
            isLoaded ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
            <div className="relative w-[250px] h-[250px] rounded-full overflow-hidden border-4 border-cream/20 hover:border-cream/40 transition-colors duration-300">
              <img
                src="/me.jpg"
                alt="Daniel Ochoa"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                style={{
                  objectPosition: "center 0%",
                  transform: "scale(1.2)",
                  transformOrigin: "center 10%",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olive/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </div>
  );
};

export default HomePage;