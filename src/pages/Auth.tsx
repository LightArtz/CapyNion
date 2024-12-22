import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const handleAuthenticated = (authClient: AuthClient) => {
      console.log(authClient);
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

      if (await authClient.isAuthenticated()) {
        console.log(authClient, 'is authenticated');
      }
    };
    init();
    console.log('init');
  };
  const handleNavigateToHome = () => {
    navigate('/');
  };
  return (
    <>
      <button onClick={handleLogin}>login</button>
    </>
  );
}
