// frontend/src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { getBlogPosts } from '../api/blogApi';
import BlogPostCard from '../components/BlogPostCard';
import Spinner from '../components/Spinner';

interface BlogPost {
    _id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: {
        _id: string;
        username: string;
        email: string;
    };
    publishedAt: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

const Home: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getBlogPosts();
                setBlogPosts(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch blog posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Latest Blog Posts</h1>
            {blogPosts.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No blog posts found. Stay tuned for new content!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {blogPosts.map((post) => (
                        <BlogPostCard key={post._id} {...post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;