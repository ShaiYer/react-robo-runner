
import React from 'react';

interface GameOverScreenProps {
  score: number;
  isMobile: boolean; // Retained for potential future use, though not directly used for instruction text now
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, isMobile, onRestart }) => {
  return (
    <div 
      className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-8 rounded-lg text-center"
      style={{ 
        backgroundColor: 'var(--color-modal-backdrop)', 
        color: 'var(--color-text-primary)',
        backdropFilter: 'blur(3px)' 
      }}
    >
      <h2 
        className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4"
        style={{ color: 'var(--color-highlight)' }}
      >
        Game Over!
      </h2>
      <p className="text-xl sm:text-2xl mb-4 sm:mb-6">Your Score: {score}</p>
      
      <button
        onClick={onRestart}
        className="mt-2 sm:mt-4 px-6 py-2.5 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold rounded-lg shadow-md hover:opacity-90 active:opacity-80 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-highlight)] focus:ring-offset-[var(--color-tertiary-element)]"
        style={{
          backgroundColor: 'var(--color-button-bg)',
          color: 'var(--color-button-text)',
          border: '2px solid var(--color-button-border)',
        }}
        aria-label="Restart game"
      >
        Restart Game
      </button>
    </div>
  );
};

export default GameOverScreen;
