import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import Navigation from '../components/Navigation';
import { MapIcon, CalendarIcon, StarIcon } from '@heroicons/react/24/outline';

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Historical' | 'Nature' | 'Cultural' | 'Food';
  completed: boolean;
  image: string;
  estimatedTime: string;
  location: string;
}

const Challenges = () => {
  const allChallenges: Challenge[] = [
    {
      id: 1,
      title: 'Franklin Mountains State Park Summit',
      description: 'Hike to the highest point in El Paso and capture the cityscape.',
      points: 100,
      difficulty: 'Hard',
      category: 'Nature',
      completed: false,
      image: 'https://tpwd.texas.gov/state-parks/franklin-mountains/gallery/FMSP_4959.jpg',
      estimatedTime: '4-5 hours',
      location: 'Franklin Mountains State Park',
    },
    {
      id: 2,
      title: 'Plaza Theatre Historical Tour',
      description: 'Take a guided tour of the historic Plaza Theatre and learn about its architecture.',
      points: 50,
      difficulty: 'Easy',
      category: 'Historical',
      completed: true,
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/elpaso/plaza_theatre_downtown_el_paso_2_ac124011-c035-489e-ac39-9f81eb2e7931.jpg',
      estimatedTime: '1-2 hours',
      location: 'Downtown El Paso',
    },
    {
      id: 3,
      title: 'El Paso Museum of Art Treasure Hunt',
      description: 'Find specific artworks throughout the museum and learn about their history.',
      points: 75,
      difficulty: 'Medium',
      category: 'Cultural',
      completed: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/El_Paso_Museum_of_Art_building.jpg/1200px-El_Paso_Museum_of_Art_building.jpg',
      estimatedTime: '2-3 hours',
      location: 'Downtown Arts District',
    },
    {
      id: 4,
      title: 'Authentic Mexican Food Tour',
      description: 'Visit three famous local restaurants and try their signature dishes.',
      points: 60,
      difficulty: 'Easy',
      category: 'Food',
      completed: false,
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/elpaso/L_D_Mexican_Restaurant_credit_Visit_El_Paso_9a468b3a-c947-4818-89d7-fb0b3c6fe6bb.jpg',
      estimatedTime: '3-4 hours',
      location: 'Various Locations',
    },
  ];

  const completedChallenges = allChallenges.filter((c) => c.completed);
  const incompleteChallenges = allChallenges.filter((c) => !c.completed);

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
    }
  };

  const getCategoryIcon = (category: Challenge['category']) => {
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

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={challenge.image}
        alt={challenge.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
          </div>
          <span
            className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
              challenge.difficulty
            )}`}
          >
            {challenge.difficulty}
          </span>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <div className="flex items-center">
            {getCategoryIcon(challenge.category)}
            <span className="ml-1">{challenge.category}</span>
          </div>
          <span className="mx-2">•</span>
          <span>{challenge.estimatedTime}</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">{challenge.location}</p>
            <p className="text-blue-600 font-medium">{challenge.points} points</p>
          </div>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              challenge.completed
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={challenge.completed}
          >
            {challenge.completed ? 'Completed' : 'Start Challenge'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Challenges</h1>
        
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${
                   selected
                     ? 'bg-white shadow text-blue-700'
                     : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                 }`
              }
            >
              Active ({incompleteChallenges.length})
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${
                   selected
                     ? 'bg-white shadow text-blue-700'
                     : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                 }`
              }
            >
              Completed ({completedChallenges.length})
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="space-y-6">
                {incompleteChallenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="space-y-6">
                {completedChallenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Navigation />
    </div>
  );
};

export default Challenges; 