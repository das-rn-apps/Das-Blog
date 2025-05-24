import React from 'react';
import BackToPostsLink from './BackToPostsLink';

interface BlogImageProps {
    imageUrl?: string;
    title: string;
}

const BlogImage: React.FC<BlogImageProps> = ({ imageUrl, title }) => {
    return (
        <div className="relative w-full">
            <div className="absolute top-4 left-4 z-10">
                <BackToPostsLink />
            </div>

            {imageUrl ? (
                <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />
            ) : (
                <div className="w-full h-96 bg-gray-300 flex items-center justify-center text-gray-500 text-8xl font-bold rounded-lg">
                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default BlogImage;
