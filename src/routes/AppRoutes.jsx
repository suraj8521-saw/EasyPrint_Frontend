import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext.jsx';
import LandingPage from '../features/auth/LandingPage.jsx';
import AuthPage from '../features/auth/AuthPage.jsx';
import UploadPage from '../features/upload/UploadPage.jsx';
import HomePage from '../features/upload/HomePage.jsx';
import SimplePage from '../shared/SimplePage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import PublicOnlyRoute from './PublicOnlyRoute.jsx';
import MainLayout from '../layouts/MainLayout.jsx';

export default function AppRoutes() {
 return <Routes>
  <Route path="/" element={<LandingPage/>}/>
  <Route path="/auth/login" element={<PublicOnlyRoute><AuthPage initialTab="login"/></PublicOnlyRoute>}/>
  <Route path="/auth/signup" element={<PublicOnlyRoute><AuthPage initialTab="signup"/></PublicOnlyRoute>}/>
  <Route path="/auth/guest" element={<GuestRedirect/>}/>
  <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
   <Route path="/home" element={<HomePage/>}/>
   <Route path="/upload" element={<UploadPage/>}/>
   <Route path="/my-orders" element={<SimplePage title="My Orders" subtitle="Your previous print jobs and order status."/>}/>
   <Route path="/shops" element={<SimplePage title="Find a Shop" subtitle="Choose a nearby print shop for your documents."/>}/>
   <Route path="/pricing" element={<SimplePage title="Pricing" subtitle="Transparent print pricing for every document."/>}/>
   <Route path="/support" element={<SimplePage title="Support" subtitle="Help and frequently asked questions."/>}/>
  </Route>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes>;
}
function GuestRedirect() {
 const { guest, session } = useAuth();
 const navigate = useNavigate();
 const [message, setMessage] = React.useState('Opening your guest workspace…');
 React.useEffect(() => {
   let active = true;
   const openWorkspace = async () => {
     try {
       if (session?.type === 'guest' && session?.userId) {
         navigate('/upload', { replace: true });
         return;
       }
       await guest();
       if (active) navigate('/upload', { replace: true });
     } catch (err) {
       // Keep the route actionable instead of letting a failed API request land on a 404.
       if (active) setMessage(err?.message || 'Could not open guest workspace. Please try again.');
     }
   };
   openWorkspace();
   return () => { active = false; };
 }, [guest, navigate, session]);
 return <main className="route-loading"><div className="guest-route-card"><p>{message}</p>{message !== 'Opening your guest workspace…' && <button className="button button-primary" onClick={() => window.location.assign('/auth/guest')}>Try again</button>}</div></main>;
}
