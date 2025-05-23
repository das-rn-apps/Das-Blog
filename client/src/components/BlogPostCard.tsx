// frontend/src/components/BlogPostCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
    _id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: {
        username: string;
    };
    publishedAt: string;
    tags?: string[];
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ _id, title, content, imageUrl, author, publishedAt, tags }) => {
    const excerpt = content.length > 150 ? content.substring(0, 150) + '...' : content;
    const date = new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
            {imageUrl ? (
                <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
            ) : (
                <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-500 text-6xl font-bold">
                    {/* Simple placeholder icon for missing image */}
                    <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-l font-bold text-gray-800 mb-2 leading-tight">
                    <Link to={`/blog/${_id}`} className="hover:text-blue-700 transition-colors duration-200">{title}</Link>
                </h2>
                <p className="text-gray-600 text-xs mb-3 flex items-center">
                    <span className="mr-1">By</span> <span className="font-semibold text-gray-700">{author.username}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <time dateTime={publishedAt}>{date}</time>
                </p>
                <p className="text-gray-700 mb-4 flex-grow text-xs leading-relaxed">{excerpt}</p>
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-blue-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPostCard;