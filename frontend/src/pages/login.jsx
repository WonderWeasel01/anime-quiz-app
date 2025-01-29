'use client';

import React, { useState } from 'react';
import { ReceiptJapaneseYen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimeBackground from '../assets/images/AnimeBackground.jpg';

const url = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
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
          Welcome back to AniQuiz
        </h1>
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="🔑 Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/signup" className="text-sm text-[#ef4444] hover:text-pink-500 hover:underline transition-colors">
              New to the AniQuiz? Join the community!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
