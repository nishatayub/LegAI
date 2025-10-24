import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, authHelpers } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login(email, password);

      if (data.success) {
        // Store token and user
        authHelpers.setAuth(data.data.token, data.data.user);
        
        // Navigate to chat/dashboard
        navigate('/chat');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#5C2E2E] rounded-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#F5F3F0" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="#F5F3F0" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#5C2E2E]">LegAI</h1>
          </div>
          <h2 className="text-2xl font-semibold text-[#5C2E2E] mb-2">Welcome back</h2>
          <p className="text-[#7D4545]/70">Sign in to continue to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#EAE4DC]">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#5C2E2E] mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#5C2E2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4545] focus:border-transparent transition-all bg-[#F5F3F0]/50 text-[#5C2E2E] placeholder:text-[#7D4545]/50"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#5C2E2E] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#5C2E2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4545] focus:border-transparent transition-all bg-[#F5F3F0]/50 text-[#5C2E2E] placeholder:text-[#7D4545]/50 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D4545] hover:text-[#5C2E2E] transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3l18 18M10.5 10.5A2 2 0 0113.5 13.5M12 5c4.5 0 8 4 9 7-1 3-4.5 7-9 7s-8-4-9-7c1-3 4.5-7 9-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#5C2E2E]/30 text-[#5C2E2E] focus:ring-[#7D4545] focus:ring-offset-0"
                />
                <span className="text-sm text-[#7D4545]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#5C2E2E] hover:text-[#7D4545] font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5C2E2E] text-white py-3 rounded-lg font-semibold hover:bg-[#7D4545] active:scale-[0.98] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

          </form>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-[#7D4545]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#5C2E2E] font-semibold hover:text-[#7D4545] transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
