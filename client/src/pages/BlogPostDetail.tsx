import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

import { useBlogStore } from '../store/blogStore';
import BackToPostsLink from '../components/blog/BackToPostsLink';
import BlogContent from '../components/blog/BlogContent';
import BlogImage from '../components/blog/BlogImage';
import BlogMeta from '../components/blog/BlogMeta';
import BlogTags from '../components/blog/BlogTags';
import BlogTitle from '../components/blog/BlogTitle';

const BlogPostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { selectedPost, loading, error, fetchSinglePost, clearError, clearSelectedPost } = useBlogStore();

    useEffect(() => {
        if (id) fetchSinglePost(id);
        return () => {
            clearError();
            clearSelectedPost();
        };
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <Spinner />
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center mt-8 text-xl">{error}</div>;

    if (!selectedPost) return <div className="text-gray-600 text-center mt-8 text-xl">Blog post not found.</div>;

    const date = new Date(selectedPost.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="container mx-auto shadow-md">
            <BlogImage imageUrl={selectedPost.imageUrl} title={selectedPost.title} />
            <BlogTitle title={selectedPost.title} />
            <BlogMeta authorName={selectedPost.author.username} publishedDate={date} />
            <BlogContent content={selectedPost.content} />
            <BlogTags tags={selectedPost.tags || []} />
            <BackToPostsLink />
        </div>
    );
};

export default BlogPostDetail;
