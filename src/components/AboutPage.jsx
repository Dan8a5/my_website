import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollSection from "./ScrollSection";
import {
  FiDownload,
  FiChevronDown,
  FiUser,
  FiCode,
  FiBook,
} from "react-icons/fi";

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);

  const skills = [
    {
      category: "Frontend",
      items: ["React", "JavaScript", "HTML","CSS", "Tailwind"],
    },
    {
      category: "Backend",
      items: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Supabase",
        "SQLite",
        "Sqlmodel",
        "SqlAlchemy",
      ],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Netlify", "VS Code","Figma"],
    },
  ];

  const education = [
    {
      degree: "Carolina Code School",
      school: "Immersive Full-Stack Development Program",
      year: "2024",
      achievements: [
        "444+ hours/12-week immersive coding bootcamp mastering HTML, CSS, Python, JavaScript, SQL, and React",
        "Independently developed a full-stack application, demonstrating front-end and back-end proficiency",
        "Collaborated on team projects applying Agile methodologies",
        "Built multiple full-stack applications using modern development practices",
      ],
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleDownload = async () => {
    try {
      console.log("Downloading resume...");
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const Section = ({ title, icon: Icon, children, id }) => (
    <motion.div
      className="bg-[#4A5043]/30 backdrop-blur-sm p-8 rounded-2xl mt-12 cursor-pointer"
      onClick={() => setExpandedSection(expandedSection === id ? null : id)}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between text-cream/90">
        <div className="flex items-center gap-3">
          <Icon className="text-2xl" />
          <h2 className="text-3xl font-light leading-relaxed">{title}</h2>
        </div>
        <motion.div
          animate={{ rotate: expandedSection === id ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FiChevronDown className="text-xl" />
        </motion.div>
      </div>
      <AnimatePresence>
        {expandedSection === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pt-6 leading-relaxed text-cream/80"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-cream rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-8 pl-24 pt-32 relative pb-24">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <ScrollSection>
            <div className="flex items-center gap-4 justify-center mb-12">
              <FiUser className="text-5xl text-cream" />
              <h1 className="text-6xl font-light text-cream">About Me</h1>
            </div>
            <div className="text-cream/80 text-xl space-y-8 leading-relaxed">
              <p>
                Marine Corps veteran turned Full-Stack developer. I combine
                military-honed leadership and problem-solving skills with modern
                web development knowledge. My focus is building innovative,
                user-friendly applications that merge functionality with elegant
                design.
              </p>
            </div>
          </ScrollSection>

          <Section title="Technical Skills" icon={FiCode} id="skills">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((category) => (
                <div key={category.category} className="space-y-4">
                  <h3 className="text-xl font-medium text-cream/90">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <motion.span
                        key={skill}
                        className="px-4 py-2 bg-cream/10 rounded-full text-cream hover:bg-cream/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education" icon={FiBook} id="education">
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="text-cream/90">
                  <h3 className="text-2xl">{edu.degree}</h3>
                  <p className="text-cream/60">
                    {edu.school} • {edu.year}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {edu.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-cream/70 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cream/40" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <ScrollSection>
            <motion.button
              className="mt-4 bg-cream/90 hover:bg-cream text-[#4A5043] px-8 py-3 rounded-full text-lg font-medium transition-all hover:-translate-y-1 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
            >
              <FiDownload />
              Download Resume
            </motion.button>
          </ScrollSection>
        </motion.div>
      </div>
    </main>
  );
};

export default AboutPage;