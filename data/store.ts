import { 
    SERVICES as INITIAL_SERVICES_RAW, 
    BLOG_POSTS as INITIAL_BLOG_POSTS, 
    TESTIMONIALS as INITIAL_TESTIMONIALS,
    POLICIES as INITIAL_POLICIES,
    SOCIAL_LINKS as INITIAL_SOCIAL_LINKS
} from '../constants';
import { MOCK_APPOINTMENTS, MOCK_SUBSCRIBERS } from '../pages/admin/mockData';

// Types
export type Service = {
  iconName: string;
  title: string;
  description: string;
};

export type BlogPost = {
  title: string;
  excerpt: string;
  image: string;
};

export type Testimonial = {
    quote: string;
    author: string;
    title: string;
};

export type Appointment = {
    id: number;
    fullName: string;
    phoneNumber: string;
    email?: string;
    service: string;
    date: string;
    time: string;
    message?: string;
};

export type Subscriber = {
    id: number;
    email: string;
    date: string;
};

export type Policies = {
    terms: string;
    privacy: string;
    refund: string;
};

export type SocialLinks = {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
};


// Generic store functions
const getFromStore = <T,>(key: string, initialData: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        } else {
            window.localStorage.setItem(key, JSON.stringify(initialData));
            return initialData;
        }
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return initialData;
    }
};

const saveToStore = <T,>(key: string, data: T): void => {
    try {
        window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving to localStorage key “${key}”:`, error);
    }
};

// Map initial raw services to the Service type
const INITIAL_SERVICES: Service[] = INITIAL_SERVICES_RAW.map(s => ({
    iconName: s.iconName,
    title: s.title,
    description: s.description
}));

// Services
export const getServices = (): Service[] => getFromStore('services', INITIAL_SERVICES);
export const saveServices = (services: Service[]): void => saveToStore('services', services);

// Blog Posts
export const getBlogPosts = (): BlogPost[] => getFromStore('blogPosts', INITIAL_BLOG_POSTS);
export const saveBlogPosts = (posts: BlogPost[]): void => saveToStore('blogPosts', posts);

// Testimonials (read-only from constants for now)
export const getTestimonials = (): Testimonial[] => INITIAL_TESTIMONIALS;

// Appointments
export const getAppointments = (): Appointment[] => getFromStore('appointments', []);
export const addAppointment = (appointment: Omit<Appointment, 'id'>): void => {
    const appointments = getAppointments();
    const newAppointment: Appointment = {
        ...appointment,
        id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
    };
    saveToStore('appointments', [...appointments, newAppointment]);
};
export const deleteAppointment = (id: number): void => {
    const appointments = getAppointments();
    saveToStore('appointments', appointments.filter(a => a.id !== id));
};


// Subscribers
export const getSubscribers = (): Subscriber[] => getFromStore('subscribers', []);
export const addSubscriber = (subscriber: Omit<Subscriber, 'id' | 'date'>): void => {
    const subscribers = getSubscribers();
    // Prevent duplicates
    if (subscribers.some(s => s.email === subscriber.email)) {
        console.log('Subscriber already exists');
        return;
    }
    const newSubscriber: Subscriber = {
        ...subscriber,
        id: subscribers.length > 0 ? Math.max(...subscribers.map(s => s.id)) + 1 : 1,
        date: new Date().toISOString().split('T')[0]
    };
    saveToStore('subscribers', [newSubscriber, ...subscribers]);
};
export const deleteSubscriber = (id: number): void => {
    const subscribers = getSubscribers();
    saveToStore('subscribers', subscribers.filter(s => s.id !== id));
};

// Policies
export const getPolicies = (): Policies => getFromStore('policies', INITIAL_POLICIES);
export const savePolicies = (policies: Policies): void => saveToStore('policies', policies);

// Social Links
export const getSocialLinks = (): SocialLinks => getFromStore('socialLinks', INITIAL_SOCIAL_LINKS);
export const saveSocialLinks = (links: SocialLinks): void => saveToStore('socialLinks', links);