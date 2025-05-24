// frontend/src/pages/BlogPostDetail.tsx
import React, { useEffect } from 'react'; // Removed useState
import { useParams, Link } from 'react-router-dom';
// Removed: import { getBlogPostById } from '../api/blogApi'; // No longer directly import API
import Spinner from '../components/Spinner';
// Removed: interface BlogPost {} // Type is now in store/blogStore.ts

import { useBlogStore } from '../store/blogStore'; // Import the new blog store

const BlogPostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Select state and actions from the store
    const { selectedPost, loading, error, fetchSinglePost, clearError, clearSelectedPost } = useBlogStore();

    useEffect(() => {
        if (id) {
            fetchSinglePost(id); // Fetch single post when ID changes
        }
        return () => {
            clearError(); // Clear error on unmount
            clearSelectedPost(); // Clear selected post on unmount to prevent stale data
        };
    }, [id, fetchSinglePost, clearError, clearSelectedPost]); // Dependencies for useEffect

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

    if (!selectedPost) {
        return <div className="text-gray-600 text-center mt-8 text-xl">Blog post not found.</div>;
    }

    // Use selectedPost for rendering
    const date = new Date(selectedPost.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="container mx-auto p-4 max-w-4xl bg-white rounded-lg shadow-md my-8">
            {selectedPost.imageUrl ? (
                <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-96 object-cover rounded-lg mb-6" />
            ) : (
                <div className="w-full h-96 bg-gray-300 flex items-center justify-center text-gray-500 text-8xl font-bold rounded-lg mb-6">
                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
            )}
            <h1 className="text-4xl font-bold text-gray-800 mb-3">{selectedPost.title}</h1>
            <p className="text-gray-600 text-md mb-6">
                By <span className="font-semibold">{selectedPost.author.username}</span> on {date}
            </p>

            <div className="prose lg:prose-lg max-w-none text-gray-700 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n/g, '<br />') }}
            ></div>

            {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    {selectedPost.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="text-center">
                <Link to="/" className="text-blue-600 hover:underline text-lg">
                    ← Back to all posts
                </Link>
            </div>
        </div>
    );
};

export default BlogPostDetail;