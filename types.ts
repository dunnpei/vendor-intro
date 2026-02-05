export interface Vendor {
  id: string;
  name: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
  address: string;
  phone: string;
  website: string;
  category: string; // Changed from enum to string for dynamic categories
  city: string;
  services: string[];
  cases: CaseStudy[];
  updatedAt?: string;
  active?: boolean;
}

export interface CaseStudy {
  title: string;
  url: string;
}

// Keep a constant for the 'All' state
export const CATEGORY_ALL = '全部';

export interface FilterState {
  keyword: string;
  category: string;
  city: string;
}