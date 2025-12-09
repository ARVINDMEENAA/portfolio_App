import { useState, useEffect } from 'react';
import { getProjects, getClients } from '../api/api';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // fetch projects and clients
      const projectsResponse = await getProjects();
      const clientsResponse = await getClients();
      
      setProjects(projectsResponse.data);
      setClients(clientsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Portfolio</h1>
          <p className="text-xl">Discover our amazing projects and happy clients</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Projects</h2>
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map(project => <ProjectCard key={project._id} project={project} />)}
            </div>
          ) : (
            <p className="text-center text-gray-500">No projects available yet.</p>
          )}
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Happy Clients</h2>
          {clients.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {clients.map(client => <ClientCard key={client._id} client={client} />)}
            </div>
          ) : (
            <p className="text-center text-gray-500">No client testimonials yet.</p>
          )}
        </div>
      </section>

      <ContactForm />
      <Newsletter />
    </div>
  );
}
