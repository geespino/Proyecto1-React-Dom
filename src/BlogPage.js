// BlogPage.js
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { blogdata } from './blogdata';

function BlogPage() {
    const [posts, setPosts] = useState(blogdata);

    const deletePost = (slug) => {
        setPosts(posts.filter(post => post.slug !== slug));
    };

    const editPost = (slug, newData) => {
        setPosts(posts.map(post =>
            post.slug === slug ? { ...post, ...newData } : post
        ));
    };

    return (
        <>
            <h1>Blog</h1>
            <Outlet context={{ posts, deletePost, editPost }} />
            <ul>
                {posts.map(post => (
                    <BlogLink key={post.slug} post={post}/>
                ))}
            </ul>
        </>
    );
}

function BlogLink({ post }){
    return (
        <li>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
    );
}

export { BlogPage };

