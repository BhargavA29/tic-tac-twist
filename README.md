# Tic Tac Toe with a Twist

A progressive web application (PWA) built with Next.js that features a unique twist on the classic Tic Tac Toe game. In this version, each player can only have 3 marks on the board at any time. When a player places a 4th mark, their oldest mark is removed from the board.

## Features

- Progressive Web App (PWA) with offline support
- Player customization (names and colors)
- Dynamic gameplay where each player can only have 3 marks on the board at once
- Visual indicators for which mark will be removed next
- Responsive design for all devices

## Game Rules

1. Standard 3x3 Tic Tac Toe grid
2. Players take turns placing their marks on the board
3. **The Twist**: Each player can only have 3 marks on the board at any time
4. When a player places a 4th mark, their oldest mark is automatically removed
5. A player cannot immediately place a mark on a spot that was just vacated by their own mark
6. First player to get 3 marks in a row (horizontally, vertically, or diagonally) wins
7. This version prevents draws/ties since marks are constantly being removed and replaced

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- next-pwa for PWA support

## License

MIT
