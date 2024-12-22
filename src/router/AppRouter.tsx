import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Breathe from '../pages/Breathe';
import Landing from '../pages/Landing';
import FocusTimer from '../pages/FocusTimer'
import StressCoping from '../pages/StressCoping'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/breathe" element={<Breathe />} />
        <Route path="/" element={<Landing/>} />
        <Route path="/focustimer" element={<FocusTimer/>} />
        <Route path="/stresscoping" element={<StressCoping/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
