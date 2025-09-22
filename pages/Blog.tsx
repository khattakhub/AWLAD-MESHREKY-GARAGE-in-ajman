import React from 'react';
import BlogPostCard from '../components/BlogPostCard';
import { getBlogPosts } from '../data/store';
// FIX: Removed `Variants` from import to fix type resolution error.
import { motion } from 'framer-motion';

// FIX: Separated container and item variants to resolve framer-motion type error.
// The container variant is responsible for orchestrating the staggering of child animations.
// FIX: Removed `: Variants` annotation to allow TypeScript to infer the type.
const containerVariants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// The item variant defines the animation for each individual blog post card.
// FIX: Removed `: Variants` annotation to allow TypeScript to infer the type.
const itemVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    }
  }
};

const Blog: React.FC = () => {
  const blogPosts = getBlogPosts();

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Our Blog</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-16">
          Stay informed with the latest news, tips, and insights from our auto care experts.
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
          variants={containerVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
            {blogPosts.map((post) => (
                <motion.div key={post.slug} variants={itemVariants}>
                    <BlogPostCard {...post} />
                </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;