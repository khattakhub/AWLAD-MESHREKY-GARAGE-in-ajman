

import React from 'react';
import { Link } from 'react-router-dom';
import TestimonialCard from '../components/TestimonialCard';
import { getTestimonials, getHeroData, getWhyChooseUsData } from '../data/store';
// FIX: Switched to a namespace import for framer-motion to resolve type errors with motion props.
import * as FM from 'framer-motion';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

// FIX: Re-added explicit Variants type to improve type safety and resolve inference issues.
const cardContainerVariants: FM.Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// FIX: Re-added explicit Variants type to improve type safety and resolve inference issues.
const cardVariants: FM.Variants = {
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
    // FIX: Replaced `motion.section` with `FM.motion.section` to use the namespaced import.
    <FM.motion.section
        id={id}
        className={`py-16 sm:py-20 ${isGray ? 'bg-gray-50 dark:bg-brand-card/30' : ''}`}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
    >
        <div className="container mx-auto px-6 text-center">
            {/* FIX: Replaced `motion.h2` with `FM.motion.h2` to use the namespaced import. */}
            <FM.motion.h2 variants={cardVariants} className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{title}</FM.motion.h2>
            {/* FIX: Replaced `motion.p` with `FM.motion.p` to use the namespaced import. */}
            <FM.motion.p variants={cardVariants} className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">{subtitle}</FM.motion.p>
            {children}
        </div>
    </FM.motion.section>
);

const Home: React.FC = () => {
    const testimonials = getTestimonials();
    const heroData = getHeroData();
    const whyChooseUsData = getWhyChooseUsData();

    return (
        <div>
            {/* Hero Section */}
            <section className="relative text-center py-24 sm:py-32 flex items-center justify-center overflow-hidden bg-white dark:bg-brand-dark">
                 <div className="absolute inset-0 opacity-10 dark:opacity-[0.07]" style={{backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)', backgroundSize: '2rem 2rem'}}></div>
                {/* FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import. */}
                <FM.motion.div
                    className="container mx-auto px-6 z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tighter mb-4 leading-tight">
                        {heroData.heading}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
                        {heroData.subheading}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to={heroData.primaryButtonLink}
                            className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 text-base inline-block w-full sm:w-auto transform hover:scale-105"
                        >
                            {heroData.primaryButtonText}
                        </Link>
                        <Link
                            to={heroData.secondaryButtonLink}
                            className="bg-transparent hover:bg-gray-100 dark:hover:bg-brand-border text-gray-700 dark:text-gray-200 font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-base inline-block border-2 border-gray-300 dark:border-brand-border w-full sm:w-auto"
                        >
                            {heroData.secondaryButtonText}
                        </Link>
                    </div>
                </FM.motion.div>
            </section>

            {/* Why Choose Us Section */}
            <Section
                id="why-us"
                title={whyChooseUsData.title}
                subtitle={whyChooseUsData.subtitle}
                isGray={true}
            >
                <div className="max-w-4xl mx-auto text-left">
                    {/* FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import. */}
                    <FM.motion.div variants={cardContainerVariants} className="space-y-8">
                        {whyChooseUsData.features.map((feature, index) => (
                             // FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import.
                             <FM.motion.div key={index} variants={cardVariants} className="flex items-start">
                                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-blue/10 text-brand-blue">
                                    <CheckCircleIcon className="w-7 h-7" />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">{feature.description}</p>
                                </div>
                            </FM.motion.div>
                        ))}
                    </FM.motion.div>
                </div>
            </Section>

            {/* Testimonials Section */}
            <Section
                id="testimonials"
                title="What Our Customers Say"
                subtitle="We're proud of our reputation for quality service and customer satisfaction. Here's what some of our clients have to say."
            >
                {/* FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import. */}
                <FM.motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
                    variants={cardContainerVariants}
                >
                    {testimonials.map((testimonial, index) => (
                        // FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import.
                        <FM.motion.div key={index} variants={cardVariants}>
                            <TestimonialCard {...testimonial} />
                        </FM.motion.div>
                    ))}
                </FM.motion.div>
            </Section>
        </div>
    );
};

export default Home;