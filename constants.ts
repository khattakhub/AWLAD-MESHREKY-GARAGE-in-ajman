
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
    description: 'Advanced diagnostics to pinpoint issues and provide comprehensive engine repairs, from minor fixes to major overhauls.',
  },
  {
    icon: React.createElement(OilDropIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Lube & Oil Change',
    description: 'Keep your engine running smoothly with our premium oil change services, including filter replacement and fluid checks.',
  },
  {
    icon: React.createElement(BrakeIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Brake System Services',
    description: 'Complete brake inspection, pad and rotor replacement, and fluid services to ensure your safety on the road.',
  },
  {
    icon: React.createElement(AcIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'A/C Repair & Service',
    description: 'Stay cool with our expert A/C diagnostics, refrigerant recharging, and component repair for all vehicle types.',
  },
  {
    icon: React.createElement(TireIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Tire Services & Alignment',
    description: 'We offer tire rotation, balancing, and precision wheel alignment to maximize tire life and vehicle performance.',
  },
  {
    icon: React.createElement(SparkleIcon, { className: 'w-8 h-8 text-brand-blue' }),
    title: 'Professional Detailing',
    description: 'Restore your vehicle\'s shine with our interior and exterior detailing packages, including polishing and deep cleaning.',
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
      title: "5 Signs Your Brakes Need Immediate Attention",
      excerpt: "Don't ignore the warning signs. Learn about the critical indicators that your vehicle's brake system requires professional servicing to ensure your safety...",
      image: "https://picsum.photos/400/250?grayscale&blur=1&random=1",
    },
    {
      title: "The Importance of Regular Oil Changes for Engine Health",
      excerpt: "An oil change is more than just routine maintenance; it's the lifeblood of your engine. Discover why this simple service is crucial for longevity...",
      image: "https://picsum.photos/400/250?grayscale&blur=1&random=2",
    },
    {
      title: "How to Maximize Your Car's A/C Performance in the Ajman Heat",
      excerpt: "Beat the heat with a properly functioning A/C. We share expert tips on maintaining your car's air conditioning system is running at peak...",
      image: "https://picsum.photos/400/250?grayscale&blur=1&random=3",
    },
];