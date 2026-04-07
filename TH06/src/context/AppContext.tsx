import { createContext, useContext, useState, type ReactNode } from 'react';
import { destinations as initialDestinations } from '../data/destinations';
import type { Destination, ItineraryItem } from '../types';

interface AppContextType {
  destinations: Destination[];
  itinerary: ItineraryItem[];
  addToItinerary: (dest: Destination, day: number) => void;
  removeFromItinerary: (id: string) => void;
  updateItinerary: (newItems: ItineraryItem[]) => void;
  setDestinations: (dest: Destination[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  const addToItinerary = (dest: Destination, day: number) => {
    setItinerary(prev => [...prev, { id: Date.now().toString(), destination: dest, day }]);
  };

  const removeFromItinerary = (id: string) => {
    setItinerary(prev => prev.filter(item => item.id !== id));
  };

  const updateItinerary = (newItems: ItineraryItem[]) => {
    setItinerary(newItems);
  };

  return (
    <AppContext.Provider value={{
      destinations,
      itinerary,
      addToItinerary,
      removeFromItinerary,
      updateItinerary,
      setDestinations,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};