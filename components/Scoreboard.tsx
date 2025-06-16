import React from 'react';

interface ScoreboardProps {
  score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score }) => {
  return (
    <div 
      className="absolute top-4 right-4 p-2 rounded-lg shadow"
      style={{ 
        backgroundColor: 'var(--color-modal-backdrop-light-opacity)', 
        color: 'var(--color-text-primary)',
        backdropFilter: 'blur(2px)' 
      }}
    >
      <p className="text-lg font-semibold">Score: {score}</p>
    </div>
  );
};

export default Scoreboard;