import './App.css';
import { Home } from './Components/Home';
import LoginForm from './Components/LoginForm';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Navbar from './Components/Navbar';
import { AuthProvider } from './AuthContext';
import EventForm from './Components/Organizer/EventForm';
import { Hero } from './Components/Hero/Hero';
import AdminEvents from './Components/Admin/AdminEvents';
import { EventDetails } from './Components/Pages/EventDetails';
import MyBookings from './Components/Pages/MyBookings';
import Footer from './Components/Programs/Footer';
import AboutUs from './Components/Programs/AboutUs';
import Testimonial from './Components/Programs/Testimonial';
function App() {
  return (
    
    <AuthProvider>
      <Navbar /> 

      <Routes>
      <Route path="/" element={<><Hero /><Home /><Footer /></>} /> {/* Render Hero with Home */}

        <Route path="/login" element={<LoginForm />} />
        <Route path="/user" element={<><Hero /><Home /></>} />
        <Route path="/organizer/myevents" element={<><EventForm /><Footer /></>} />
        <Route path="/register" element={<SignUp />} /> 
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/user/bookings" element={<MyBookings />} />
        <Route path="/aboutUs" element={<><AboutUs /><Footer /></>} />
        <Route path="/testimonial" element={<><Testimonial /><Footer /></>} />






      </Routes>
    </AuthProvider>
    
  );
}

export default App;
