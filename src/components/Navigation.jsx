import React, { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = ["About", "Projects", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id.toLowerCase()).scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#4A5043]/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="md:hidden flex justify-center py-4">
        <div className="flex gap-4">
          <a
            href="https://linkedin.com/in/daniel-m-ochoa"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-cream/10 p-3 rounded-full hover:bg-olive/20 transition-all"
          >
            <Linkedin className="w-6 h-6 text-cream" />
          </a>
          <a
            href="https://github.com/Dan8a5"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-cream/10 p-3 rounded-full hover:bg-olive/20 transition-all"
          >
            <Github className="w-6 h-6 text-cream" />
          </a>
        </div>
      </div>

      <div className="container mx-auto px-8 py-6 flex justify-between items-center" style={{ height: '96px' }}>
        {/* Logo Section */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center"
          aria-label="Go to home"
        >
          <img
            src="/1045_4.png"
            alt="Logo"
            className="h-64 w-auto transform -translate-x-64"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-cream/80 hover:text-cream transition-all text-lg font-medium"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cream"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-cream/10">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-cream/80 hover:text-cream transition-colors px-4 text-left text-lg"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
