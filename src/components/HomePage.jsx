import React, { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";

const HomePage = () => {
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
   setIsLoaded(true);
 }, []);

 return (
   <div className="min-h-screen">
     <div className="container mx-auto px-8 pl-24 pt-32 relative">
       <nav className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-8">
         <a href="https://linkedin.com/in/daniel-m-ochoa" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative bg-cream/10 p-3 rounded-full hover:bg-olive/20 transition-all">
           <Linkedin className="w-6 h-6 text-cream" />
         </a>
         <a href="https://github.com/Dan8a5" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-cream/10 p-3 rounded-full hover:bg-olive/20 transition-all">
           <Github className="w-6 h-6 text-cream" />
         </a>
       </nav>

       <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
         <div className={`max-w-2xl transform transition-all duration-1000 ${
           isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
           <div className="flex items-center gap-4 mb-8">
             <span className="text-4xl">👋</span>
             <h2 className="text-cream text-5xl font-light">@danielochoa</h2>
           </div>

           <div className="mb-12">
             <h1 className="text-6xl font-light text-cream opacity-80">
               <span className="block hover:opacity-100 transition-opacity">Code.</span>
               <span className="block hover:opacity-100 transition-opacity">Create.</span>
               <span className="block hover:opacity-100 transition-opacity">Innovate.</span>
             </h1>
           </div>

           <p className="text-cream/80 text-xl mb-12 max-w-xl leading-relaxed">
             Hello! I'm Daniel, a Greenville, South Carolina based Software Developer with a passion for creating innovative digital experiences.
           </p>

           <button 
             onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
             className="bg-cream/90 hover:bg-cream text-olive px-8 py-3 rounded-full text-lg font-medium transition-all hover:-translate-y-1">
             Say Hello ✈️
           </button>
         </div>

         <div className={`relative transform transition-all duration-1000 ${
           isLoaded ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
           <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden border-4 border-cream/20 hover:border-cream/40 transition-colors duration-300">
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
   </div>
 );
};

export default HomePage;