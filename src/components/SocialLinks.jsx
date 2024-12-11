import React from 'react'
import { Github, Linkedin } from "lucide-react"

const SocialLinks = ({ className = "" }) => {
  return (
    <div className={`flex gap-4 ${className}`}>
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
  )
}

export default SocialLinks
