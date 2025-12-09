import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Portfolio</Link>
        <Link to="/admin" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Admin Panel
        </Link>
      </div>
    </nav>
  );
}
