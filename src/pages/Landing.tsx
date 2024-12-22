import { useNavigate } from 'react-router-dom';
import Auth from '../components/Auth';

export default function Landing() {
  return (
    <div className="flex flex-col">
      <h1>Landing</h1>
      <Auth></Auth>
    </div>
  );
}
