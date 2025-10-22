import { useEffect, useState, useCallback } from 'react';
import { authAPI, authHelpers } from '../utils/api';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialResponse = useCallback(async (response) => {
    setIsLoading(true);
    try {
      // Send the credential to your backend
      const data = await authAPI.googleAuth(response.credential);

      if (data.success) {
        // Store the token and user
        authHelpers.setAuth(data.data.token, data.data.user);
        
        // Call success callback
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (onError) {
          onError(data.message);
        }
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      if (onError) {
        onError('Failed to authenticate with Google');
      }
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess, onError]);

  useEffect(() => {
    // Load Google Sign-In script
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogle();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    };

    const initializeGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
      }
    };

    loadGoogleScript();
  }, [handleCredentialResponse]);

  const handleGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt(); // Show Google One Tap
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#5C2E2E]/20 rounded-lg hover:bg-[#F5F3F0]/50 transition-all text-[#5C2E2E] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      {isLoading ? 'Signing in...' : 'Continue with Google'}
    </button>
  );
};

export default GoogleLoginButton;
