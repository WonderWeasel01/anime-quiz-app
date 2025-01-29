import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReceiptJapaneseYen } from 'lucide-react';
import AnimeBackground from '../assets/images/AnimeBackground.jpg';

const url = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${url}/auth/signup`, {
        username,
        email,
        password
      });
      console.log("Server response:", response);

      if (response.data === "Signup successful") {
        navigate('/login');
      } else {
        setErrorMessage('Unexpected response from server');
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.status === 409) {
        setErrorMessage('Username or email already exists');
      } else {
        setErrorMessage('Signup failed');
      }
    }
  };
  
  return (
    <div className="max-h-screen flex items-center justify-center bg-black relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${AnimeBackground})`,
          filter: 'blur(3px) brightness(0.7)',
          transform: 'scale(1.1)',
        }}
      ></div>
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm text-white relative z-10 rounded-xl shadow-2xl p-8 border-2 border-white/10">
        <div className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <ReceiptJapaneseYen className="w-16 h-16 text-[#ef4444] animate-bounce" />
          </div>
        </div>
        <h1 className='text-center font-bold text-3xl mb-8 bg-gradient-to-r from-[#ef4444] to-pink-500 bg-clip-text text-transparent'>
          Join the AniQuiz Community!
        </h1>
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="🎭 Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/70 border-2 border-white/10 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="✉️ Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/70 border-2 border-white/10 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="🔑 Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/70 border-2 border-white/10 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="🔐 Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/70 border-2 border-white/10 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent transition-all"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#ef4444] to-pink-500 hover:from-[#ef4444]/90 hover:to-pink-500/90 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef4444] transition-all transform hover:scale-105 active:scale-95"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-[#ef4444] hover:text-pink-500 hover:underline transition-colors">
              Already a member? Login Here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
