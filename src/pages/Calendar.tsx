import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isBefore,
} from 'date-fns';
import Navigation from '../components/Navigation';
import { MapIcon, CalendarIcon, StarIcon } from '@heroicons/react/24/outline';

interface Event {
  id: number;
  title: string;
  date: Date;
  type: 'event' | 'challenge';
  points?: number;
  description: string;
  location: string;
  image?: string;
  category: 'Historical' | 'Nature' | 'Cultural' | 'Food';
}

const Calendar = () => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Sample events data - in a real app, this would come from your backend
  const events: Event[] = [
    {
      id: 1,
      title: 'Downtown Art Walk',
      date: new Date(2024, 2, 15),
      type: 'event',
      description: 'Join us for a guided tour of downtown El Paso\'s vibrant art scene.',
      location: 'Downtown El Paso',
      category: 'Cultural',
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/elpaso/downtown_el_paso_texas_ae31418c-d3d5-4e8b-a486-9f3a683c8a36.jpg',
    },
    {
      id: 2,
      title: 'Museum Challenge',
      date: new Date(2024, 2, 18),
      type: 'challenge',
      points: 100,
      description: 'Complete a special scavenger hunt at the El Paso Museum of Art.',
      location: 'El Paso Museum of Art',
      category: 'Cultural',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/El_Paso_Museum_of_Art_building.jpg/1200px-El_Paso_Museum_of_Art_building.jpg',
    },
    {
      id: 3,
      title: 'Hueco Tanks Rock Climbing',
      date: new Date(2024, 2, 20),
      type: 'challenge',
      points: 150,
      description: 'Test your climbing skills at the world-famous Hueco Tanks.',
      location: 'Hueco Tanks State Park',
      category: 'Nature',
      image: 'https://tpwd.texas.gov/state-parks/hueco-tanks/gallery/hueco-tanks_0001.jpg',
    },
    {
      id: 4,
      title: 'Mexican Food Festival',
      date: new Date(2024, 2, 25),
      type: 'event',
      description: 'Experience the best of El Paso\'s Mexican cuisine at this food festival.',
      location: 'San Jacinto Plaza',
      category: 'Food',
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/elpaso/mexican_food_credit_visit_el_paso_d7dc4adc-6c0a-4f24-8c8d-5680a8e33d31.jpg',
    },
  ];

  const getDayEvents = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const getCategoryIcon = (category: Event['category']) => {
    switch (category) {
      case 'Historical':
        return <CalendarIcon className="h-5 w-5" />;
      case 'Nature':
        return <MapIcon className="h-5 w-5" />;
      case 'Cultural':
        return <StarIcon className="h-5 w-5" />;
      case 'Food':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {format(today, 'MMMM yyyy')}
          </h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            Add to Calendar
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 bg-white py-2"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {days.map((date) => {
              const dayEvents = getDayEvents(date);
              const isCurrentDay = isToday(date);
              const isPast = isBefore(date, today) && !isCurrentDay;

              return (
                <div
                  key={date.toString()}
                  className={`min-h-[100px] p-2 bg-white ${
                    isPast ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm ${
                        isCurrentDay
                          ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                          : isPast
                          ? 'text-gray-400'
                          : 'text-gray-900'
                      }`}
                    >
                      {format(date, 'd')}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-xs text-blue-600 font-medium">
                        {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate ${
                          event.type === 'challenge'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {events
              .filter((event) => !isBefore(event.date, today))
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          {getCategoryIcon(event.category)}
                          <h3 className="ml-2 font-semibold text-gray-900">
                            {event.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.description}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          event.type === 'challenge'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {event.type === 'challenge' ? 'Challenge' : 'Event'}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center text-sm">
                      <div>
                        <p className="text-gray-600">{event.location}</p>
                        <p className="text-gray-600">
                          {format(event.date, 'EEEE, MMMM d')}
                        </p>
                      </div>
                      {event.type === 'challenge' && (
                        <p className="text-blue-600 font-medium">
                          {event.points} points
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Calendar; 