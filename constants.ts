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

export const BLOG_POSTS = [
    {
      slug: "why-you-shouldnt-ignore-your-check-engine-light",
      title: "Why You Shouldn't Ignore Your Check Engine Light",
      excerpt: "That glowing dashboard light is more than a nuisance; it's your car's way of asking for help. Learn the common causes in the UAE and why a quick diagnostic can save you thousands in repairs.",
      image: "https://picsum.photos/400/250?grayscale&blur=1&random=10",
      content: `The check engine light is one of the most misunderstood indicators on your dashboard. While it might seem like a minor annoyance, ignoring it can lead to severe and costly engine damage down the line. In the UAE's demanding climate, your vehicle's engine is already under stress, making it even more crucial to address potential issues promptly.
      
Common causes for the check engine light include a faulty oxygen sensor, a loose gas cap, a failing catalytic converter, or issues with the spark plugs or ignition coils. While a loose gas cap is a simple fix, other problems can affect your car's performance and fuel economy, and if left unchecked, could result in thousands of dirhams in repair costs. At Awlad Meshreky, our technicians use advanced diagnostic tools to pinpoint the exact cause of the problem, ensuring we fix the right issue the first time.`,
    },
    {
      slug: "guide-to-car-care-in-ajmans-extreme-climate",
      title: "Guide to Car Care in Ajman's Extreme Climate",
      excerpt: "The sun and sand in the UAE can be brutal on your vehicle. We share essential tips for protecting your paint, tires, and A/C system to keep your car in pristine condition year-round.",
      image: "https://picsum.photos/400/250?grayscale&blur=1&random=11",
      content: `Living in Ajman means enjoying beautiful sunny days, but the intense heat, humidity, and fine desert sand can take a toll on your vehicle. Protecting your car from these elements is key to maintaining its value and performance.
      
      **Paint and Exterior:** The relentless sun can fade and damage your car's paint. Regular washing is essential to remove sand and grime, and applying a quality wax or ceramic coating provides a crucial layer of UV protection.
      
      **Tires:** High road temperatures accelerate tire wear. It's vital to check your tire pressure regularly, as under-inflated tires are more prone to blowouts.
      
      **A/C System:** Your car's air conditioning works overtime in the UAE. To ensure it keeps blowing cold, have it serviced annually. This includes checking refrigerant levels and cleaning the filters to ensure optimal performance and air quality.`,
    },
    {
      slug: "german-vs-japanese-cars-a-technicians-take",
      title: "German vs. Japanese Cars: A Technician's Take",
      excerpt: "Ever wondered about the real differences in maintenance? Our experienced technicians break down common repair trends and ownership costs for popular models we service daily.",
      image: "https://picsum.photos/400/250?grayscale&blur=1&random=12",
      content: `At our garage in Ajman, we service a wide variety of vehicles, but the debate between German and Japanese engineering is one we see play out on our service lifts every day. Both are renowned for their quality, but they have distinct characteristics when it comes to maintenance and repair.
      
      **Japanese Cars (e.g., Toyota, Nissan, Honda):** These vehicles are famous for their reliability and lower long-term maintenance costs. Parts are generally more affordable and widely available. They are engineered for durability and often require less frequent complex repairs, making them a practical choice for many drivers.
      
      **German Cars (e.g., Mercedes, BMW, Audi):** German cars are often celebrated for their performance, luxury, and cutting-edge technology. This complexity, however, can lead to higher maintenance costs. They may require specialized tools and more frequent servicing of certain components. While the driving experience is often unparalleled, owners should budget for a higher cost of ownership over the vehicle's lifespan.
      
      Ultimately, the best choice depends on your priorities: the proven reliability and cost-effectiveness of Japanese brands, or the performance and luxury of their German counterparts.`,
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