import React from 'react';

const BlogContent: React.FC<{ content: string }> = ({ content }) => (
    <div className="border-2 border-dotted border-cyan-400 rounded-l p-4 bg-white shadow-sm mb-5 mx-1">
        <div
            className="prose prose-cyan prose-lg max-w-none text-gray-800 leading-7"
            style={{ wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
        />
    </div>
);

export default BlogContent;
