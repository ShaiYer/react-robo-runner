import React from 'react';

interface GameOverScreenProps {
  score: number;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score }) => {
  return (
    <div 
      className="absolute inset-0 flex flex-col justify-center items-center p-8 rounded-lg"
      style={{ 
        backgroundColor: 'var(--color-modal-backdrop)', 
        color: 'var(--color-text-primary)',
        backdropFilter: 'blur(3px)' 
      }}
    >
      <h2 
        className="text-4xl font-bold mb-4"
        style={{ color: 'var(--color-highlight)' }}
      >
        Game Over!
      </h2>
      <p className="text-2xl mb-2">Your Score: {score}</p>
      <p className="text-lg animate-pulse mt-4">
        Press <kbd className="px-2 py-1 text-sm font-semibold rounded-md shadow-sm" style={{ backgroundColor: 'var(--color-button-bg)', color: 'var(--color-button-text)', border: '1px solid var(--color-button-border)', margin: '0 0.25rem' }}>SPACE</kbd> 
        or <kbd className="px-2 py-1 text-sm font-semibold rounded-md shadow-sm" style={{ backgroundColor: 'var(--color-button-bg)', color: 'var(--color-button-text)', border: '1px solid var(--color-button-border)', margin: '0 0.25rem' }}>ARROW UP</kbd> 
        to Restart
      </p>
    </div>
  );
};

export default GameOverScreen;