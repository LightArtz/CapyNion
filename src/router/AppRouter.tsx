import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Breathe from '../pages/Breathe';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breathe" element={<Breathe />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
