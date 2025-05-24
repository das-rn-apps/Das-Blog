import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const BackToPostsLink: React.FC = () => (
    <Link
        to="/"
        className="inline-flex items-center"
        title="Back to all posts"
    >
        <IoArrowBack className="text-xl text-white" />
    </Link>
);

export default BackToPostsLink;
