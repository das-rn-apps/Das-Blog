// frontend/src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, deleteBlogPost } from '../api/blogApi';
import Spinner from '../components/Spinner';

interface BlogPost {
    _id: string;
    title: string;
    author: {
        username: string;
    };
    publishedAt: string;
}

const AdminDashboard: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getBlogPosts();
            setBlogPosts(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch blog posts for admin');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setDeleteStatus(null);
            try {
                await deleteBlogPost(id);
                setDeleteStatus('Post deleted successfully!');
                fetchPosts(); // Refresh the list
            } catch (err: any) {
                setDeleteStatus(err.response?.data?.message || 'Failed to delete post.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center mt-8 text-xl">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <Link
                    to="/admin/create-post"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                >
                    Create New Post
                </Link>
            </div>

            {deleteStatus && (
                <p className={`text-center mb-4 ${deleteStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {deleteStatus}
                </p>
            )}

            {blogPosts.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No blog posts to manage.</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Published Date
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogPosts.map((post) => (
                                <tr key={post._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <Link to={`/blog/${post._id}`} className="text-blue-600 hover:underline">
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {post.author.username}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                        <Link
                                            to={`/admin/edit-post/${post._id}`}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;