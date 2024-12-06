import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  return (
    <motion.div
      className="fixed w-6 h-6 rounded-full bg-cream/50 pointer-events-none z-50"
      animate={{ x: position.x - 12, y: position.y - 12 }}
      transition={{ type: "spring", damping: 30 }}
    />
  )
}

export default CustomCursor
