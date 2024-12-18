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
        <div className="fixed inset-0 bg-gradient-to-br from-[#0c0c0c] via-[#111111] to-[#3c3e3b]" />
        <div className="relative px-4 md:px-8 max-w-7xl mx-auto">
          <section id="home" className="min-h-screen pt-16 md:pt-0">
            <HomePage />
          </section>
          <section id="about" className="h-3/4 pt-12 md:pt-18">
            <AboutPage />
          </section>
          <section id="projects" className="min-h-screen pt-16 md:pt-0">
            <ProjectsPage />
          </section>
          <section id="contact" className="min-h-screen pt-16 md:pt-20">
            <ContactPage />
          </section>
        </div>
      </main>
    </>
  )
}

export default MainLayout
