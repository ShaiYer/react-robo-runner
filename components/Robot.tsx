import React from 'react';
import { ROBOT_WIDTH, ROBOT_HEIGHT, ROBOT_INITIAL_X, GROUND_RENDER_HEIGHT } from '../constants';
import { GameStatus } from '../types'; // Import GameStatus

interface RobotProps {
  y: number; // Robot's feet y position relative to the top of the ground surface
  isJumping: boolean;
  gameStatus: GameStatus; // Add gameStatus prop
}

const Robot: React.FC<RobotProps> = ({ y, isJumping, gameStatus }) => {
  const RobotSVG = () => (
    <svg
      viewBox="0 0 40 60" // Matches ROBOT_WIDTH, ROBOT_HEIGHT constants
      style={{
        width: `${ROBOT_WIDTH}px`,
        height: `${ROBOT_HEIGHT}px`,
      }}
      className={`robot-svg ${
        gameStatus === GameStatus.Playing && !isJumping ? 'tremble-animation' : ''
      }`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="R2-D2 like robot character, profile view" 
    >
      <defs>
        <style>
          {`
            .robot-svg {
              fill: var(--robot-body-color); 
              stroke: var(--robot-outline-color);
              stroke-width: 1px;
            }
            .body-part {
              fill: var(--robot-body-color);
              stroke: var(--robot-outline-color);
              stroke-width: 1px;
            }
            .detail-part {
              fill: var(--robot-detail-color);
              stroke: var(--robot-outline-color);
              stroke-width: 0.5px;
            }
            .eye-lens {
              fill: var(--robot-eye-lens-color);
              stroke: none;
            }
            .eye-highlight {
              fill: var(--robot-eye-highlight-color);
              stroke: none;
            }
            @keyframes robot-tremble-keyframes {
              0%, 100% { transform: translateY(0); }
              25% { transform: translateY(-0.5px) translateX(0.25px); }
              50% { transform: translateY(0.5px); }
              75% { transform: translateY(-0.5px) translateX(-0.25px); }
            }
            .tremble-animation {
              animation: robot-tremble-keyframes 0.07s linear infinite;
            }
          `}
        </style>
      </defs>

      {/* R2-D2 Profile SVG (Facing Right) */}
      
      {/* Main Side Leg Structure (Prominent in profile) */}
      <rect x="2" y="25" width="13" height="20" rx="3" className="body-part" />
      <rect x="4" y="44" width="7" height="10" rx="1" className="body-part" />
      <rect x="0" y="52" width="13" height="8" rx="2" className="detail-part" />

      {/* Main Cylindrical Body */}
      <rect x="8" y="22" width="24" height="28" rx="3" className="body-part" />
      
      {/* Dome Head */}
      <path d="M5,22 C5,2 35,2 35,22Z" className="body-part" />
      
      {/* --- Details (Facing Right) --- */}

      {/* Dome Details */}
      <circle cx="28" cy="12" r="5" className="eye-lens" /> 
      <circle cx="28" cy="12" r="3.5" className="detail-part" /> 
      <circle cx="27" cy="10.5" r="1.2" className="eye-highlight" /> 

      <rect x="15" y="4.5" width="15" height="3.5" className="detail-part" rx="1" />
      
      {/* Body Details */}
      <rect x="12" y="26" width="18" height="6" className="detail-part" rx="1"/>
      <rect x="15" y="34" width="12" height="4" className="detail-part" rx="1"/>
      
      {/* Details on Side Leg */}
      <rect x="4" y="28" width="9" height="7" className="detail-part" rx="1" />
      <circle cx="7.5" cy="38" r="1.5" className="detail-part" />

      {/* Hint of the other leg/tread */}
      <rect x="15" y="53" width="10" height="6" rx="2" fill="var(--color-secondary-element)" stroke="var(--robot-outline-color)" strokeWidth="0.5px" opacity="0.7"/>

    </svg>
  );

  return (
    <div
      className="absolute"
      style={{
        left: `${ROBOT_INITIAL_X}px`,
        bottom: `${GROUND_RENDER_HEIGHT + y}px`, 
        width: `${ROBOT_WIDTH}px`,
        height: `${ROBOT_HEIGHT}px`,
      }}
      role="img"
      aria-label="Player-controlled R2-D2 like robot"
    >
      <RobotSVG />
    </div>
  );
};

export default Robot;