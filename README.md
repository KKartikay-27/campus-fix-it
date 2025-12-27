# Campus Fix-It

## Overview
Campus Fix-It is a React Native application with an admin and student interface designed to manage campus issues efficiently.

## Features
- Admin and Student user roles
- Issue management
- Authentication system

## Project Structure
- `app/` - React Native app source code
  - `(admin)/` - Admin interface
  - `(auth)/` - Authentication screens
  - `(student)/` - Student interface
- `backend/src/server.js` - Backend server
- `services/` - API service modules
- `context/AuthContext.tsx` - Authentication context
- `constants/theme.ts` - Theme constants

## Requirements
- Node.js (version 16 or later recommended)
- npm or yarn

## Setup and Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend
1. From the root project directory, start the React Native app:
   ```bash
   npx expo start
   ```

## Notes
- Ensure your backend server is running before starting the frontend.
- Environment variables and configuration may need to be set up depending on your environment.