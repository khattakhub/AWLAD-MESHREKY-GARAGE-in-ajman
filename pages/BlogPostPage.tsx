import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPosts } from '../data/store';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPosts().find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="py-20 sm:py-24 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-brand-blue hover:underline mt-4 inline-block">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
            <Link to="/blog" className="text-brand-blue hover:underline text-sm mb-8 inline-block">
                &larr; Back to All Posts
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">{post.title}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">{post.excerpt}</p>
        </div>
        
        <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-12 border dark:border-brand-border" />
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed space-y-6 whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;