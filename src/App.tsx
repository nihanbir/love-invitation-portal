
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Toaster } from '@/components/ui/toaster';

// Import pages
import HomePage from '@/pages/HomePage';
import VenuePage from '@/pages/VenuePage';
import TimelinePage from '@/pages/TimelinePage';
import MenuPage from '@/pages/MenuPage';
import SeatingPage from '@/pages/SeatingPage';
import RsvpPage from '@/pages/RsvpPage';
import GalleryPage from '@/pages/GalleryPage';
import LoginPage from '@/pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/seating" element={<SeatingPage />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/rsvp" element={<RsvpPage />} />
            <Route path="/dashboard" element={<Navigate to="/rsvp" replace />} />
          </Route>
          
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
