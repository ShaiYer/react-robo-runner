import React from 'react';
import { ObstacleState as ObstacleData } from '../types';
import { GROUND_RENDER_HEIGHT } from '../constants';

interface ObstacleProps {
  obstacle: ObstacleData;
}

const Obstacle: React.FC<ObstacleProps> = ({ obstacle }) => {
  return (
    <div
      className="absolute rounded shadow-md"
      style={{
        left: `${obstacle.x}px`,
        bottom: `${GROUND_RENDER_HEIGHT}px`, 
        width: `${obstacle.width}px`,
        height: `${obstacle.height}px`,
        backgroundColor: 'var(--color-secondary-element)',
        border: '2px solid var(--color-stroke)',
      }}
      aria-label="Obstacle"
    />
  );
};

export default Obstacle;