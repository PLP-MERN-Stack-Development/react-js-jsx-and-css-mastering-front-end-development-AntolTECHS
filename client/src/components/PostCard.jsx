import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 line-clamp-3">{post.content}</p>

      {/* Replaced "Read more" with Update button */}
      <div className="mt-3 flex justify-end">
        <Link
          to={`/edit/${post._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
        >
          Update
        </Link>
      </div>
    </div>
  );
}
