import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navigation from '../components/Navigation';
import { Icon, LatLngTuple } from 'leaflet';

// Fix Leaflet default marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// El Paso coordinates
const EL_PASO_CENTER: LatLngTuple = [31.7619, -106.4850];

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  coordinates: LatLngTuple;
  completed: boolean;
  image?: string;
}

const Dashboard = () => {
  // Sample challenges data - in a real app, this would come from openai
  const challenges: Challenge[] = [
    {
      id: 1,
      title: 'Franklin Mountains State Park',
      description: 'Find the highest point in El Paso',
      points: 100,
      coordinates: [31.8982, -106.4862],
      completed: false,
      image: 'https://tpwd.texas.gov/state-parks/franklin-mountains/gallery/FMSP_4959.jpg',
    },
    {
      id: 2,
      title: 'Plaza Theatre',
      description: 'Take a photo of the historic Plaza Theatre',
      points: 50,
      coordinates: [31.7587, -106.4869],
      completed: true,
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/elpaso/plaza_theatre_downtown_el_paso_2_ac124011-c035-489e-ac39-9f81eb2e7931.jpg',
    },
    {
      id: 3,
      title: 'El Paso Museum of Art',
      description: 'Find and photograph your favorite artwork',
      points: 75,
      coordinates: [31.7590, -106.4880],
      completed: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/El_Paso_Museum_of_Art_building.jpg/1200px-El_Paso_Museum_of_Art_building.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to El Paso Scavenger Hunt
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Explore the city and complete challenges to earn points
          </p>
        </div>
      </header>

      {/* Map Section */}
      <div className="h-[40vh] w-full">
        <MapContainer
          center={EL_PASO_CENTER}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {challenges.map((challenge) => (
            <Marker
              key={challenge.id}
              position={challenge.coordinates}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{challenge.title}</h3>
                  <p className="text-sm">{challenge.description}</p>
                  <p className="text-sm font-semibold mt-1">
                    Points: {challenge.points}
                  </p>
                  {challenge.image && (
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="mt-2 rounded-lg w-full h-32 object-cover"
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Total Points</p>
            <p className="text-2xl font-bold text-blue-600">225</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">1</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-2xl font-bold text-orange-600">2</p>
          </div>
        </div>

        {/* Challenges Overview */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Your Challenges
        </h2>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {challenge.image && (
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {challenge.description}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      {challenge.points} points
                    </p>
                  </div>
                  <div
                    className={`h-4 w-4 rounded-full ${
                      challenge.completed
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                </div>
                <button
                  className={`mt-4 w-full py-2 px-4 rounded-md text-sm font-medium ${
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
          ))}
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Dashboard; 