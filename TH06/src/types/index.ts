export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number; 
  type: 'beach' | 'mountain' | 'city';
  description: string;
  visitTime: number; // giờ
  foodCost: number;
  stayCost: number;
  transportCost: number;
}

export interface ItineraryItem {
  id: string;
  destination: Destination;
  day: number;
}

export interface BudgetItem {
  category: string;
  amount: number;
  color: string;
}