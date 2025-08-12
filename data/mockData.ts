import { Talent, TalentRole } from '../types';

export const mockTalents: Talent[] = [
  {
    id: '1',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@email.com',
    phone: '+1-555-0123',
    city: 'Miami, FL',
    role: 'dancer',
    bio: 'Professional Latin dancer with 8+ years of experience in luxury resort entertainment. Specialized in salsa, bachata, and contemporary dance styles. Fluent in English and Spanish.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
    videoUrl: 'https://example.com/sofia-dance-reel',
    experience: '8+ years',
    status: 'approved',
    submittedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@email.com',
    phone: '+1-555-0124',
    city: 'Las Vegas, NV',
    role: 'dj',
    bio: 'Award-winning DJ specializing in electronic, hip-hop, and party music. Over 10 years of experience performing at high-end venues and private events. Expert in reading crowds and creating unforgettable atmospheres.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    videoUrl: 'https://example.com/marcus-dj-mix',
    experience: '10+ years',
    status: 'approved',
    submittedAt: new Date('2024-01-12'),
  },
  {
    id: '3',
    name: 'Isabella Chen',
    email: 'isabella.chen@email.com',
    phone: '+1-555-0125',
    city: 'New York, NY',
    role: 'waiter',
    bio: 'Experienced fine dining server with exceptional customer service skills. Trained in wine pairing and multi-lingual capabilities (English, Mandarin, French). 6 years in luxury hospitality.',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces',
    experience: '6 years',
    status: 'approved',
    submittedAt: new Date('2024-01-10'),
  },
  {
    id: '4',
    name: 'Diego Rodriguez',
    email: 'diego.rodriguez@email.com',
    phone: '+1-555-0126',
    city: 'Los Angeles, CA',
    role: 'singer',
    bio: 'Versatile vocalist with a passion for jazz, pop, and Latin music. Professional training in vocal performance and stage presence. Perfect for intimate venues and large events alike.',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
    videoUrl: 'https://example.com/diego-performance',
    experience: '5 years',
    status: 'pending',
    submittedAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    phone: '+1-555-0127',
    city: 'Chicago, IL',
    role: 'bartender',
    bio: 'Creative mixologist with expertise in craft cocktails and customer engagement. Certified bartender with 7 years of experience in upscale establishments. Known for innovative drink creations.',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
    experience: '7 years',
    status: 'approved',
    submittedAt: new Date('2024-01-08'),
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1-555-0128',
    city: 'Orlando, FL',
    role: 'chef',
    bio: 'Executive chef with international cuisine expertise. Specialized in Mediterranean and fusion cooking. 12 years of experience in luxury resorts and fine dining establishments.',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces',
    experience: '12 years',
    status: 'pending',
    submittedAt: new Date('2024-01-20'),
  },
];

export const getCurrentUser = () => {
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user: any) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};