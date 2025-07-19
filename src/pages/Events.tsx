import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Plus } from 'lucide-react';
import { Event } from '../types';
import { getEvents, addEvent } from '../services/firebaseService';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    titleHindi: '',
    date: '',
    description: '',
    descriptionHindi: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample events data
  const sampleEvents: Event[] = [
    {
      id: '1',
      title: 'Ganga Aarti at Dashashwamedh Ghat',
      titleHindi: 'दशाश्वमेध घाट पर गंगा आरती',
      date: new Date('2025-01-15T19:00:00'),
      description: 'Daily evening Ganga Aarti ceremony with traditional rituals and prayers',
      descriptionHindi: 'पारंपरिक अनुष्ठानों और प्रार्थनाओं के साथ दैनिक शाम की गंगा आरती समारोह',
      location: 'Dashashwamedh Ghat'
    },
    {
      id: '2',
      title: 'Makar Sankranti Festival',
      titleHindi: 'मकर संक्रांति उत्सव',
      date: new Date('2025-01-14T06:00:00'),
      description: 'Traditional kite flying festival and holy dip in the Ganges',
      descriptionHindi: 'पारंपरिक पतंग उड़ाने का त्योहार और गंगा में पवित्र स्नान',
      location: 'All Ghats'
    },
    {
      id: '3',
      title: 'Mahashivratri Celebration',
      titleHindi: 'महाशिवरात्रि उत्सव',
      date: new Date('2025-02-26T00:00:00'),
      description: 'Grand celebration at Kashi Vishwanath Temple with special prayers',
      descriptionHindi: 'काशी विश्वनाथ मंदिर में विशेष प्रार्थनाओं के साथ भव्य उत्सव',
      location: 'Kashi Vishwanath Temple'
    },
    {
      id: '4',
      title: 'Holi Festival',
      titleHindi: 'होली उत्सव',
      date: new Date('2025-03-14T10:00:00'),
      description: 'Festival of colors celebrated with great enthusiasm across the city',
      descriptionHindi: 'पूरे शहर में बड़े उत्साह के साथ मनाया जाने वाला रंगों का त्योहार',
      location: 'Citywide'
    }
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const firebaseEvents = await getEvents();
      // Combine sample events with Firebase events
      const allEvents = [...sampleEvents, ...firebaseEvents];
      // Sort by date
      allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
      setEvents(allEvents);
    } catch (error) {
      console.error('Error loading events:', error);
      // Fallback to sample events
      setEvents(sampleEvents);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.description) return;

    try {
      setIsSubmitting(true);
      await addEvent({
        title: newEvent.title,
        titleHindi: newEvent.titleHindi || undefined,
        date: new Date(newEvent.date),
        description: newEvent.description,
        descriptionHindi: newEvent.descriptionHindi || undefined,
        location: newEvent.location || undefined
      });

      // Reload events
      await loadEvents();
      
      // Reset form
      setNewEvent({
        title: '',
        titleHindi: '',
        date: '',
        description: '',
        descriptionHindi: '',
        location: ''
      });
      setShowAddForm(false);
      
      // Show success message
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'hindi' ? 'hi-IN' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'hindi' ? 'hi-IN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events in Varanasi
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            वाराणसी में आगामी कार्यक्रम
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover festivals, ceremonies, and cultural events happening in the spiritual capital of India.
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setLanguage('english')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                language === 'english'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hindi')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                language === 'hindi'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Add Event Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            {language === 'hindi' ? 'कार्यक्रम जोड़ें' : 'Add Event'}
          </button>
        </div>

        {/* Add Event Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'hindi' ? 'नया कार्यक्रम जोड़ें' : 'Add New Event'}
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (Hindi)
                  </label>
                  <input
                    type="text"
                    value={newEvent.titleHindi}
                    onChange={(e) => setNewEvent({...newEvent, titleHindi: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (English) *
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Hindi)
                </label>
                <textarea
                  value={newEvent.descriptionHindi}
                  onChange={(e) => setNewEvent({...newEvent, descriptionHindi: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {language === 'hindi' && event.titleHindi ? event.titleHindi : event.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{formatTime(event.date)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {language === 'hindi' && event.descriptionHindi ? event.descriptionHindi : event.description}
                  </p>
                  
                  {/* Event Status */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {event.date > new Date() ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {language === 'hindi' ? 'आगामी' : 'Upcoming'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {language === 'hindi' ? 'समाप्त' : 'Past Event'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'hindi' ? 'कोई कार्यक्रम नहीं मिला' : 'No Events Found'}
            </h3>
            <p className="text-gray-600">
              {language === 'hindi' 
                ? 'फिलहाल कोई कार्यक्रम उपलब्ध नहीं है।'
                : 'No events are currently available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;