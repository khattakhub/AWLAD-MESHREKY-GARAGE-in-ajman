import React from 'react';

// NOTE: The `icon` property has been replaced with `iconName`, a string identifier.
// The actual component is now resolved using the `iconMap` in `components/icons/index.ts`.
export const SERVICES = [
  {
    iconName: 'wrench',
    title: 'Engine Diagnostics & Repair',
    description: 'Our certified technicians use state-of-the-art tools to accurately identify issues, handling everything from check engine lights to complete engine overhauls for all major vehicle brands.',
  },
  {
    iconName: 'oil',
    title: 'Lube & Oil Change',
    description: 'Experience a superior oil change with manufacturer-approved fully synthetic oils and premium filters, essential for protecting your engine in the harsh UAE climate.',
  },
  {
    iconName: 'brake',
    title: 'Brake System Services',
    description: 'We offer comprehensive brake services, including disc and pad replacement, fluid flushes, and advanced diagnostics for ABS and traction control systems to guarantee your safety.',
  },
  {
    iconName: 'ac',
    title: 'A/C Repair & Service',
    description: 'Our A/C specialists perform electronic leak detection, compressor and condenser repair, and complete refrigerant recharging to restore ice-cold air circulation.',
  },
  {
    iconName: 'tire',
    title: 'Tire Services & Alignment',
    description: 'Maximize your tire life and stability with our precision services, including tire mounting, balancing, and state-of-the-art 3D wheel alignment for perfect handling.',
  },
  {
    iconName: 'sparkle',
    title: 'Professional Detailing',
    description: 'Rediscover your car\'s beauty with multi-stage paint correction, durable ceramic coating for ultimate protection, and deep interior steam cleaning and sanitization.',
  },
];

export const TOOLS = [
  {
    iconName: 'calculator',
    title: 'Car Loan Calculator',
    description: 'Estimate your monthly payments for a new or used car loan.',
    path: '/tools/car-loan-calculator',
  },
  {
    iconName: 'fuel',
    title: 'Fuel Cost Estimator',
    description: 'Calculate the fuel cost for your next road trip or daily commute.',
    path: '/tools/fuel-cost-estimator',
  },
  {
    iconName: 'carTag',
    title: 'Car Resale Value Estimator',
    description: 'Get an estimated market value for your current vehicle.',
    path: '/tools/car-resale-value-estimator',
  },
];

export const TESTIMONIALS = [
  {
    quote: "The team at Awlad Meshreky is incredibly professional and knowledgeable. They fixed my engine issue quickly and at a fair price. Highly recommended!",
    author: "Ahmed Al-Mansoori",
    title: "Satisfied Customer",
  },
  {
    quote: "I've been coming here for years for all my car maintenance. The service is always top-notch and the staff is friendly and honest. They never try to upsell you on things you don't need.",
    author: "Fatima Al-Kaabi",
    title: "Loyal Client",
  },
  {
    quote: "Exceptional detailing service! My car looks brand new, inside and out. The attention to detail is amazing. I'll definitely be back for my next service.",
    author: "Yusuf Khan",
    title: "Car Enthusiast",
  },
];

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/awladmeshreky',
  instagram: 'https://instagram.com/awladmeshreky',
};

export const POLICIES = {
  terms: `Welcome to Awlad Meshreky Garage. These terms and conditions outline the rules and regulations for the use of our website and services.
By accessing this website, we assume you accept these terms and conditions. Do not continue to use Awlad Meshreky Garage if you do not agree to all of the terms and conditions stated on this page.`,
  privacy: `Your privacy is important to us. It is Awlad Meshreky Garage's policy to respect your privacy regarding any information we may collect from you across our website.
We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.`,
  refund: `Our policy lasts 30 days. If 30 days have gone by since your service, unfortunately, we can’t offer you a refund or exchange.
To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.`,
};