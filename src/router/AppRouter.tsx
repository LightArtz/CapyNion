import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Breathe from '../pages/Breathe';
import Coping from '../pages/Coping';
import Focus from '../pages/Focus';
import { useState } from 'react';
import Landing from '../pages/Landing';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/breathe" element={<Breathe />} />
        <Route path="/coping" element={<Coping />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
