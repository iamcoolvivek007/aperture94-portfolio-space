
import React, { useState, useEffect } from 'react';

type Suit = '♠' | '♥' | '♦' | '♣';
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface Card {
  suit: Suit;
  rank: Rank;
  color: 'red' | 'black';
  faceUp: boolean;
}

const SolitaireWindow = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []]);
  const [tableau, setTableau] = useState<Card[][]>([[], [], [], [], [], [], []]);
  const [waste, setWaste] = useState<Card[]>([]);
  const [stock, setStock] = useState<Card[]>([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const suits: Suit[] = ['♠', '♥', '♦', '♣'];
  const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const createDeck = (): Card[] => {
    const newDeck: Card[] = [];
    suits.forEach(suit => {
      ranks.forEach(rank => {
        newDeck.push({
          suit,
          rank,
          color: suit === '♥' || suit === '♦' ? 'red' : 'black',
          faceUp: false
        });
      });
    });
    return shuffleDeck(newDeck);
  };

  const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startNewGame = () => {
    const newDeck = createDeck();
    const newTableau: Card[][] = [[], [], [], [], [], [], []];
    let deckIndex = 0;

    // Deal cards to tableau
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const card = newDeck[deckIndex++];
        card.faceUp = row === col; // Only top card face up
        newTableau[col].push(card);
      }
    }

    const remainingCards = newDeck.slice(deckIndex);
    
    setTableau(newTableau);
    setStock(remainingCards);
    setWaste([]);
    setFoundations([[], [], [], []]);
    setScore(0);
    setGameWon(false);
  };

  const drawFromStock = () => {
    if (stock.length > 0) {
      const newCard = { ...stock[0], faceUp: true };
      setWaste([newCard, ...waste]);
      setStock(stock.slice(1));
    } else if (waste.length > 0) {
      // Reset stock from waste
      const newStock = waste.map(card => ({ ...card, faceUp: false })).reverse();
      setStock(newStock);
      setWaste([]);
    }
  };

  const getRankValue = (rank: Rank): number => {
    if (rank === 'A') return 1;
    if (rank === 'J') return 11;
    if (rank === 'Q') return 12;
    if (rank === 'K') return 13;
    return parseInt(rank);
  };

  const canPlaceOnFoundation = (card: Card, foundationIndex: number): boolean => {
    const foundation = foundations[foundationIndex];
    if (foundation.length === 0) {
      return card.rank === 'A';
    }
    const topCard = foundation[foundation.length - 1];
    return card.suit === topCard.suit && getRankValue(card.rank) === getRankValue(topCard.rank) + 1;
  };

  const canPlaceOnTableau = (card: Card, columnIndex: number): boolean => {
    const column = tableau[columnIndex];
    if (column.length === 0) {
      return card.rank === 'K';
    }
    const topCard = column[column.length - 1];
    return card.color !== topCard.color && getRankValue(card.rank) === getRankValue(topCard.rank) - 1;
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const CardComponent = ({ card, onClick }: { card: Card; onClick?: () => void }) => (
    <div
      className={`w-12 h-16 border border-gray-600 rounded-sm text-xs flex items-center justify-center cursor-pointer
        ${card.faceUp ? 'bg-white' : 'bg-blue-800'}
        ${card.faceUp ? (card.color === 'red' ? 'text-red-600' : 'text-black') : 'text-white'}
      `}
      onClick={onClick}
    >
      {card.faceUp ? (
        <div className="text-center">
          <div>{card.rank}</div>
          <div>{card.suit}</div>
        </div>
      ) : (
        <div className="text-center">
          <div>🂠</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full bg-green-700 p-4 overflow-hidden">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center text-white">
        <div className="text-sm">Score: {score}</div>
        <button
          className="win95-button px-3 py-1 text-xs text-black"
          onClick={startNewGame}
        >
          New Game
        </button>
        <div className="text-sm">Solitaire</div>
      </div>

      {gameWon && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 border-4 border-yellow-400 text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 You Won! 🎉</h2>
            <p className="mb-4">Congratulations! Final Score: {score}</p>
            <button
              className="win95-button px-4 py-2"
              onClick={startNewGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-7 gap-2 h-full">
        {/* Top Row - Stock, Waste, and Foundations */}
        <div className="col-span-7 flex gap-2 mb-4 h-20">
          {/* Stock */}
          <div
            className="w-12 h-16 border border-gray-400 bg-blue-800 rounded-sm cursor-pointer flex items-center justify-center text-white"
            onClick={drawFromStock}
          >
            {stock.length > 0 ? '🂠' : '↻'}
          </div>

          {/* Waste */}
          <div className="w-12 h-16 border border-gray-400 rounded-sm">
            {waste.length > 0 && <CardComponent card={waste[0]} />}
          </div>

          <div className="flex-1"></div>

          {/* Foundations */}
          {foundations.map((foundation, index) => (
            <div
              key={index}
              className="w-12 h-16 border border-gray-400 rounded-sm bg-gray-300"
            >
              {foundation.length > 0 && (
                <CardComponent card={foundation[foundation.length - 1]} />
              )}
            </div>
          ))}
        </div>

        {/* Tableau */}
        {tableau.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-1">
            {column.map((card, cardIndex) => (
              <div
                key={cardIndex}
                style={{ marginTop: cardIndex > 0 ? '-40px' : '0' }}
                className="z-10"
              >
                <CardComponent card={card} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolitaireWindow;
