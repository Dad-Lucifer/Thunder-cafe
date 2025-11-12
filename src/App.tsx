import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Home from './pages/Home';
import Games from './pages/Games';
import Booking from './pages/Booking';
import About from './pages/About';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
