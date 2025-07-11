import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '../assets/AppContext';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
const HomePage = lazy(() => import('../pages/HomePage'));
const ProgressPage = lazy(() => import('../pages/ProgressPage'));
import ProtectedRoute from './ProtectedRoute';
import '../main.css';

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <HomePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <HomePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/progress"
                            element={
                                <ProtectedRoute>
                                    <ProgressPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
