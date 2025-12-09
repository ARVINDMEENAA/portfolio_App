import { useState, useEffect } from 'react';
import { createProject, getProjects, deleteProject, createClient, getClients, deleteClient, getContacts, getSubscribers } from '../api/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // form states
  const [projectForm, setProjectForm] = useState({ name: '', description: '', image: null });
  const [clientForm, setClientForm] = useState({ name: '', description: '', designation: '', image: null });

  useEffect(() => {
    loadAllData();
  }, []);

  // fetch all data from backend
  const loadAllData = async () => {
    setLoading(true);
    try {
      const projectsData = await getProjects();
      const clientsData = await getClients();
      const contactsData = await getContacts();
      const subscribersData = await getSubscribers();
      
      setProjects(projectsData.data);
      setClients(clientsData.data);
      setContacts(contactsData.data);
      setSubscribers(subscribersData.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // handle project form submission
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', projectForm.name);
      formData.append('description', projectForm.description);
      formData.append('image', projectForm.image);
      
      await createProject(formData);
      alert('Project added successfully!');
      setProjectForm({ name: '', description: '', image: null });
      document.getElementById('projectImageInput').value = '';
      loadAllData();
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  // handle client form submission
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', clientForm.name);
      formData.append('description', clientForm.description);
      formData.append('designation', clientForm.designation);
      formData.append('image', clientForm.image);
      
      await createClient(formData);
      alert('Client added successfully!');
      setClientForm({ name: '', description: '', designation: '', image: null });
      document.getElementById('clientImageInput').value = '';
      loadAllData();
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Failed to add client');
    } finally {
      setLoading(false);
    }
  };

  // delete project with confirmation
  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        alert('Project deleted successfully');
        loadAllData();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  // delete client with confirmation
  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(id);
        alert('Client deleted successfully');
        loadAllData();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Failed to delete client');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('projects')} className={`px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Projects</button>
          <button onClick={() => setActiveTab('clients')} className={`px-4 py-2 rounded ${activeTab === 'clients' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Clients</button>
          <button onClick={() => setActiveTab('contacts')} className={`px-4 py-2 rounded ${activeTab === 'contacts' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Contacts</button>
          <button onClick={() => setActiveTab('subscribers')} className={`px-4 py-2 rounded ${activeTab === 'subscribers' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Subscribers</button>
        </div>

        {activeTab === 'projects' && (
          <div>
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-2xl font-bold mb-4">Add Project</h2>
              <form onSubmit={handleProjectSubmit}>
                <input type="text" placeholder="Project Name" value={projectForm.name} onChange={(e) => setProjectForm({...projectForm, name: e.target.value})} className="w-full p-3 mb-4 border rounded" required />
                <textarea placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} className="w-full p-3 mb-4 border rounded" rows="3" required />
                <input id="projectImageInput" type="file" accept="image/*" onChange={(e) => setProjectForm({...projectForm, image: e.target.files[0]})} className="w-full p-3 mb-4 border rounded" required />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
                  {loading ? 'Adding...' : 'Add Project'}
                </button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">All Projects</h2>
              <div className="space-y-4">
                {projects.map(p => (
                  <div key={p._id} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h3 className="font-bold">{p.name}</h3>
                      <p className="text-gray-600">{p.description}</p>
                    </div>
                    <button onClick={() => handleDeleteProject(p._id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div>
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-2xl font-bold mb-4">Add Client</h2>
              <form onSubmit={handleClientSubmit}>
                <input type="text" placeholder="Client Name" value={clientForm.name} onChange={(e) => setClientForm({...clientForm, name: e.target.value})} className="w-full p-3 mb-4 border rounded" required />
                <textarea placeholder="Description" value={clientForm.description} onChange={(e) => setClientForm({...clientForm, description: e.target.value})} className="w-full p-3 mb-4 border rounded" rows="3" required />
                <input type="text" placeholder="Designation (e.g., CEO, Manager)" value={clientForm.designation} onChange={(e) => setClientForm({...clientForm, designation: e.target.value})} className="w-full p-3 mb-4 border rounded" required />
                <input id="clientImageInput" type="file" accept="image/*" onChange={(e) => setClientForm({...clientForm, image: e.target.files[0]})} className="w-full p-3 mb-4 border rounded" required />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
                  {loading ? 'Adding...' : 'Add Client'}
                </button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">All Clients</h2>
              <div className="space-y-4">
                {clients.map(c => (
                  <div key={c._id} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h3 className="font-bold">{c.name}</h3>
                      <p className="text-sm text-gray-600">{c.designation}</p>
                    </div>
                    <button onClick={() => handleDeleteClient(c._id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Contact Submissions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Mobile</th>
                    <th className="text-left p-2">City</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(c => (
                    <tr key={c._id} className="border-b">
                      <td className="p-2">{c.fullName}</td>
                      <td className="p-2">{c.email}</td>
                      <td className="p-2">{c.mobile}</td>
                      <td className="p-2">{c.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'subscribers' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Newsletter Subscribers</h2>
            <div className="space-y-2">
              {subscribers.map(s => (
                <div key={s._id} className="p-3 bg-gray-50 rounded">{s.email}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
