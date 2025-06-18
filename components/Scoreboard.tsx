
import React from 'react';

interface ScoreboardProps {
  score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score }) => {
  return (
    <div 
      className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow"
      style={{ 
        backgroundColor: 'var(--color-modal-backdrop-light-opacity)', 
        color: 'var(--color-text-primary)',
        backdropFilter: 'blur(2px)' 
      }}
    >
      <p className="text-base sm:text-lg font-semibold">Score: {score}</p>
    </div>
  );
};

export default Scoreboard;
