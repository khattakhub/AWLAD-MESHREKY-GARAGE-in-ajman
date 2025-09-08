import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import ToolCard from '../components/ToolCard';
import TestimonialCard from '../components/TestimonialCard';
import BlogPostCard from '../components/BlogPostCard';
import { SERVICES, TOOLS, TESTIMONIALS, BLOG_POSTS } from '../constants';

const Section: React.FC<{ title: string; subtitle: string; children: React.ReactNode; id: string; }> = ({ title, subtitle, children, id }) => (
    <section id={id} className="py-20 sm:py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{title}</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">{subtitle}</p>
            {children}
        </div>
    </section>
);

const Home: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative text-center py-32 md:py-48 flex items-center justify-center bg-gray-50 dark:bg-transparent">
                <div className="container mx-auto px-6 z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider mb-4 leading-tight">
                        Premium Auto Care in Ajman
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                        Your trusted partner for all automotive repairs and maintenance. Quality service, expert technicians, and unbeatable prices.
                    </p>
                    <Link
                        to="/booking"
                        className="inline-block bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
                    >
                        Book an Appointment &rarr;
                    </Link>
                </div>
            </section>

            {/* Services Section */}
            <Section id="services" title="Our Services" subtitle="From routine maintenance to complex repairs, we've got you covered.">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {SERVICES.slice(0, 3).map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
                <div className="mt-12">
                    <Link to="/services" className="border border-gray-300 dark:border-brand-border text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-brand-card transition">
                        View All Services
                    </Link>
                </div>
            </Section>

            {/* Automotive Tools Section */}
            <section id="tools" className="py-20 sm:py-24 bg-gray-50 dark:bg-brand-dark">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Automotive Tools</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">Empowering you with the right tools to make informed decisions.</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {TOOLS.map((tool, index) => (
                            <ToolCard key={index} {...tool} />
                        ))}
                    </div>
                     <div className="mt-12">
                        <Link to="/tools" className="border border-gray-300 dark:border-brand-border text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 dark:hover:bg-brand-card transition">
                            Explore All Tools
                        </Link>
                    </div>
                </div>
            </section>

             {/* Testimonials Section */}
            <Section id="testimonials" title="What Our Clients Say" subtitle="We are committed to providing an exceptional experience.">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </Section>

             {/* Blog Section */}
            <section id="blog" className="py-20 sm:py-24 bg-gray-50 dark:bg-brand-dark">
                 <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">From Our Blog</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">Stay informed with the latest news, tips, and insights from our auto care experts.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {BLOG_POSTS.map((post, index) => (
                            <BlogPostCard key={index} {...post} />
                        ))}
                    </div>
                    <div className="mt-12">
                        <Link to="/blog" className="border border-gray-300 dark:border-brand-border text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 dark:hover:bg-brand-card transition">
                            Read All Blogs
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
