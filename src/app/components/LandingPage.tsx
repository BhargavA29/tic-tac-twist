'use client';

import React from 'react';
import { useGameContext } from '../context/GameContext';
import { XMark, OMark } from './GameIcons';

const LandingPage: React.FC = () => {
  const { startGame } = useGameContext();

  const handleStart = () => {
    startGame();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 py-10 fade-in">
      <div className="relative mb-4">
        <h1 className="text-5xl font-bold text-center relative z-10">
          Tic Tac Toe
        </h1>
        <h2 className="text-2xl text-center text-[#7047EB] font-semibold mt-2 relative z-10">
          with a twist
        </h2>
        
        {/* Decorative Icons */}
        <div className="absolute -top-10 -left-8 rotate-12 opacity-10">
          <XMark color="#FF5733" className="w-24 h-24" />
        </div>
        <div className="absolute -bottom-8 -right-8 -rotate-12 opacity-10">
          <OMark color="#33A1FF" className="w-24 h-24" />
        </div>
      </div>
      
      <div className="mt-4 text-center max-w-sm slide-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="p-6 bg-white rounded-xl shadow-md mb-6">
          <p className="mb-4 text-gray-700">
            A unique version of Tic Tac Toe where each player can only have <span className="font-bold text-[#7047EB]">3 marks</span> on the board at a time.
          </p>
          <p className="mb-4 text-gray-700">
            When you place your 4th mark, your <span className="font-bold text-red-500">oldest mark is removed</span>!
          </p>
          <p className="text-gray-700">
            This creates a dynamic game that never ends in a tie!
          </p>
        </div>
        
        <div className="flex justify-center gap-6 mt-8 slide-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="text-center p-4 bg-white rounded-lg shadow-md w-24 flex flex-col items-center">
            <XMark color="#FF5733" className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium">Player 1</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-md w-24 flex flex-col items-center">
            <div className="relative">
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
                !
              </span>
              <OMark color="#33A1FF" className="w-12 h-12 mb-2 pulse" />
            </div>
            <p className="text-sm font-medium">Player 2</p>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleStart}
        className="px-8 py-4 text-xl font-medium text-white transition-all rounded-full bg-gradient-to-r from-[#7047EB] to-[#9553E6] hover:from-[#6240c7] hover:to-[#7f46c7] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-1 mt-6 slide-in-up"
        style={{ animationDelay: '0.3s' }}
        aria-label="Start game"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleStart()}
      >
        Start Game
      </button>
    </div>
  );
};

export default LandingPage; 