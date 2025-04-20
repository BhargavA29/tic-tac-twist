'use client';

import { GameProvider } from './context/GameContext';
import GameBoard from './components/GameBoard';

export default function Home() {
  return (
    <GameProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
        <GameBoard />
      </main>
    </GameProvider>
  );
}
