import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from '../assets/AppContext';
// import NavBar from './NavBar';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ProgressPage from '../pages/ProgressPage';
// import Progress from './Progress';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: (
          <HomePage />
      ),
      errorElement: <NotFoundPage />,
    },
    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/progress',
      element: (
        <ProtectedRoute>
          <ProgressPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App;
