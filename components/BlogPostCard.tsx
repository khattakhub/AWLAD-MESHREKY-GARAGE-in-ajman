import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  image: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, excerpt, image }) => {
  return (
    <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/10 hover:-translate-y-2">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{excerpt}</p>
        <Link to="/blog" className="text-brand-blue font-semibold text-sm hover:underline mt-auto">
          Read More &rarr;
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;