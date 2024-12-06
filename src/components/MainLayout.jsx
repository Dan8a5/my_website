import React from 'react'
import HomePage from './HomePage'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import ProjectsPage from './ProjectsPage'
import Navigation from './Navigation'

const MainLayout = () => {
   return (
     <>
       <Navigation />
       <main className="h-screen overflow-y-auto scroll-smooth">
         <div className="fixed inset-0 bg-gradient-to-br from-[#4A5043] via-[#556B2F] to-[#8B9D83]" />
         <div className="relative">
           <section id="home" className="min-h-screen">
             <HomePage />
           </section>
           <section id="about" className="min-h-screen pt-20">
             <AboutPage />
           </section>
           <section id="projects" className="min-h-screen pt-0">
             <ProjectsPage />
           </section>
           <section id="contact" className="min-h-screen pt-20">
             <ContactPage />
           </section>
         </div>
       </main>
     </>
   )
 }

export default MainLayout