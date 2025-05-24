// frontend/src/pages/Home.tsx
import React, { useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import Spinner from '../components/Spinner';

import { useBlogStore } from '../store/blogStore';

const Home: React.FC = () => {
    const { posts, loading, error, fetchPosts, clearError } = useBlogStore();

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts();
        }
        return () => {
            clearError();
        };
    }, [posts.length]);

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
            {posts.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No blog posts found. Stay tuned for new content!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {posts.map((post) => (
                        <BlogPostCard key={post._id} {...post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;