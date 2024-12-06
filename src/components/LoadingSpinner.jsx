import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <motion.div
      className="w-16 h-16 border-4 border-cream rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )
}
