import React from 'react';

const BlogTags: React.FC<{ tags: string[] }> = ({ tags }) => {
    if (tags.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 p-4">
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow hover:shadow-md transition duration-200 transform hover:-translate-y-0.5"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};

export default BlogTags;
