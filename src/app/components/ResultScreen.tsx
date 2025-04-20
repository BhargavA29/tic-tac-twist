'use client';

import React from 'react';
import { useGameContext } from '../context/GameContext';
import { XMark, OMark } from './GameIcons';

const ResultScreen: React.FC = () => {
  const { players, winner, resetGame, setGameStage, startGame, setPlayers, setBoard, setCurrentPlayer, setWinner } = useGameContext();
  
  if (winner === null) return null;
  
  const winningPlayer = players[winner];
  
  const handlePlayAgain = () => {
    // Reset the board and moves while keeping the same players
    const resetPlayers = [
      { ...players[0], moves: [] },
      { ...players[1], moves: [] }
    ] as [typeof players[0], typeof players[1]];
    
    setPlayers(resetPlayers);
    setBoard(Array(9).fill(null));
    setCurrentPlayer(0);
    setWinner(null);
    setGameStage('game');
  };
  
  const handleChangePlayers = () => {
    // Keep player names but reset the game state
    const currentPlayerNames = [players[0].name, players[1].name];
    
    startGame();
    
    // After startGame is called, update the player names in the next tick
    setTimeout(() => {
      setPlayers(prev => [
        { ...prev[0], name: currentPlayerNames[0] },
        { ...prev[1], name: currentPlayerNames[1] }
      ]);
    }, 0);
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg text-center fade-in">
      <div className="py-3 px-4 inline-block rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white font-bold mb-4 slide-in-up">
        Winner!
      </div>
      
      <h2 className="text-3xl font-bold mb-8 slide-in-up" style={{ animationDelay: '0.1s' }}>
        Game Over!
      </h2>
      
      <div 
        className="my-8 p-6 rounded-lg bg-white shadow-md border-2 slide-in-up"
        style={{ 
          borderColor: winningPlayer.color,
          animationDelay: '0.2s',
          backgroundColor: `${winningPlayer.color}10` 
        }}
      >
        <div className="mb-6">
          {winner === 0 ? (
            <XMark color={winningPlayer.color} className="w-20 h-20 mx-auto" />
          ) : (
            <OMark color={winningPlayer.color} className="w-20 h-20 mx-auto" />
          )}
        </div>
        
        <div className="flex items-center justify-center gap-3 mb-2">
          <h3 className="text-3xl font-bold" style={{ color: winningPlayer.color }}>
            {winningPlayer.name}
          </h3>
        </div>
        
        <div className="relative mt-4 mb-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">is the winner</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 mt-10 slide-in-up" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={handlePlayAgain}
          className="px-6 py-4 bg-[#7047EB] text-white rounded-lg hover:bg-[#6240c7] transition-all duration-300 hover:-translate-y-1 font-medium flex items-center justify-center gap-2"
          aria-label="Play again with same players"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handlePlayAgain()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Play Again (Same Players)
        </button>
        
        <button
          onClick={handleChangePlayers}
          className="px-6 py-4 bg-[#9553E6] text-white rounded-lg hover:bg-[#7f46c7] transition-all duration-300 hover:-translate-y-1 font-medium flex items-center justify-center gap-2"
          aria-label="Change players"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChangePlayers()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Change Players
        </button>
        
        <button
          onClick={resetGame}
          className="px-6 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 hover:-translate-y-1 font-medium flex items-center justify-center gap-2"
          aria-label="Return to home screen"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && resetGame()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ResultScreen; 