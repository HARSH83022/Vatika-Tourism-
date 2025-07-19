import React from 'react';
import { Waves, Church, Utensils, MapPin, Calendar, Navigation } from 'lucide-react';

interface DomainFilterProps {
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
}

const domains = [
  { id: 'all', name: 'All', nameHindi: 'सभी', icon: MapPin, color: 'bg-gray-500' },
  { id: 'kund', name: 'Ghats', nameHindi: 'घाट', icon: Waves, color: 'bg-blue-500' },
  { id: 'temple', name: 'Temples', nameHindi: 'मंदिर', icon: Church, color: 'bg-orange-500' },
  { id: 'aarti', name: 'Aarti', nameHindi: 'आरती', icon: Calendar, color: 'bg-yellow-500' },
  { id: 'food', name: 'Food', nameHindi: 'भोजन', icon: Utensils, color: 'bg-green-500' },
  { id: 'cruise', name: 'Boat Rides', nameHindi: 'नाव सवारी', icon: Navigation, color: 'bg-cyan-500' },
  { id: 'toilet', name: 'Facilities', nameHindi: 'सुविधाएं', icon: MapPin, color: 'bg-purple-500' },
];

const DomainFilter: React.FC<DomainFilterProps> = ({ selectedDomain, onDomainChange }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Filter by Category / श्रेणी के अनुसार फ़िल्टर करें
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {domains.map((domain) => {
          const Icon = domain.icon;
          return (
            <button
              key={domain.id}
              onClick={() => onDomainChange(domain.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedDomain === domain.id
                  ? `${domain.color} text-white shadow-lg scale-105`
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:block">{domain.name}</span>
              <span className="text-xs opacity-75 hidden sm:block">{domain.nameHindi}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DomainFilter;