import { motion } from 'framer-motion'

const ScrollSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}      // Starts invisible and 50px below
      whileInView={{ opacity: 1, y: 0 }}   // Becomes visible and moves to original position
      viewport={{ once: true }}            // Animation triggers once when scrolled into view
      transition={{ duration: 0.6 }}       // Smooth animation over 0.6 seconds
    >
      {children}
    </motion.div>
  )
}

export default ScrollSection
