import './App.css';
import { Home } from './Components/Home';
import Footer from './Components/Footer';
import LoginForm from './Components/LoginForm';
import { Test } from './Components/Test';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Navbar from './Components/Navbar';
import { AuthProvider } from './AuthContext';
import EventForm from './Components/Organizer/EventForm';

function App() {
  return (
    <AuthProvider>
      <Navbar /> {/* Navbar will use userType from AuthContext */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/user" element={<Home />} />
        <Route path="/admin" element={<Test />} />
        <Route path="/organizer" element={<Test />} />
        <Route path="/organizer/myevents" element={<EventForm />} />
      </Routes>
      {/* <Footer /> */}
    </AuthProvider>
  );
}

export default App;
