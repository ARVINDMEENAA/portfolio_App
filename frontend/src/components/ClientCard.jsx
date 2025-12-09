export default function ClientCard({ client }) {
  const imageUrl = `http://localhost:5000${client.image}`;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <img src={imageUrl} alt={client.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
      <h3 className="text-xl font-bold mb-2">{client.name}</h3>
      <p className="text-sm text-blue-600 mb-2">{client.designation}</p>
      <p className="text-gray-600">{client.description}</p>
    </div>
  );
}
