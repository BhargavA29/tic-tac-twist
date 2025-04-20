'use client';

import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { XMark, OMark } from './GameIcons';

const colorOptions = [
  '#FF5733', // Red-Orange
  '#33A1FF', // Blue
  '#33FF57', // Green
  '#FF33A1', // Pink
  '#A133FF', // Purple
  '#FFD700', // Gold
  '#00CED1', // Dark Turquoise
  '#FF8C00', // Dark Orange
  '#8A2BE2', // Blue Violet
  '#20B2AA', // Light Sea Green
];

const PlayerSetup: React.FC = () => {
  const { players, setPlayers, setGameStage, setBoard, setCurrentPlayer, setWinner } = useGameContext();
  
  const [player1, setPlayer1] = useState({
    name: players[0].name,
    color: players[0].color,
  });
  
  const [player2, setPlayer2] = useState({
    name: players[1].name,
    color: players[1].color,
  });
  
  const [errors, setErrors] = useState({
    player1Name: '',
    player2Name: '',
    colors: '',
  });

  const validateForm = (): boolean => {
    const newErrors = {
      player1Name: '',
      player2Name: '',
      colors: '',
    };
    
    let isValid = true;
    
    if (!player1.name.trim()) {
      newErrors.player1Name = 'Player 1 name is required';
      isValid = false;
    }
    
    if (!player2.name.trim()) {
      newErrors.player2Name = 'Player 2 name is required';
      isValid = false;
    }
    
    if (player1.color === player2.color) {
      newErrors.colors = 'Players must select different colors';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Reset game state with new player information
      setBoard(Array(9).fill(null));
      setCurrentPlayer(0);
      setWinner(null);
      
      setPlayers([
        { ...players[0], name: player1.name.trim(), color: player1.color, moves: [] },
        { ...players[1], name: player2.name.trim(), color: player2.color, moves: [] },
      ]);
      
      setGameStage('game');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto fade-in">
      <div className="p-6 bg-white rounded-xl shadow-lg mb-8 slide-in-up">
        <h2 className="text-2xl font-bold text-center mb-6">Player Setup</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Player 1 Setup */}
          <div className="space-y-4 slide-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-3">
              <XMark color="#7047EB" className="w-8 h-8" />
              <label className="text-lg font-bold">Player 1</label>
            </div>
            
            <input
              type="text"
              maxLength={15}
              value={player1.name}
              onChange={(e) => setPlayer1({ ...player1, name: e.target.value })}
              placeholder="Enter player name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7047EB] focus:border-transparent transition-all"
              aria-label="Player 1 name"
            />
            {errors.player1Name && (
              <p className="text-red-500 text-sm mt-1">{errors.player1Name}</p>
            )}
            
            <div>
              <p className="text-sm mb-2 font-medium">Select Color:</p>
              <div className="grid grid-cols-5 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setPlayer1({ ...player1, color })}
                    className={`w-10 h-10 rounded-full transition-all ${
                      player1.color === color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                    tabIndex={0}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Player 2 Setup */}
          <div className="space-y-4 slide-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-3">
              <OMark color="#7047EB" className="w-8 h-8" />
              <label className="text-lg font-bold">Player 2</label>
            </div>
            
            <input
              type="text"
              maxLength={15}
              value={player2.name}
              onChange={(e) => setPlayer2({ ...player2, name: e.target.value })}
              placeholder="Enter player name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7047EB] focus:border-transparent transition-all"
              aria-label="Player 2 name"
            />
            {errors.player2Name && (
              <p className="text-red-500 text-sm mt-1">{errors.player2Name}</p>
            )}
            
            <div>
              <p className="text-sm mb-2 font-medium">Select Color:</p>
              <div className="grid grid-cols-5 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setPlayer2({ ...player2, color })}
                    className={`w-10 h-10 rounded-full transition-all ${
                      player2.color === color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                    tabIndex={0}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {errors.colors && (
            <p className="text-red-500 text-sm text-center py-2 bg-red-50 rounded-lg">
              {errors.colors}
            </p>
          )}
          
          <div className="flex justify-between gap-4 pt-4 slide-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              type="button"
              onClick={() => setGameStage('landing')}
              className="px-5 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all hover:-translate-y-1 flex items-center gap-2"
              aria-label="Go back"
              tabIndex={0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            
            <button
              type="submit"
              className="px-5 py-3 text-white bg-[#7047EB] rounded-lg hover:bg-[#6240c7] transition-all hover:-translate-y-1 flex items-center gap-2"
              aria-label="Start game with selected settings"
              tabIndex={0}
            >
              Start Game
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerSetup; 