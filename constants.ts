
import React from 'react';
import WrenchIcon from './components/icons/WrenchIcon';
import OilDropIcon from './components/icons/OilDropIcon';
import BrakeIcon from './components/icons/BrakeIcon';
import AcIcon from './components/icons/AcIcon';
import TireIcon from './components/icons/TireIcon';
import SparkleIcon from './components/icons/SparkleIcon';
import CalculatorIcon from './components/icons/CalculatorIcon';
import FuelIcon from './components/icons/FuelIcon';
import CarTagIcon from './components/icons/CarTagIcon';

export const SERVICES = [
  {
    icon: React.createElement(WrenchIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Engine Diagnostics & Repair',
    description: 'Our certified technicians use state-of-the-art tools to accurately identify issues, handling everything from check engine lights to complete engine overhauls for all major vehicle brands.',
  },
  {
    icon: React.createElement(OilDropIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Lube & Oil Change',
    description: 'Experience a superior oil change with manufacturer-approved fully synthetic oils and premium filters, essential for protecting your engine in the harsh UAE climate.',
  },
  {
    icon: React.createElement(BrakeIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Brake System Services',
    description: 'We offer comprehensive brake services, including disc and pad replacement, fluid flushes, and advanced diagnostics for ABS and traction control systems to guarantee your safety.',
  },
  {
    icon: React.createElement(AcIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'A/C Repair & Service',
    description: 'Our A/C specialists perform electronic leak detection, compressor and condenser repair, and complete refrigerant recharging to restore ice-cold air circulation.',
  },
  {
    icon: React.createElement(TireIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Tire Services & Alignment',
    description: 'Maximize your tire life and stability with our precision services, including tire mounting, balancing, and state-of-the-art 3D wheel alignment for perfect handling.',
  },
  {
    icon: React.createElement(SparkleIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Professional Detailing',
    description: 'Rediscover your car\'s beauty with multi-stage paint correction, durable ceramic coating for ultimate protection, and deep interior steam cleaning and sanitization.',
  },
];

export const TOOLS = [
  {
    icon: React.createElement(CalculatorIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Car Loan Calculator',
    description: 'Estimate your monthly payments for a new or used car loan.',
    path: '/tools/car-loan-calculator',
  },
  {
    icon: React.createElement(FuelIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Fuel Cost Estimator',
    description: 'Calculate the fuel cost for your next road trip or daily commute.',
    path: '/tools/fuel-cost-estimator',
  },
  {
    icon: React.createElement(CarTagIcon, { className: 'w-8 h-8 text-brand-blue' }),
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
      title: "Why You Shouldn't Ignore Your Check Engine Light",
      excerpt: "That glowing dashboard light is more than a nuisance; it's your car's way of asking for help. Learn the common causes in the UAE and why a quick diagnostic can save you thousands in repairs.",
      image: "https://picsum.photos/400/250?grayscale&blur=1&random=10",
    },
    {
      title: "Guide to Car Care in Ajman's Extreme Climate",
      excerpt: "The sun and sand in the UAE can be brutal on your vehicle. We share essential tips for protecting your paint, tires, and A/C system to keep your car in pristine condition year-round.",
      image: "https://picsum.photos/400/250?grayscale&blur=1&random=11",
    },
    {
      title: "German vs. Japanese Cars: A Technician's Take",
      excerpt: "Ever wondered about the real differences in maintenance? Our experienced technicians break down common repair trends and ownership costs for popular models we service daily.",
      image: "https://picsum.photos/400/250?grayscale&blur=1&random=12",
    },
];