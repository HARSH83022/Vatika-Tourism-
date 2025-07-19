import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';
import { varanasiLocations } from '../data/locations';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const locationTypes = [
    { id: 'all', name: 'All Locations', nameHindi: 'सभी स्थान' },
    { id: 'ghat', name: 'Ghats', nameHindi: 'घाट' },
    { id: 'temple', name: 'Temples', nameHindi: 'मंदिर' },
    { id: 'market', name: 'Markets', nameHindi: 'बाजार' },
    { id: 'restaurant', name: 'Restaurants', nameHindi: 'रेस्तराँ' },
  ];

  const filteredLocations = selectedType === 'all' 
    ? varanasiLocations 
    : varanasiLocations.filter(location => location.type === selectedType);

  const getMarkerColor = (type: string) => {
    const colors: { [key: string]: string } = {
      ghat: '#3B82F6',
      temple: '#F59E0B',
      market: '#10B981',
      restaurant: '#EF4444',
    };
    return colors[type] || '#6B7280';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Varanasi Interactive Map
            </h1>
            <p className="text-lg text-gray-600">
              वाराणसी इंटरैक्टिव नक्शा
            </p>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setLanguage('english')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  language === 'english'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hindi')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  language === 'hindi'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Location Type Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {locationTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-300'
                }`}
              >
                {language === 'hindi' ? type.nameHindi : type.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div className="h-96 md:h-[600px]">
          <MapContainer
            center={[25.3176, 83.0199]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredLocations.map((location) => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                icon={defaultIcon}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-lg mb-2">
                      {language === 'hindi' ? location.nameHindi : location.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {language === 'hindi' ? location.descriptionHindi : location.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
                        window.open(url, '_blank');
                      }}
                      className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors flex items-center"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      {language === 'hindi' ? 'दिशा' : 'Directions'}
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Location List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {language === 'hindi' ? 'स्थान सूची' : 'Location Directory'}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLocations.map((location) => (
            <div key={location.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {language === 'hindi' ? location.nameHindi : location.name}
                </h3>
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: getMarkerColor(location.type) }}
                >
                  {location.type}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {language === 'hindi' ? location.descriptionHindi : location.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
                </div>
                <button
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
                    window.open(url, '_blank');
                  }}
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors flex items-center"
                >
                  <Navigation className="h-3 w-3 mr-1" />
                  {language === 'hindi' ? 'दिशा' : 'Get Directions'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Tips */}
      <div className="bg-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {language === 'hindi' ? 'यात्रा सुझाव' : 'Travel Tips'}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Clock className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'hindi' ? 'सबसे अच्छा समय' : 'Best Time to Visit'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'hindi' 
                  ? 'सुबह 5-8 बजे और शाम 6-8 बजे घाटों पर जाने का सबसे अच्छा समय है।'
                  : 'Early morning (5-8 AM) and evening (6-8 PM) are the best times to visit the ghats.'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Navigation className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'hindi' ? 'परिवहन' : 'Transportation'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'hindi' 
                  ? 'ऑटो-रिक्शा, साइकिल रिक्शा, और नाव मुख्य परिवहन साधन हैं।'
                  : 'Auto-rickshaws, cycle rickshaws, and boats are the main modes of transport.'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Phone className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'hindi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
              </h3>
              <p className="text-gray-600 text-sm">
                Police: 100 | Fire: 101 | Ambulance: 108 | Tourist Helpline: 1363
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;