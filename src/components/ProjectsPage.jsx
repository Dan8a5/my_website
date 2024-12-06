import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const ProjectsPage = () => {
  const projects = [
    {
      title: "Trail Trek",
      description: "An AI-powered National Parks trip planner that creates personalized itineraries and generates detailed park descriptions using OpenAI API. Features interactive search, real-time weather updates, and smart trip planning capabilities.",
      image: "/trailtrek.jpg",
      tech: ["React", "FastApi", "Tailwind CSS", "Supabase"],
      github: "https://github.com/Dan8a5/trail_trek_frontend",
      live: "https://trailtrek.app"
    },
    {
      title: "Syndicate Vintage Vault",
      description: "A vintage clothing e-commerce platform featuring curated collections from different decades. Includes dynamic filtering, secure checkout, and responsive design for optimal mobile shopping experience.",
      image: "/syndicate_vintage.jpg",
      tech: ["React", "FastAPI", "Tailwind CSS", "Supabase"],
      github: "https://github.com/yourusername/syndicate-vault",
      // live: "https://syndicate-vault.com"
    },
    {
      title: "GitHub User Query",
      description: "A React-based GitHub user query application that allows users to search for GitHub users and view their repositories. Features a responsive design and utilizes the GitHub API for data retrieval.",
      image: "/github_user.png",
      tech: ["React", "Tailwind CSS",],
      github: "https://github.com/Dan8a5/github-user-query",
      // live: "https://trailtrek.app"
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-8 pl-24 pt-32 relative">
        <motion.h1 
          className="text-6xl font-light text-cream mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Projects
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;