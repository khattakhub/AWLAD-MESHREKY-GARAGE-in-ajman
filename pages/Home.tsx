import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import ToolCard from '../components/ToolCard';
import TestimonialCard from '../components/TestimonialCard';
import BlogPostCard from '../components/BlogPostCard';
import { getServices, getBlogPosts, getTestimonials } from '../data/store';
import { TOOLS } from '../constants';
import { motion, Variants } from 'framer-motion';
import { iconMap } from '../components/icons';

const cardContainerVariants: Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants: Variants = {
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
            duration: 0.8
        }
    }
};

const Section: React.FC<{ title: string; subtitle: string; children: React.ReactNode; id: string; isGray?: boolean }> = ({ title, subtitle, children, id, isGray }) => (
    <motion.section
        id={id}
        className={`py-16 sm:py-20 ${isGray ? 'bg-gray-50 dark:bg-brand-card/30' : ''}`}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
    >
        <div className="container mx-auto px-6 text-center">
            <motion.h2 variants={cardVariants} className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{title}</motion.h2>
            <motion.p variants={cardVariants} className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">{subtitle}</motion.p>
            {children}
        </div>
    </motion.section>
);

const Home: React.FC = () => {
    const services = getServices();
    const blogPosts = getBlogPosts();
    const testimonials = getTestimonials();

    return (
        <div>
            {/* Hero Section */}
            <section className="relative text-center py-20 sm:py-28 md:py-32 flex items-center justify-center bg-gray-50 dark:bg-transparent">
                <motion.div
                    className="container mx-auto px-6 z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider mb-4 leading-tight">
                        Premium Auto Care in Ajman
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                        Your trusted partner for all automotive repairs and maintenance. Quality service, expert technicians, and unbeatable prices.
                    </p>
                    <Link
                        to="/booking"
                        className="bg-brand-blue hover:bg-brand-blue-hover text-white font-extrabold py-4 px-10 rounded-lg transition duration-300 text-lg inline-block"
                    >
                        Book an Appointment
                    </Link>
                </motion.div>
            </section>

            {/* Services Section */}
            <Section
                id="services"
                title="Our Core Services"
                subtitle="From routine maintenance to complex repairs, we offer a comprehensive range of services to keep your car running smoothly."
            >
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
                    variants={cardContainerVariants}
                >
                    {services.slice(0, 3).map((service, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <ServiceCard 
                                {...service} 
                                icon={React.createElement(iconMap[service.iconName], { className: 'w-8 h-8 text-brand-blue' })}
                                link="/booking"
                            />
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div variants={cardVariants} className="mt-12">
                    <Link to="/services" className="text-brand-blue font-semibold hover:underline">
                        View All Services &rarr;
                    </Link>
                </motion.div>
            </Section>

            {/* Tools Section */}
            <Section
                id="tools"
                title="Helpful Automotive Tools"
                subtitle="Calculate loans, estimate fuel costs, and more with our free online tools designed for car owners."
                isGray={true}
            >
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto"
                    variants={cardContainerVariants}
                >
                    {TOOLS.map((tool, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <ToolCard 
                                {...tool}
                                icon={React.createElement(iconMap[tool.iconName], { className: 'w-8 h-8 text-brand-blue' })}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </Section>
            
            {/* Testimonials Section */}
            <Section
                id="testimonials"
                title="What Our Customers Say"
                subtitle="We're proud of our reputation for quality service and customer satisfaction. Here's what some of our clients have to say."
            >
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
                    variants={cardContainerVariants}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <TestimonialCard {...testimonial} />
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* Blog Section */}
            <Section
                id="blog"
                title="From Our Blog"
                subtitle="Get the latest car care tips, industry news, and expert advice from our seasoned technicians."
                isGray={true}
            >
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
                    variants={cardContainerVariants}
                >
                    {blogPosts.slice(0, 3).map((post, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <BlogPostCard {...post} />
                        </motion.div>
                    ))}
                </motion.div>
                 <motion.div variants={cardVariants} className="mt-12">
                    <Link to="/blog" className="text-brand-blue font-semibold hover:underline">
                        Read More Articles &rarr;
                    </Link>
                </motion.div>
            </Section>
        </div>
    );
};

export default Home;