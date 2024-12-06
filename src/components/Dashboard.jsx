import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { motion, AnimatePresence } from 'framer-motion'

const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [contacts, setContacts] = useState([])
  const [activeTab, setActiveTab] = useState('projects')
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    project_url: ''
  })
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [editingProject, setEditingProject] = useState(null)

  useEffect(() => {
    fetchProjects()
    fetchContacts()
  }, [])

  const fetchProjects = async () => {
    const response = await fetch('http://localhost:8000/api/projects')
    const data = await response.json()
    setProjects(data)
  }

  const fetchContacts = async () => {
    const response = await fetch('http://localhost:8000/api/contacts')
    const data = await response.json()
    setContacts(data)
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectForm)
    })
    if (response.ok) {
      fetchProjects()
      setShowProjectForm(false)
      setProjectForm({
        title: '',
        description: '',
        category: '',
        image_url: '',
        project_url: ''
      })
    }
  }

  const handleDelete = async (projectId) => {
    const response = await fetch(`http://localhost:8000/api/projects/${projectId}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      setProjects(projects.filter(p => p.id !== projectId))
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:8000/api/projects/${editingProject.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingProject)
    })
    if (response.ok) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p))
      setEditingProject(null)
    }
  }

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(filter.toLowerCase()) ||
    project.category.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'category':
        return a.category.localeCompare(b.category)
      case 'date':
        return new Date(b.created_at) - new Date(a.created_at)
      default:
        return 0
    }
  })

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-cream mb-6">Dashboard</h1>
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'projects' ? 'bg-cream text-black' : 'bg-cream/10 text-cream'
            }`}
          >
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'contacts' ? 'bg-cream text-black' : 'bg-cream/10 text-cream'
            }`}
          >
            Contacts
          </button>
        </div>

        {activeTab === 'projects' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <input
                type="text"
                placeholder="Filter projects..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-cream/10 text-cream rounded-lg"
              />
              <button
                onClick={() => setShowProjectForm(true)}
                className="px-4 py-2 bg-cream text-black rounded-lg"
              >
                Add Project
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-cream/10 text-cream rounded-lg"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>

            {showProjectForm && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream/10 p-6 rounded-lg mb-6"
                onSubmit={handleProjectSubmit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="px-4 py-2 bg-cream/10 text-cream rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    className="px-4 py-2 bg-cream/10 text-cream rounded-lg"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={projectForm.image_url}
                    onChange={(e) => setProjectForm({...projectForm, image_url: e.target.value})}
                    className="px-4 py-2 bg-cream/10 text-cream rounded-lg"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Project URL"
                    value={projectForm.project_url}
                    onChange={(e) => setProjectForm({...projectForm, project_url: e.target.value})}
                    className="px-4 py-2 bg-cream/10 text-cream rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    className="px-4 py-2 bg-cream/10 text-cream rounded-lg col-span-2"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowProjectForm(false)}
                    className="px-4 py-2 bg-cream/10 text-cream rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cream text-black rounded-lg"
                  >
                    Save Project
                  </button>
                </div>
              </motion.form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {sortedProjects.map(project => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative bg-cream/10 p-4 rounded-lg"
                  >
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="p-2 bg-cream/20 rounded-full hover:bg-cream/30"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 bg-cream/20 rounded-full hover:bg-cream/30"
                      >
                        🗑️
                      </button>
                    </div>
                    <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h3 className="text-xl font-semibold text-cream">{project.title}</h3>
                    <p className="text-cream/80">{project.description}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-4">
            {contacts.map(contact => (
              <motion.div
                key={contact.id}
                className="bg-cream/10 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-xl font-semibold text-cream">{contact.name}</h3>
                <p className="text-cream/80">{contact.email}</p>
                <p className="text-cream/60">{contact.message}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {editingProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
        >
          <div className="bg-cream/10 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-cream mb-4">Edit Project</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                className="w-full px-4 py-2 bg-cream/10 text-cream rounded-lg"
              />
              {/* Add other form fields */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-cream/10 text-cream rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cream text-black rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </Layout>
  )
}

export default Dashboard