import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  MapIcon,
  NewspaperIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  CalendarIcon as CalendarIconSolid,
  MapIcon as MapIconSolid,
  NewspaperIcon as NewspaperIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid';

const navItems = [
  { path: '/', icon: HomeIcon, iconActive: HomeIconSolid, label: 'Home' },
  { path: '/challenges', icon: MapIcon, iconActive: MapIconSolid, label: 'Challenges' },
  { path: '/calendar', icon: CalendarIcon, iconActive: CalendarIconSolid, label: 'Calendar' },
  { path: '/news', icon: NewspaperIcon, iconActive: NewspaperIconSolid, label: 'News' },
  { path: '/profile', icon: UserIcon, iconActive: UserIconSolid, label: 'Profile' },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = isActive ? item.iconActive : item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 ${
                  isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 