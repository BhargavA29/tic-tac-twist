'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Player = {
  name: string;
  color: string;
  moves: { index: number; timestamp: number }[];
};

type GameContextType = {
  players: [Player, Player];
  setPlayers: React.Dispatch<React.SetStateAction<[Player, Player]>>;
  currentPlayer: number;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<number>>;
  board: (number | null)[];
  setBoard: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  gameStage: 'landing' | 'setup' | 'game' | 'result';
  setGameStage: React.Dispatch<React.SetStateAction<'landing' | 'setup' | 'game' | 'result'>>;
  winner: number | null;
  setWinner: React.Dispatch<React.SetStateAction<number | null>>;
  handleMove: (index: number) => void;
  resetGame: () => void;
  startGame: () => void;
};

const defaultPlayers: [Player, Player] = [
  { name: 'Player 1', color: '#FF5733', moves: [] },
  { name: 'Player 2', color: '#33A1FF', moves: [] }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<[Player, Player]>(defaultPlayers);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [board, setBoard] = useState<(number | null)[]>(Array(9).fill(null));
  const [gameStage, setGameStage] = useState<'landing' | 'setup' | 'game' | 'result'>('landing');
  const [winner, setWinner] = useState<number | null>(null);

  // Load saved game state on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedState = localStorage.getItem('ticTacToeGameState');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          setPlayers(parsedState.players);
          setCurrentPlayer(parsedState.currentPlayer);
          setBoard(parsedState.board);
          setGameStage(parsedState.gameStage);
          setWinner(parsedState.winner);
        }
      } catch (error) {
        console.error('Error loading saved game state:', error);
      }
    }
  }, []);

  // Save game state whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const gameState = {
        players,
        currentPlayer,
        board,
        gameStage,
        winner
      };
      localStorage.setItem('ticTacToeGameState', JSON.stringify(gameState));
    }
  }, [players, currentPlayer, board, gameStage, winner]);

  const checkWinner = (board: (number | null)[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleMove = (index: number) => {
    // Don't allow placing on occupied cells or if there's already a winner
    if (board[index] !== null || winner !== null) return;

    const player = currentPlayer;
    const newBoard = [...board];
    const newPlayers = [...players] as [Player, Player];
    
    // Add the current move with timestamp
    const currentMove = { index, timestamp: Date.now() };
    newPlayers[player].moves.push(currentMove);
    
    // If player has more than 3 moves, remove the oldest one
    if (newPlayers[player].moves.length > 3) {
      // Find and remove the oldest move
      const oldestMove = newPlayers[player].moves.sort((a, b) => a.timestamp - b.timestamp)[0];
      newPlayers[player].moves = newPlayers[player].moves.filter(move => move !== oldestMove);
      
      // Clear the oldest position on the board
      newBoard[oldestMove.index] = null;
    }
    
    // Place the current move on the board
    newBoard[index] = player;
    
    setBoard(newBoard);
    setPlayers(newPlayers);
    
    // Check for a winner
    const gameWinner = checkWinner(newBoard);
    if (gameWinner !== null) {
      setWinner(gameWinner);
      setGameStage('result');
    } else {
      // Switch to the other player
      setCurrentPlayer(player === 0 ? 1 : 0);
    }
  };

  const resetGame = () => {
    setPlayers(defaultPlayers);
    setCurrentPlayer(0);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setGameStage('landing');
  };

  const startGame = () => {
    setPlayers([
      { name: 'Player 1', color: '#FF5733', moves: [] },
      { name: 'Player 2', color: '#33A1FF', moves: [] }
    ]);
    setCurrentPlayer(0);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setGameStage('setup');
  };

  return (
    <GameContext.Provider 
      value={{ 
        players, 
        setPlayers, 
        currentPlayer, 
        setCurrentPlayer, 
        board, 
        setBoard, 
        gameStage, 
        setGameStage, 
        winner, 
        setWinner, 
        handleMove,
        resetGame,
        startGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}; 