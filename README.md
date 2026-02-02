AniVerse
A modern, responsive anime movie discovery platform built with React.
Live Demo
View Live Application
https://aniverse-g15v9rknu-jays-projects-b600db37.vercel.app

Table of Contents

Project Overview
Features
Technology Stack
Project Structure
Installation & Setup
Development Process
Technical Implementation
Styling Architecture
Testing
Deployment


Project Overview
AniVerse is a frontend-only React application that integrates with the Jikan API to provide users with comprehensive anime movie information. The application features a clean, dark-themed interface with multiple filtering options, favorites management, and detailed movie information modals.

Features
Core Functionality
Favorites/Watchlist System

Save and manage favorite anime movies
Persistent localStorage storage
Count badge in navigation
Dedicated favorites page

Multi-Select Genre Filtering

Filter movies by multiple genres simultaneously
Active state indicators
Clear filters with count display

Infinite Scroll Pagination

Load additional content seamlessly
"Load More" button with loading states
End-of-content message

Trending Section

Horizontal scrolling carousel
Current season anime display
Touch-friendly mobile interface

Movie Detail Modal

Full synopsis and movie information
Embedded trailers (when available)
Statistics display (rank, popularity, episodes, duration)
Studio and genre information
Keyboard support (ESC to close)

User Experience Features

Responsive design (mobile, tablet, desktop)
Dark theme with custom color scheme
Search functionality
Sort options (by year, alphabetically)
Loading states and error handling
Accessibility features (ARIA labels, keyboard navigation)


Technology Stack
Frontend

React 18
JavaScript (ES6+)
CSS3 with Custom Properties
HTML5

API Integration

Jikan API v4 (MyAnimeList unofficial API)
Fetch API for HTTP requests

State Management

React Hooks (useState, useEffect)
Custom hooks for reusable logic

Data Persistence

localStorage (Web Storage API)

Development & Deployment

Create React App
npm package manager
Git version control
Vercel static hosting
ESLint for code quality




Installation & Setup
Prerequisites

Node.js (v14 or higher)
npm (v6 or higher)

Local Development
1. Clone the repository
bashgit clone https://github.com/yourusername/aniverse.git
cd aniverse
2. Install dependencies
bashnpm install
3. Start development server
bashnpm start
4. Open browser
http://localhost:3000
Build for Production
bashnpm run build

Development Process
Session 1: Favorites System
Objective: Implement localStorage-based favorites management
Components Created:

useFavorites hook for state management
FavoriteButton component with plus/check icons
FavoritesPage with empty state handling
Navbar favorites count badge

Challenges & Resolutions:

localStorage persistence on refresh

Issue: Favorites not loading on page refresh
Resolution: Initialize state from localStorage in useState initializer


Button positioning overlap

Issue: Favorite button overlapping movie card text
Resolution: Adjust CSS positioning to poster container with overflow: hidden


Count badge not updating

Issue: Navbar badge not reflecting state changes
Resolution: Ensure proper prop passing through component tree



Outcome: Fully functional favorites system with localStorage persistence

Session 2: Genre Filtering
Objective: Multi-select genre filtering system
Components Created:

useGenreFilter hook for filter logic
GenreFilter component with active state indicators
Clear filters button with count display

Implementation Details:

Extract unique genres from movie data using Set
Filter movies matching all selected genres
Display empty state when no matches found

Outcome: Clean implementation with proper filter logic and user feedback

Session 3: Infinite Scroll
Objective: Pagination system for loading additional content
Components Created:

LoadMoreButton component with loading states
Updated useMovies hook with pagination support
API integration for paginated requests

Challenges & Resolutions:

API export errors

Issue: getTopMovies and searchAnime not found
Resolution: Updated api.js with proper named exports



Outcome: Smooth pagination with proper loading states and error handling

Session 4: Trending Section
Objective: Display current season anime in horizontal carousel
Components Created:

useTrending hook for seasonal data
TrendingSection with horizontal scroll
TrendingCard component
Updated API service with seasonal endpoints

Challenges & Resolutions:

API endpoint errors

Issue: filter=movie parameter not supported by Jikan API
Resolution: Changed to type=movie parameter


Rate limiting

Issue: API calls failing due to rate limits
Resolution: Added 500ms delay and fallback to top movies



Outcome: Working trending section with proper error handling and fallback logic

Session 5: Movie Detail Modal
Objective: Comprehensive movie information overlay
Components Created:

