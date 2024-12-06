import React from 'react'
import Layout from './Layout'

const Services = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-cream mb-6">Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-cream/10 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-cream mb-2">Service 1</h2>
          <p className="text-cream">Description of service 1</p>
        </div>
        <div className="bg-cream/10 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-cream mb-2">Service 2</h2>
          <p className="text-cream">Description of service 2</p>
        </div>
        {/* Add more services as needed */}
      </div>
    </Layout>
  )
}

export default Services