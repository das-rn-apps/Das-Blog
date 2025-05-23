// frontend/src/pages/BlogPostDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostById } from '../api/blogApi';
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

const BlogPostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) {
                setError('Blog post ID is missing.');
                setLoading(false);
                return;
            }
            try {
                const data = await getBlogPostById(id);
                setBlogPost(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch blog post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

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

    if (!blogPost) {
        return <div className="text-gray-600 text-center mt-8 text-xl">Blog post not found.</div>;
    }

    const date = new Date(blogPost.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="container mx-auto p-4 max-w-4xl bg-white rounded-lg shadow-md my-8">
            {blogPost.imageUrl && (
                <img src={blogPost.imageUrl} alt={blogPost.title} className="w-full h-96 object-cover rounded-lg mb-6" />
            )}
            <h1 className="text-4xl font-bold text-gray-800 mb-3">{blogPost.title}</h1>
            <p className="text-gray-600 text-md mb-6">
                By <span className="font-semibold">{blogPost.author.username}</span> on {date}
            </p>

            <div className="prose lg:prose-lg max-w-none text-gray-700 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br />') }}
            ></div>

            {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    {blogPost.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
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