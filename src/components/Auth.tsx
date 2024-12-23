import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const handleAuthenticated = (authClient: AuthClient) => {
      handleNavigateToHome();
      console.log('authenticated');
    };
    const init = async () => {
      const authClient = await AuthClient.create();
      authClient.login({
        // 7 days in nanoseconds
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        onSuccess: async () => {
          handleAuthenticated(authClient);
        },
      });
    };
    init();
    console.log('init');
  };
  const handleNavigateToHome = () => {
    navigate('/home');
  };
  return (
    <>
      <button
        className="absolute top-6 right-6 bg-[#D5C4A1] font-bold px-7 py-1.5 rounded-lg shadow-md hover:bg-[#e6d3ae] z-30"
        onClick={handleLogin}
        style={{ color: '#795915' }}
      >
        login
      </button>
    </>
  );
}
