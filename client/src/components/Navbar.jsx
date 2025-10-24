import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MERN Blog
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/create" className="hover:text-blue-500">New Post</Link>
        </div>
      </div>
    </nav>
  );
}
