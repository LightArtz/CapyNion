import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Breathe from '../pages/Breathe';
import Coping from '../pages/Coping';
import Focus from '../pages/Focus';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breathe" element={<Breathe />} />
        <Route path="/coping" element={<Coping />} />
        <Route path="/focus" element={<Focus />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
