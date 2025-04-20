'use client';

import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import { XMark, OMark } from './GameIcons';

const GameGrid: React.FC = () => {
  const { 
    players, 
    currentPlayer, 
    board, 
    handleMove,
    setGameStage 
  } = useGameContext();

  const [nextToVanish, setNextToVanish] = useState<number | null>(null);

  // Calculate which cell would vanish next for the current player
  useEffect(() => {
    const playerMoves = players[currentPlayer].moves;
    if (playerMoves.length === 3) {
      // Find the oldest move
      const oldestMove = [...playerMoves].sort((a, b) => a.timestamp - b.timestamp)[0];
      setNextToVanish(oldestMove.index);
    } else {
      setNextToVanish(null);
    }
  }, [players, currentPlayer, board]);

  const handleCellClick = (index: number) => {
    // Make the move directly without restriction
    handleMove(index);
  };

  const renderCell = (index: number) => {
    const isOccupied = board[index] !== null;
    const isNextToVanish = index === nextToVanish;
    const playerIndex = board[index];
    
    if (!isOccupied) {
      return (
        <button
          key={index}
          onClick={() => handleCellClick(index)}
          className="game-cell bg-[#f8f9fa] hover:bg-[#f1f3f5]"
          aria-label={`Cell ${index + 1}`}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleCellClick(index)}
        />
      );
    }
    
    if (playerIndex !== null) {
      const playerColor = players[playerIndex].color;
      
      return (
        <button
          key={index}
          disabled
          className={`game-cell ${isNextToVanish ? 'pulse' : 'pop'}`}
          style={{ 
            borderColor: playerColor,
            borderWidth: '3px',
            backgroundColor: 'white'
          }}
          aria-label={`Cell ${index + 1} occupied by ${players[playerIndex].name}`}
          tabIndex={-1}
        >
          {playerIndex === 0 ? (
            <XMark color={playerColor} />
          ) : (
            <OMark color={playerColor} />
          )}
          
          {isNextToVanish && (
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          )}
        </button>
      );
    }
    
    return null;
  };

  return (
    <div className="w-full max-w-md mx-auto fade-in">
      <div className="flex justify-between items-center mb-6 slide-in-up">
        <div 
          className={`px-4 py-3 rounded-lg transition-all duration-300 ${currentPlayer === 0 ? 'bg-white shadow-md scale-105' : 'bg-[#f1f3f5]'}`}
          style={{ borderLeft: `4px solid ${players[0].color}` }}
        >
          <p className="font-bold">{players[0].name}</p>
          <div className="flex items-center gap-1">
            <XMark color={players[0].color} className="w-5 h-5" />
            <p className="text-xs text-gray-600">Marks: {players[0].moves.length}/3</p>
          </div>
        </div>
        
        <button
          onClick={() => setGameStage('setup')}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Exit game"
          tabIndex={0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div 
          className={`px-4 py-3 rounded-lg transition-all duration-300 ${currentPlayer === 1 ? 'bg-white shadow-md scale-105' : 'bg-[#f1f3f5]'}`}
          style={{ borderRight: `4px solid ${players[1].color}` }}
        >
          <p className="font-bold">{players[1].name}</p>
          <div className="flex items-center gap-1">
            <OMark color={players[1].color} className="w-5 h-5" />
            <p className="text-xs text-gray-600">Marks: {players[1].moves.length}/3</p>
          </div>
        </div>
      </div>
      
      <div className="relative grid grid-cols-3 gap-3 aspect-square p-4 rounded-lg shadow-lg game-board slide-in-up" style={{ animationDelay: '0.1s' }}>
        {Array(9).fill(null).map((_, index) => (
          <div key={index} className="aspect-square">
            {renderCell(index)}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md slide-in-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-lg font-medium mb-3">Current Turn</h3>
        <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: `${players[currentPlayer].color}15` }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md"
          >
            {currentPlayer === 0 ? (
              <XMark color={players[currentPlayer].color} className="w-7 h-7" />
            ) : (
              <OMark color={players[currentPlayer].color} className="w-7 h-7" />
            )}
          </div>
          <div>
            <p className="font-medium">{players[currentPlayer].name}'s turn</p>
            {nextToVanish !== null && (
              <p className="text-sm text-red-600 wiggle">
                Next mark will remove your oldest mark!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameGrid; 