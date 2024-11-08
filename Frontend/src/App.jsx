import './App.css';
import { Home } from './Components/Home';
import LoginForm from './Components/LoginForm';
import { Test } from './Components/Test';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Navbar from './Components/Navbar';
import { AuthProvider } from './AuthContext';
import EventForm from './Components/Organizer/EventForm';
import { Hero } from './Components/Hero/Hero';
import AdminEvents from './Components/Admin/AdminEvents';
import { EventDetails } from './Components/Pages/EventDetails';
function App() {
  return (
    
    <AuthProvider>
      <Navbar /> 

      <Routes>
      <Route path="/" element={<><Hero /><Home /></>} /> {/* Render Hero with Home */}

        <Route path="/login" element={<LoginForm />} />
        <Route path="/user" element={<><Hero /><Home /></>} />
        <Route path="/organizer/myevents" element={<EventForm />} />
        <Route path="/register" element={<SignUp />} /> 
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/event/:eventId" element={<EventDetails />} />



      </Routes>
    </AuthProvider>
    
  );
}

export default App;
