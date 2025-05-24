import React from 'react';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

interface BlogMetaProps {
    authorName: string;
    publishedDate: string;
}

const BlogMeta: React.FC<BlogMetaProps> = ({ authorName, publishedDate }) => (
    <div className="flex items-center justify-center space-x-6 text-gray-500 text-sm md:text-md mb-6 font-sans select-none">
        <span className="flex items-center space-x-2">
            <FaUser className="text-cyan-400" />
            <span className="font-semibold text-gray-700 hover:text-cyan-500 cursor-default">{authorName}</span>
        </span>

        <span className="flex items-center space-x-2">
            <FaCalendarAlt className="text-cyan-400" />
            <time className="text-gray-600">{publishedDate}</time>
        </span>
    </div>
);

export default BlogMeta;
