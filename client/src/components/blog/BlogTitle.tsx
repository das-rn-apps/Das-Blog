import React from 'react';

const BlogTitle: React.FC<{ title: string }> = ({ title }) => (
    <h1 className="text-4xl font-extrabold  text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-md p-4">
        {title}
    </h1>
);

export default BlogTitle;
