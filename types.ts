
export interface SolutionPackage {
  id: number;
  title: string;
  description: string;
  features: string[];
  recommendedFor: string;
  highlight?: boolean;
  deliveryTime: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  liveUrl: string;
}
