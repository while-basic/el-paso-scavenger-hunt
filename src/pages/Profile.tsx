import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import {
  MapPinIcon,
  CalendarIcon,
  TrophyIcon,
  CameraIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  date: Date;
}

interface Activity {
  id: number;
  type: 'challenge_complete' | 'badge_earned' | 'photo_shared';
  title: string;
  description: string;
  date: Date;
  image?: string;
  points?: number;
}

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'activities' | 'achievements' | 'photos'>('activities');

  // Sample data - in a real app, this would come from your backend
  const userStats = {
    points: 1250,
    rank: 'Explorer',
    challengesCompleted: 8,
    photosShared: 15,
    following: 45,
    followers: 62,
    joinedDate: new Date(2024, 0, 15),
    location: 'El Paso, TX',
  };

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Mountain Master',
      description: 'Completed the Franklin Mountains Challenge',
      icon: '🏔️',
      date: new Date(2024, 1, 15),
    },
    {
      id: 2,
      title: 'History Buff',
      description: 'Visited 5 historical landmarks',
      icon: '🏛️',
      date: new Date(2024, 1, 20),
    },
    {
      id: 3,
      title: 'Food Explorer',
      description: 'Tried 10 local restaurants',
      icon: '🌮',
      date: new Date(2024, 2, 1),
    },
  ];

  const activities: Activity[] = [
    {
      id: 1,
      type: 'challenge_complete',
      title: 'Completed Franklin Mountains Summit Challenge',
      description: 'Made it to the top! The view is incredible! 🏔️',
      date: new Date(2024, 2, 10),
      image: 'https://tpwd.texas.gov/state-parks/franklin-mountains/gallery/FMSP_4959.jpg',
      points: 100,
    },
    {
      id: 2,
      type: 'badge_earned',
      title: 'Earned History Buff Badge',
      description: 'Visited 5 historical landmarks in El Paso',
      date: new Date(2024, 2, 8),
      points: 50,
    },
    {
      id: 3,
      type: 'photo_shared',
      title: 'Plaza Theatre',
      description: 'Beautiful architecture at the historic Plaza Theatre 🎭',
      date: new Date(2024, 2, 5),
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/elpaso/plaza_theatre_downtown_el_paso_2_ac124011-c035-489e-ac39-9f81eb2e7931.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Profile Header */}
      <div className="bg-white shadow">
        <div className="relative h-32 bg-blue-600">
          <button className="absolute right-4 top-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2">
            <CameraIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 pb-4">
          <div className="relative flex items-end">
            <div className="absolute -top-12">
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white bg-white"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5">
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="ml-28 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user?.user_metadata?.username || 'Explorer'}
                  </h1>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{userStats.location}</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{userStats.points}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{userStats.followers}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{userStats.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center">
              <TrophyIcon className="h-4 w-4 mr-1" />
              <span>{userStats.challengesCompleted} challenges completed</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>Joined {format(userStats.joinedDate, 'MMMM yyyy')}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t">
          <div className="flex">
            {(['activities', 'achievements', 'photos'] as const).map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-6">
        {activeTab === 'activities' && (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {format(activity.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                  {activity.points && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      +{activity.points} points
                    </span>
                  )}
                </div>
                {activity.image && (
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="mt-3 rounded-lg w-full h-48 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(achievement.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 gap-4">
            {activities
              .filter((activity) => activity.image)
              .map((activity) => (
                <div key={activity.id} className="relative aspect-square">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Profile; 