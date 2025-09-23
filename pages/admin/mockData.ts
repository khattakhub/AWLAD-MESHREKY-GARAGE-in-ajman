import { Appointment } from "../../data/store";

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '1', fullName: 'Ahmed Al-Mansoori', phoneNumber: '+971 50 123 4567', service: 'Engine Diagnostics & Repair', date: '2024-08-10', time: '10:00', message: 'Car is making a strange rattling noise.', status: 'Pending' },
  { id: '2', fullName: 'Fatima Al-Kaabi', phoneNumber: '+971 55 987 6543', service: 'Lube & Oil Change', date: '2024-08-11', time: '14:30', message: 'Standard oil change for a 2022 Nissan Patrol.', status: 'Confirmed' },
  { id: '3', fullName: 'Yusuf Khan', phoneNumber: '+971 52 555 1234', service: 'Professional Detailing', date: '2024-08-12', time: '09:00', message: 'Full interior and exterior detailing with ceramic coating.', status: 'Completed' },
  { id: '4', fullName: 'Layla El-Sayed', phoneNumber: '+971 56 789 0123', service: 'A/C Repair & Service', date: '2024-08-12', time: '11:00', message: 'A/C is not blowing cold air.', status: 'Cancelled' },
];

export const MOCK_SUBSCRIBERS = [
  { id: 1, email: 'ahmed.m@example.com', date: '2024-07-20' },
  { id: 2, email: 'fatima.k@example.com', date: '2024-07-21' },
  { id: 3, email: 'yusuf.khan@example.com', date: '2024-07-22' },
  { id: 4, email: 'layla.s@example.com', date: '2024-07-25' },
  { id: 5, email: 'mohammed.ali@example.com', date: '2024-08-01' },
];