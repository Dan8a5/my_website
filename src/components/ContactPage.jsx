import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageCircle, FiSend } from 'react-icons/fi';
import { supabase } from '../lib/supabaseClient';

const InputField = ({ icon: Icon, label, ...props }) => (
  <div>
    <label htmlFor={props.id} className="block text-cream/80 mb-2 text-sm">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/50" />
      {props.type === 'textarea' ? (
        <textarea
          {...props}
          autoComplete="on"
          className="w-full pl-10 px-4 py-2 bg-cream/10 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-cream/50 placeholder:text-cream/30"
        />
      ) : (
        <input
          {...props}
          autoComplete={
            props.id === 'name' ? 'name' :
            props.id === 'email' ? 'email' :
            'on'
          }
          className="w-full pl-10 px-4 py-2 bg-cream/10 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-cream/50 placeholder:text-cream/30"
        />
      )}
    </div>
  </div>
);

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-8 pl-24 pt-32 relative pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-6xl font-light text-cream mb-4 text-center">Get in Touch</h1>
          <p className="text-cream/70 text-center mb-12">I'd love to hear from you. Send me a message!</p>

          <div className="bg-[#4A5043]/30 backdrop-blur-sm p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                icon={FiUser}
                label="Name"
                type="text"
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              
              <InputField
                icon={FiMail}
                label="Email"
                type="email"
                id="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              
              <InputField
                icon={FiMessageCircle}
                label="Message"
                type="textarea"
                id="message"
                rows="4"
                placeholder="Your message here..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
              
              <motion.button
                type="submit"
                className="w-full bg-cream/90 hover:bg-cream text-[#4A5043] px-8 py-3 rounded-full text-lg font-medium transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-[#4A5043] rounded-full border-t-transparent"
                  />
                ) : (
                  <>
                    <FiSend className="text-lg" />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-center p-3 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-500/20 text-green-100' 
                      : 'bg-red-500/20 text-red-100'
                  }`}
                >
                  {submitStatus === 'success' 
                    ? 'Message sent successfully!' 
                    : 'Failed to send message. Please try again.'}
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default ContactPage;