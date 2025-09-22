import React, { useState } from 'react';
import { getBlogPosts, saveBlogPosts, BlogPost } from '../../data/store';
import PencilIcon from '../../components/icons/PencilIcon';
import TrashIcon from '../../components/icons/TrashIcon';
import { AnimatePresence, motion } from 'framer-motion';
import RichTextEditor from '../../components/admin/RichTextEditor';

type BlogPostData = Omit<BlogPost, 'slug'>;

const BlogModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BlogPostData) => void;
  post: BlogPost | null;
}> = ({ isOpen, onClose, onSave, post }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [image, setImage] = useState(post?.image || '');
  const [content, setContent] = useState(post?.content || '');

  React.useEffect(() => {
    setTitle(post?.title || '');
    setExcerpt(post?.excerpt || '');
    setImage(post?.image || '');
    setContent(post?.content || '');
  }, [post]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !image || !content) {
        alert('Please fill out all fields.');
        return;
    }
    onSave({ title, excerpt, image, content });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-xl w-full max-w-2xl p-6"
        onClick={e => e.stopPropagation()}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{post ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blog Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 dark:file:bg-brand-blue/20 dark:file:text-white"/>
                {image && <img src={image} alt="Preview" className="mt-2 w-48 h-28 object-cover rounded-md border dark:border-brand-border" />}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt (Short Summary)</label>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} required rows={3} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Content</label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3 border-t dark:border-brand-border pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-brand-border text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm">Cancel</button>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm">Save Post</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};


const AdminBlog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>(getBlogPosts());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    const handleAdd = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    const handleDelete = (postSlug: string) => {
        const postToDelete = posts.find(p => p.slug === postSlug);
        if (window.confirm(`Are you sure you want to delete "${postToDelete?.title}"?`)) {
            const updatedPosts = posts.filter(p => p.slug !== postSlug);
            setPosts(updatedPosts);
            saveBlogPosts(updatedPosts);
        }
    };

    const handleSave = (data: BlogPostData) => {
        let updatedPosts;
        if (editingPost) {
             updatedPosts = posts.map(p => p.slug === editingPost.slug ? { ...data, slug: editingPost.slug } : p);
        } else {
            const newSlug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            if (posts.some(p => p.slug === newSlug)) {
                alert('A blog post with this title already exists. Please use a unique title.');
                return;
            }
            const newPost: BlogPost = { ...data, slug: newSlug };
            updatedPosts = [newPost, ...posts];
        }
        setPosts(updatedPosts);
        saveBlogPosts(updatedPosts);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Manage Blog Posts</h1>
                <button onClick={handleAdd} className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-5 rounded-lg transition duration-300 text-sm">Add New Post</button>
            </div>
            <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-card/30 dark:text-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Image</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Excerpt</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post) => (
                        <tr key={post.slug} className="bg-white dark:bg-brand-card border-b dark:border-brand-border">
                        <td className="px-6 py-4">
                            <img src={post.image} alt={post.title} className="w-24 h-16 object-cover rounded-md" />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{post.title}</td>
                        <td className="px-6 py-4 max-w-md">
                            <p className="line-clamp-2">{post.excerpt}</p>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                            <button onClick={() => handleEdit(post)} className="text-brand-blue hover:text-brand-blue-hover p-2">
                                <PencilIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(post.slug)} className="text-red-500 hover:text-red-700 p-2 ml-2">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            <AnimatePresence>
                {isModalOpen && <BlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} post={editingPost} />}
            </AnimatePresence>
        </div>
    );
};

export default AdminBlog;