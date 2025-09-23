import { 
    SERVICES as INITIAL_SERVICES_RAW, 
    BLOG_POSTS as INITIAL_BLOG_POSTS, 
    TESTIMONIALS as INITIAL_TESTIMONIALS,
    POLICIES as INITIAL_POLICIES,
    SOCIAL_LINKS as INITIAL_SOCIAL_LINKS
} from '../constants';
import { MOCK_APPOINTMENTS as INITIAL_APPOINTMENTS } from '../pages/admin/mockData';

// Types
export type Service = {
  iconName: string;
  title: string;
  description: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  content: string;
};

export type Testimonial = {
    quote: string;
    author: string;
    title: string;
};

export type Appointment = {
    id: string;
    fullName: string;
    phoneNumber: string;
    email?: string;
    service: string;
    date: string;
    time: string;
    message?: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
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

export type HeroData = {
    heading: string;
    subheading: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
};

export type WhyChooseUsFeature = {
  title: string;
  description: string;
};

export type WhyChooseUsData = {
  title: string;
  subtitle: string;
  imageUrl: string;
  features: WhyChooseUsFeature[];
};


// Initial Data for Home Page
const INITIAL_HERO_DATA: HeroData = {
    heading: "Premium Auto Care in Ajman",
    subheading: "Your trusted partner for all automotive repairs and maintenance. Quality service, expert technicians, and unbeatable prices.",
    primaryButtonText: "Book an Appointment",
    primaryButtonLink: "/booking",
    secondaryButtonText: "Our Services",
    secondaryButtonLink: "/services"
};

const INITIAL_WHY_CHOOSE_US_DATA: WhyChooseUsData = {
    title: "Why Choose Awlad Meshreky",
    subtitle: "We are committed to providing the highest level of service and quality workmanship for your vehicle.",
    imageUrl: "https://picsum.photos/600/400?grayscale&random=20",
    features: [
        {
            title: "Certified & Experienced Technicians",
            description: "Our team consists of highly trained and certified professionals with years of experience on all major car brands."
        },
        {
            title: "State-of-the-Art Equipment",
            description: "We use the latest diagnostic and repair tools to ensure your vehicle is serviced to manufacturer standards."
        },
        {
            title: "Transparent Pricing",
            description: "We provide clear, upfront estimates before any work begins. No hidden fees, no surprises."
        }
    ]
};


// Generic store functions
const getFromStore = <T,>(key: string, initialData: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        } else {
            // FIX: Create a deep copy of the initial data before storing and returning it.
            // This prevents a critical bug where modifying the initial data in one part of the app
            // (e.g., editing a blog post) would mutate the original constant, causing
            // unintended side effects across the entire application.
            const deepCopy = JSON.parse(JSON.stringify(initialData));
            window.localStorage.setItem(key, JSON.stringify(deepCopy));
            return deepCopy;
        }
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        // FIX: The original code re-threw an error by trying to stringify a
        // potentially circular structure again. Fallback to the initialData
        // reference directly to prevent a crash.
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

// Appointments (Local Storage Implementation)
const getAppointmentsFromStore = (): Appointment[] => getFromStore('appointments_mock', INITIAL_APPOINTMENTS);
const saveAppointmentsToStore = (appointments: Appointment[]): void => saveToStore('appointments_mock', appointments);

export const getAppointments = async (): Promise<Appointment[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const appointments = getAppointmentsFromStore();
            appointments.sort((a, b) => {
                const dateComparison = b.date.localeCompare(a.date);
                if (dateComparison !== 0) return dateComparison;
                return b.time.localeCompare(a.time);
            });
            resolve(appointments);
        }, 500); // Simulate network delay
    });
};

export const addAppointment = async (appointment: Omit<Appointment, 'id' | 'status'>): Promise<void> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            const appointments = getAppointmentsFromStore();
            const newAppointment: Appointment = {
                ...appointment,
                id: new Date().getTime().toString(),
                status: 'Pending' as const,
            };
            saveAppointmentsToStore([newAppointment, ...appointments]);
            resolve();
        }, 500);
    });
};

export const deleteAppointment = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let appointments = getAppointmentsFromStore();
            appointments = appointments.filter(appt => appt.id !== id);
            saveAppointmentsToStore(appointments);
            resolve();
        }, 500);
    });
};

export const updateAppointmentStatus = async (id: string, status: Appointment['status']): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let appointments = getAppointmentsFromStore();
            appointments = appointments.map(appt => appt.id === id ? { ...appt, status } : appt);
            saveAppointmentsToStore(appointments);
            resolve();
        }, 500);
    });
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

// Home Page - Hero
export const getHeroData = (): HeroData => getFromStore('heroData', INITIAL_HERO_DATA);
export const saveHeroData = (data: HeroData): void => saveToStore('heroData', data);

// Home Page - Why Choose Us
export const getWhyChooseUsData = (): WhyChooseUsData => getFromStore('whyChooseUsData', INITIAL_WHY_CHOOSE_US_DATA);
export const saveWhyChooseUsData = (data: WhyChooseUsData): void => saveToStore('whyChooseUsData', data);