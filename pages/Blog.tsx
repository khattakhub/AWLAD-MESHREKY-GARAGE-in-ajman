import React from 'react';
import BlogPostCard from '../components/BlogPostCard';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Our Blog</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-16">
          Stay informed with the latest news, tips, and insights from our auto care experts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {BLOG_POSTS.map((post, index) => (
                <BlogPostCard key={index} {...post} />
            ))}
            {/* You can duplicate or add more posts here for a fuller page */}
             {BLOG_POSTS.map((post, index) => (
                <BlogPostCard key={index+3} {...post} image={`${post.image}&sig=${index+3}`} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
