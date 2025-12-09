export default function ProjectCard({ project }) {
  const imageUrl = `http://localhost:5000${project.image}`;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={imageUrl} alt={project.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Read More
        </button>
      </div>
    </div>
  );
}
