'use client';

import React from 'react';
import { useGameContext } from '../context/GameContext';
import LandingPage from './LandingPage';
import PlayerSetup from './PlayerSetup';
import GameGrid from './GameGrid';
import ResultScreen from './ResultScreen';

const GameBoard: React.FC = () => {
  const { gameStage } = useGameContext();

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-6">
      {gameStage === 'landing' && <LandingPage />}
      {gameStage === 'setup' && <PlayerSetup />}
      {gameStage === 'game' && <GameGrid />}
      {gameStage === 'result' && <ResultScreen />}
    </div>
  );
};

export default GameBoard; 