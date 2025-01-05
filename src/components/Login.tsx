import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig';
import Cookies from 'js-cookie';

const GoogleLogin: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      // Set the ID token in a cookie
      Cookies.set('authToken', idToken, { expires: 1, path: '' });
      console.log('ID Token:', idToken);
    } catch (error: any) {
      setError('Login failed. Please try again.');
      console.error('Login error: ', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-500">
      <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login with Google</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-500 text-white rounded-lg"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
