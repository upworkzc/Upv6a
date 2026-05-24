
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface BookingSlot {
  id: string;
  date: string; // ISO format
  time: string;
  isBooked: boolean;
  bookedBy?: string;
  bookedEmail?: string;
  counselorId: string;
  sessionType?: string;
  serviceInterested?: string;
}

export interface Counselor {
  id: string;
  name: string;
  email: string;
  userId: string;
  password?: string; // Only for admin management
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface ApproachStep {
  title: string;
  description: string;
}

export interface TargetGroup {
  title: string;
  description: string;
}

export interface CorporateClient {
  name: string;
  logo: string;
}

export interface FAQItem {
  question: string;
  answer: string | string[];
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export interface PrivacySection {
  title?: string;
  content: string | string[];
}

export interface PrivacyPolicy {
  title: string;
  lastUpdated: string;
  effectiveDate: string;
  sections: PrivacySection[];
}

export interface TermsAndConditions {
  title: string;
  lastUpdated: string;
  sections: PrivacySection[];
}
