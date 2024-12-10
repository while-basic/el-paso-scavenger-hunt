# El Paso Scavenger Hunt

A mobile web application that turns exploring El Paso, Texas into an exciting scavenger hunt adventure. Discover historical landmarks, natural wonders, and cultural hotspots while earning points and sharing your experiences with other explorers.

## Features

- **Interactive Map**: Explore El Paso with an interactive map showing challenge locations
- **Challenges**: Complete various challenges across different categories
  - Historical landmarks
  - Natural attractions
  - Cultural experiences
  - Food adventures
- **Social Features**: Share your achievements and connect with other explorers
- **Points System**: Earn points for completing challenges
- **Event Calendar**: Keep track of upcoming events and challenges
- **Mobile-First Design**: Optimized for mobile devices

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Supabase for backend and authentication
- React Router for navigation
- Leaflet for maps
- Date-fns for date handling
- Heroicons for icons

## Prerequisites

- Node.js 16 or higher
- npm or yarn
- A Supabase account and project

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd el-paso-scavenger-hunt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React contexts (auth, etc.)
├── lib/             # Utility functions and configurations
├── pages/           # Application pages/routes
└── types/           # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- El Paso Tourism Board for location information
- OpenStreetMap contributors
- All the amazing photographers who provided location images 