MovieDetailModal with full movie details
Click handlers on all movie cards
Trailer embed support
Statistics display

Challenges & Resolutions:

React Hook rule violation

Issue: useEffect called conditionally after early return
Resolution: Moved useEffect before conditional return statement



Outcome: Fully functional modal with trailer embeds, stats, and keyboard support

Technical Implementation
Custom Hooks
useFavorites

Manages favorites state and localStorage persistence
Initializes from localStorage on mount
Prevents saving empty array on first render
Provides add, remove, toggle, and clear functions

useGenreFilter

Handles multi-select genre filtering
Extracts unique genres from movie data
Filters movies based on selected genres
Supports multiple simultaneous genre selections

useMovies

Manages movie data and API calls
Pagination support with page tracking
Search functionality
Sort operations (year, alphabetical)
Load more functionality with hasMore flag

useTrending

Fetches current season anime data
Rate limiting prevention with 500ms delay
Error handling with fallback to top movies

API Integration
Jikan API v4 Endpoints:

/top/anime - Top-rated anime movies
/anime?q= - Search functionality
/seasons/now - Current season anime
/anime/{id} - Individual anime details

All API calls include proper error handling and fallback logic.
Data Persistence
localStorage Implementation:

Key: aniverse_favorites
Value: JSON stringified array of movie objects
Persistence: Browser-based, per-device
Scope: Single user experience


Styling Architecture
CSS Custom Properties
css--primary: #e63946         /* Red accent color */
--secondary: #f1faee       /* Light accent */
--dark: #1a1a2e           /* Primary background */
--dark-light: #16213e     /* Secondary background */
--dark-card: #0f3460      /* Card background */
--text-primary: #ffffff   /* Primary text */
--text-secondary: #a8b2d1 /* Secondary text */
--accent: #ffd700         /* Star ratings */
Design System

Border radius: 6px (buttons), 10px (cards), 12px (modal)
Transitions: 0.2s ease
Font weights: 600 (semi-bold), 700 (bold), 800 (extra-bold)
Spacing: 8px base unit

Responsive Breakpoints

Mobile: < 600px
Tablet: 600px - 900px
Desktop: > 900px


Testing
Favorites System

Add movie to favorites
Remove movie from favorites
Navigate to favorites page
Verify empty state display
Confirm localStorage persistence after refresh
Check count badge updates

Genre Filtering

Select single genre
Select multiple genres
Verify filtered results
Test clear filters functionality
Confirm empty state with no matches

Infinite Scroll

Click load more button
Verify new movies append
Check loading state display
Confirm end message when no more content

Trending Section

Verify horizontal scroll functionality
Test favorite button on trending cards
Confirm responsive behavior on mobile

Movie Detail Modal

Open modal by clicking movie card
Verify all information displays
Test trailer embed (when available)
Confirm close functionality (button, ESC key, outside click)
Check favorite toggle within modal

Responsive Design

Test on mobile viewport (< 600px)
Test on tablet viewport (600-900px)
Test on desktop viewport (> 900px)


Deployment
Platform: Vercel
Process:

Push to GitHub repository
Vercel automatically builds and deploys
Live site updates within 30-60 seconds

Deployment Configuration:

Automatic deployments from main branch
Preview deployments for pull requests
Environment: Node.js 18.x


Browser Compatibility
Tested and verified on:

Chrome 90+
Firefox 88+
Safari 14+
Edge 90+


Performance Optimizations

Lazy loading images with loading="lazy" attribute
Pagination to limit initial data load
Memoization in genre filtering
Efficient re-render prevention
Error boundaries to prevent full app crashes


Accessibility Features

ARIA labels on interactive elements
Keyboard navigation support
Semantic HTML structure
Focus states on all interactive elements
Screen reader friendly content
Alt text on all images


Known Limitations

Favorites stored locally per browser/device
No user authentication or accounts
No cross-device synchronization
Jikan API rate limits may affect heavy usage
Trailer availability depends on API data


Future Enhancement Possibilities

User authentication and cloud storage
Advanced search filters (year range, rating, studio)
Social features (share lists, recommendations)
Progressive Web App (PWA) implementation
Dark/Light mode toggle
Watchlist progress tracking
Review and rating system


License
This project is for educational purposes.

Acknowledgments

Jikan API for providing anime data
MyAnimeList for source data
Create React App for project bootstrapping


