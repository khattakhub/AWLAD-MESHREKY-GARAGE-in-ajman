

import { 
    SERVICES as INITIAL_SERVICES_RAW, 
    TESTIMONIALS as INITIAL_TESTIMONIALS,
    POLICIES as INITIAL_POLICIES,
    SOCIAL_LINKS as INITIAL_SOCIAL_LINKS
} from '../constants';
import { db } from './firebase';
import { 
    collection, 
    getDocs, 
    addDoc, 
    deleteDoc, 
    doc, 
    updateDoc,
    query,
    orderBy,
    where,
    Timestamp
} from 'firebase/firestore';


// Types
export type Service = {
  iconName: string;
  title: string;
  description: string;
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
    id: string;
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
  features: WhyChooseUsFeature[];
};

// FIX: Added BlogPost type definition.
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  content: string; // HTML content
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

// FIX: Added initial data for blog posts.
const INITIAL_BLOG_POSTS: BlogPost[] = [
    {
        slug: 'understanding-your-cars-check-engine-light',
        title: "Understanding Your Car's Check Engine Light",
        excerpt: "Don't panic! The check-engine light can mean many things. We break down the most common causes and what you should do when it illuminates your dashboard.",
        image: 'https://placehold.co/600x400/3b82f6/white?text=Engine',
        content: `
            <h2>What is the Check Engine Light?</h2>
            <p>The check engine light, officially known as the malfunction indicator lamp (MIL), is a signal from your car's engine computer that something is wrong. It could be a minor issue, like a loose gas cap, or something more serious requiring immediate attention.</p>
            <h3>Common Causes:</h3>
            <ul>
                <li><strong>Loose Gas Cap:</strong> The simplest fix! A loose cap can break the fuel system's vapor seal.</li>
                <li><strong>Faulty Oxygen Sensor:</strong> This sensor monitors unburned oxygen from the exhaust and can affect fuel economy.</li>
                <li><strong>Failing Catalytic Converter:</strong> A critical part of your exhaust system that converts harmful gases.</li>
                <li><strong>Spark Plug Issues:</strong> Worn-out spark plugs or wires can cause misfires.</li>
            </ul>
            <p>If your check engine light comes on, it's best to have it checked by a professional technician. At Awlad Meshreky, we use state-of-the-art diagnostic tools to pinpoint the exact problem and get you back on the road safely.</p>
        `
    },
    {
        slug: 'the-importance-of-regular-oil-changes',
        title: "The Importance of Regular Oil Changes",
        excerpt: "Engine oil is the lifeblood of your vehicle. Learn why sticking to a regular oil change schedule is the single most important thing you can do for your car's health.",
        image: 'https://placehold.co/600x400/3b82f6/white?text=Oil+Change',
        content: `
            <h2>Why Change Your Oil?</h2>
            <p>Regular oil changes are crucial for keeping your engine running smoothly. Engine oil lubricates moving parts, reduces friction, cleans away engine deposits, and helps cool the engine.</p>
            <h3>Benefits of Regular Oil Changes:</h3>
            <ul>
                <li><strong>Improved Engine Performance:</strong> Clean oil allows your engine to run more efficiently.</li>
                <li><strong>Better Fuel Economy:</strong> A well-lubricated engine has less resistance, which can improve your mileage.</li>
                <li><strong>Longer Engine Life:</strong> Prevents the buildup of sludge and dirt that can cause significant damage over time.</li>
            </ul>
            <p>In the harsh UAE climate, it's even more important to use high-quality synthetic oil and change it according to your manufacturer's recommendations. Visit us for a premium lube service to protect your investment.</p>
        `
    },
    {
        slug: 'top-5-tips-for-maintaining-your-ac-in-the-uae',
        title: "Top 5 Tips for Maintaining Your A/C in the UAE",
        excerpt: "A working A/C isn't a luxury in the UAE—it's a necessity. Follow these simple tips to ensure your car's air conditioning system is ready to beat the heat.",
        image: 'https://placehold.co/600x400/3b82f6/white?text=A/C',
        content: `
            <h2>Beat the Heat!</h2>
            <p>Your car's A/C system works hard in the UAE's climate. Regular maintenance is key to avoiding a costly and uncomfortable breakdown.</p>
            <h3>Maintenance Tips:</h3>
            <ol>
                <li><strong>Run it Regularly:</strong> Even in cooler months, run your A/C for a few minutes each week to keep the compressor lubricated.</li>
                <li><strong>Check the Cabin Air Filter:</strong> A clogged filter restricts airflow. It should be replaced annually.</li>
                <li><strong>Listen for Strange Noises:</strong> A rattling or banging sound could indicate a failing compressor.</li>
                <li><strong>Notice Weak Airflow:</strong> This could be a sign of a refrigerant leak, a failing blower motor, or a blockage.</li>
                <li><strong>Get a Professional Check-up:</strong> An annual A/C service can detect leaks and ensure your refrigerant levels are correct.</li>
            </ol>
            <p>Don't wait for your A/C to fail. Schedule a service with our specialists to stay cool and comfortable all year round.</p>
        `
    }
];


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

// Testimonials (read-only from constants for now)
export const getTestimonials = (): Testimonial[] => INITIAL_TESTIMONIALS;

// Appointments (Firebase Implementation)
const appointmentsCollectionRef = collection(db, 'appointments');

export const getAppointments = async (): Promise<Appointment[]> => {
    const q = query(appointmentsCollectionRef, orderBy('date', 'desc'), orderBy('time', 'desc'));
    const querySnapshot = await getDocs(q);
    const appointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Appointment));
    return appointments;
};

export const addAppointment = async (appointment: Omit<Appointment, 'id' | 'status'>): Promise<void> => {
    await addDoc(appointmentsCollectionRef, {
        ...appointment,
        status: 'Pending',
        createdAt: Timestamp.now()
    });
};

export const deleteAppointment = async (id: string): Promise<void> => {
    const appointmentDoc = doc(db, 'appointments', id);
    await deleteDoc(appointmentDoc);
};

export const updateAppointmentStatus = async (id: string, status: Appointment['status']): Promise<void> => {
    const appointmentDoc = doc(db, 'appointments', id);
    await updateDoc(appointmentDoc, { status });
};


// Subscribers (Firebase Implementation)
const subscribersCollectionRef = collection(db, 'subscribers');

export const getSubscribers = async (): Promise<Subscriber[]> => {
    const q = query(subscribersCollectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnap => {
        const data = docSnap.data();
        const createdAt = data.createdAt as Timestamp;
        return {
            id: docSnap.id,
            email: data.email,
            date: createdAt.toDate().toISOString().split('T')[0]
        };
    });
};

export const addSubscriber = async (subscriber: { email: string }): Promise<void> => {
    // Prevent duplicates
    const q = query(subscribersCollectionRef, where("email", "==", subscriber.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        console.log('Subscriber email already exists.');
        return;
    }
    await addDoc(subscribersCollectionRef, {
        email: subscriber.email,
        createdAt: Timestamp.now()
    });
};

export const deleteSubscriber = async (id: string): Promise<void> => {
    const subscriberDoc = doc(db, 'subscribers', id);
    await deleteDoc(subscriberDoc);
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

// FIX: Added functions for getting and saving blog posts.
// Blog Posts
export const getBlogPosts = (): BlogPost[] => getFromStore('blogPosts', INITIAL_BLOG_POSTS);
export const saveBlogPosts = (posts: BlogPost[]): void => saveToStore('blogPosts', posts);