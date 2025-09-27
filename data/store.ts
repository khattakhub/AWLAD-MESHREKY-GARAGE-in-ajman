


/*
NOTE FOR DEVELOPER:
The application has been configured to use the browser's localStorage for storing appointments and subscribers.
This ensures the app is fully functional for demonstration purposes without requiring a live Firebase backend configuration.
The original Firebase Firestore functions have been commented out below.

To switch back to Firebase:
1. Ensure your `data/firebase.ts` file has the correct configuration for your Firebase project.
2. Make sure you have created a Firestore database in your Firebase project.
3. Set up the necessary Firestore security rules to allow reading and writing to the 'appointments' and 'subscribers' collections. 
   A simple rule for development is:
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
4. Comment out the localStorage functions below and uncomment the Firebase functions.
5. Update the components that use these functions to handle the asynchronous nature of Firebase calls (e.g., using async/await, .then(), and managing loading states).
*/

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
    content: string;
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
        slug: '5-signs-your-car-needs-a-brake-check',
        title: '5 Signs Your Car Needs a Brake Check',
        excerpt: 'Your brake system is crucial for safety. Learn to recognize the warning signs that indicate it\'s time for a professional inspection.',
        image: 'https://plus.unsplash.com/premium_photo-1682145732148-28c24734c341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: `<p>Your vehicle's braking system is arguably its most important safety feature. Ignoring warning signs can lead to costly repairs and, more importantly, compromise your safety on the road. Here are five common indicators that your car needs a professional brake check.</p>
        <h3>1. Squealing or Grinding Noises</h3>
        <p>A high-pitched squeal when you apply the brakes is often the first sign of wear. This sound comes from a small metal indicator built into the brake pads. If you hear a grinding noise, it's a more serious issue, suggesting the pads are completely worn and the metal caliper is grinding against the rotor. This can cause significant damage and requires immediate attention.</p>
        <h3>2. Spongy or Soft Brake Pedal</h3>
        <p>If your brake pedal feels softer than usual or sinks towards the floor with little resistance, it could signal air or moisture in the braking system or a problem with the master cylinder. This significantly reduces braking effectiveness and is a major safety hazard.</p>
        <h3>3. Car Pulling to One Side</h3>
        <p>When you brake, does your vehicle pull to the left or right? This could be due to a stuck brake caliper or uneven wear on the brake pads. It's essential to have this checked to ensure stable and predictable braking.</p>`
    },
    {
        slug: 'the-importance-of-regular-oil-changes-in-the-uae',
        title: 'The Importance of Regular Oil Changes in the UAE Climate',
        excerpt: 'Engine oil is the lifeblood of your vehicle, especially in extreme heat. Discover why a regular oil change schedule is crucial for your car in the UAE.',
        image: 'https://images.unsplash.com/photo-1628102490520-7330364a6135?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: `<h2>Why is Engine Oil So Important?</h2>
        <p>Engine oil serves several critical functions: it lubricates moving parts to reduce friction, absorbs heat to prevent overheating, and cleans the engine by carrying away dirt and debris. In the extreme temperatures of the UAE, engine oil breaks down much faster. Neglecting oil changes here can quickly lead to decreased performance, lower fuel economy, and catastrophic engine failure.</p>
        <h3>When to Change Your Oil</h3>
        <p>While modern cars and synthetic oils allow for longer intervals, the harsh climate in the UAE means you should be more vigilant. We recommend consulting your owner's manual but also considering an oil change every 5,000 to 7,500 kilometers to ensure optimal engine protection. At Awlad Meshreky, we use only manufacturer-approved fully synthetic oils designed to withstand high temperatures.</p>`
    },
    {
        slug: 'beat-the-heat-a-c-maintenance-tips',
        title: 'Beat the Heat: Essential A/C Maintenance Tips for Your Car',
        excerpt: 'A functioning car A/C is a necessity, not a luxury, in the UAE. Follow these tips to keep your system running cold all summer long.',
        image: 'https://images.unsplash.com/photo-1542128962-405459411957?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: `<h2>Don't Get Caught in the Heat</h2>
        <p>Your car's air conditioning system works hard to keep you cool. To avoid a sweaty and uncomfortable drive, regular maintenance is key. Here’s what you can do:</p>
        <h3>1. Run the A/C Regularly</h3>
        <p>Even in cooler months, run your A/C for at least 10 minutes once a week. This helps maintain gas pressure and keeps the compressor's parts lubricated.</p>
        <h3>2. Check for Leaks</h3>
        <p>If you notice your A/C isn't as cold as it used to be, you might have a refrigerant leak. Our specialists at Awlad Meshreky use electronic leak detection to find and fix the problem efficiently.</p>
        <h3>3. Replace the Cabin Air Filter</h3>
        <p>A clogged cabin air filter can restrict airflow and cause a bad odor in your car. We recommend replacing it every 15,000-20,000 kilometers for fresh, clean air.</p>`
    }
];

// Initial Local Data for Appointments and Subscribers
/*
const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: '1', fullName: 'Ahmed Al-Mansoori', phoneNumber: '+971 50 123 4567', service: 'Engine Diagnostics & Repair', date: '2024-08-10', time: '10:00', message: 'Car is making a strange rattling noise.', status: 'Pending' },
  { id: '2', fullName: 'Fatima Al-Kaabi', phoneNumber: '+971 55 987 6543', service: 'Lube & Oil Change', date: '2024-08-11', time: '14:30', message: 'Standard oil change for a 2022 Nissan Patrol.', status: 'Confirmed' },
  { id: '3', fullName: 'Yusuf Khan', phoneNumber: '+971 52 555 1234', service: 'Professional Detailing', date: '2024-08-12', time: '09:00', message: 'Full interior and exterior detailing with ceramic coating.', status: 'Completed' },
];
*/

const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: '1', email: 'ahmed.m@example.com', date: '2024-07-20' },
  { id: '2', email: 'fatima.k@example.com', date: '2024-07-21' },
];


// Generic store functions
const getFromStore = <T,>(key: string, initialData: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        } else {
            const deepCopy = JSON.parse(JSON.stringify(initialData));
            window.localStorage.setItem(key, JSON.stringify(deepCopy));
            return deepCopy;
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

// Testimonials (read-only from constants for now)
export const getTestimonials = (): Testimonial[] => INITIAL_TESTIMONIALS;

// --- LocalStorage Implementation for Appointments ---
/*
export const getAppointments = (): Appointment[] => {
    const appointments = getFromStore('appointments', INITIAL_APPOINTMENTS);
    // Sort them since localStorage doesn't guarantee order
    return appointments.sort((a, b) => {
        const dateComparison = b.date.localeCompare(a.date);
        if (dateComparison !== 0) return dateComparison;
        return b.time.localeCompare(a.time);
    });
};

export const addAppointment = (appointment: Omit<Appointment, 'id' | 'status'>): void => {
    const appointments = getAppointments();
    const newAppointment: Appointment = {
        ...appointment,
        id: new Date().getTime().toString(), // Simple unique ID
        status: 'Pending'
    };
    saveToStore('appointments', [newAppointment, ...appointments]);
};

export const deleteAppointment = (id: string): void => {
    const appointments = getAppointments();
    const updatedAppointments = appointments.filter(appt => appt.id !== id);
    saveToStore('appointments', updatedAppointments);
};

export const updateAppointmentStatus = (id: string, status: Appointment['status']): void => {
    const appointments = getAppointments();
    const updatedAppointments = appointments.map(appt => 
        appt.id === id ? { ...appt, status } : appt
    );
    saveToStore('appointments', updatedAppointments);
};
*/


// --- LocalStorage Implementation for Subscribers ---
export const getSubscribers = (): Subscriber[] => {
    return getFromStore('subscribers', INITIAL_SUBSCRIBERS);
};

export const addSubscriber = (subscriber: { email: string }): void => {
    const subscribers = getSubscribers();
    // Prevent duplicates
    if (subscribers.some(s => s.email.toLowerCase() === subscriber.email.toLowerCase())) {
        console.log('Subscriber email already exists.');
        return;
    }
    const newSubscriber: Subscriber = {
        id: new Date().getTime().toString(),
        email: subscriber.email,
        date: new Date().toISOString().split('T')[0]
    };
    saveToStore('subscribers', [...subscribers, newSubscriber]);
};

export const deleteSubscriber = (id: string): void => {
    const subscribers = getSubscribers();
    const updatedSubscribers = subscribers.filter(sub => sub.id !== id);
    saveToStore('subscribers', updatedSubscribers);
};

// --- Firebase Implementation for Appointments ---

export const appointmentsCollectionRef = collection(db, 'appointments');

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
/*
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
*/


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

// FIX: Added functions to get and save blog posts.
// Blog Posts
export const getBlogPosts = (): BlogPost[] => getFromStore('blogPosts', INITIAL_BLOG_POSTS);
export const saveBlogPosts = (posts: BlogPost[]): void => saveToStore('blogPosts', posts);