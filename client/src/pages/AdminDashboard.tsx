// frontend/src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useBlogStore } from '../store/blogStore';

const AdminDashboard: React.FC = () => {

    const { posts, loading, error, fetchPosts, deletePost, clearError } = useBlogStore();
    const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
        return () => {
            clearError();
        };
    }, [fetchPosts, clearError]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setDeleteStatus(null);
            await deletePost(id);

            const currentError = useBlogStore.getState().error;

            if (!currentError) {
                setDeleteStatus('Post deleted successfully!');
            } else {
                setDeleteStatus(currentError || 'Failed to delete post.');
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


    if (error && !deleteStatus) {
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

            {posts.length === 0 ? (
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
                            {posts.map((post) => (
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