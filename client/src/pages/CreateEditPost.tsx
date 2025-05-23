// frontend/src/pages/CreateEditPost.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlogPost, getBlogPostById, updateBlogPost } from '../api/blogApi';
import Spinner from '../components/Spinner';

interface BlogPostFormState {
    title: string;
    content: string;
    imageUrl: string;
    tags: string; // Comma-separated string for input
}

const CreateEditPost: React.FC = () => {
    const { id } = useParams<{ id?: string }>(); // 'id' will be present for editing
    const navigate = useNavigate();
    const [formData, setFormData] = useState<BlogPostFormState>({
        title: '',
        content: '',
        imageUrl: '',
        tags: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            setLoading(true);
            const fetchPost = async () => {
                try {
                    const post = await getBlogPostById(id);
                    setFormData({
                        title: post.title,
                        content: post.content,
                        imageUrl: post.imageUrl || '',
                        tags: post.tags ? post.tags.join(', ') : '',
                    });
                } catch (err: any) {
                    setError(err.response?.data?.message || 'Failed to load post for editing');
                } finally {
                    setLoading(false);
                }
            };
            fetchPost();
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const postData = {
            title: formData.title,
            content: formData.content,
            imageUrl: formData.imageUrl,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        };

        try {
            if (isEditMode && id) {
                await updateBlogPost(id, postData);
                setSuccess('Blog post updated successfully!');
            } else {
                await createBlogPost(postData);
                setSuccess('Blog post created successfully!');
                setFormData({ title: '', content: '', imageUrl: '', tags: '' }); // Clear form
            }
            setTimeout(() => navigate('/admin'), 2000); // Redirect after 2 seconds
        } catch (err: any) {
            setError(err.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) { // Only show spinner if loading an existing post
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 my-8 max-w-2xl bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}
            {loading && <Spinner />} {/* Show spinner on submission */}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows={10}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
                        Image URL (Optional)
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
                        Tags (comma-separated, Optional)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="e.g., react, nodejs, webdev"
                        value={formData.tags}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    disabled={loading}
                >
                    {isEditMode ? 'Update Post' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreateEditPost;