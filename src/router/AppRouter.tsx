import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Breathe from '../pages/Breathe';
import Coping from '../pages/Coping';
import Focus from '../pages/Focus';
import Auth from '../pages/Auth';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breathe" element={<Breathe />} />
        <Route path="/coping" element={<Coping />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
