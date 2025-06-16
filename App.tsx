import React, { useState, useEffect, useCallback, useRef } from 'react';
import RobotComponent from './components/Robot';
import ObstacleComponent from './components/Obstacle';
import Scoreboard from './components/Scoreboard';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import {
  GAME_WIDTH, GAME_HEIGHT, GROUND_RENDER_HEIGHT, 
  ROBOT_HEIGHT, ROBOT_WIDTH, ROBOT_INITIAL_X,
  JUMP_VELOCITY, GRAVITY,
  OBSTACLE_MIN_WIDTH, OBSTACLE_MAX_WIDTH, OBSTACLE_MIN_HEIGHT, OBSTACLE_MAX_HEIGHT,
  OBSTACLE_MIN_GAP, OBSTACLE_MAX_GAP,
  INITIAL_GAME_SPEED, GAME_SPEED_INCREMENT, MAX_GAME_SPEED,
  SCORE_INCREMENT_INTERVAL, SCORE_POINTS_PER_INTERVAL
} from './constants';
import { ObstacleState, GameStatus } from './types';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [robotY, setRobotY] = useState(0); 
  const [robotVelocityY, setRobotVelocityY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<ObstacleState[]>([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Initial);
  const [currentGameSpeed, setCurrentGameSpeed] = useState(INITIAL_GAME_SPEED);
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark

  const gameTimeRef = useRef<number>(0);
  const nextObstacleSpawnTimeRef = useRef<number>(0);
  const scoreTimerRef = useRef<number | null>(null);
  const requestRef = useRef<number | undefined>(undefined); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    const initialTheme: Theme = themeParam === 'light' ? 'light' : 'dark';
    setTheme(initialTheme);

    if (initialTheme === 'light') {
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('theme-dark');
    } else {
      document.documentElement.classList.add('theme-dark');
      document.documentElement.classList.remove('theme-light');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      if (newTheme === 'light') {
        document.documentElement.classList.add('theme-light');
        document.documentElement.classList.remove('theme-dark');
      } else {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-light');
      }
      return newTheme;
    });
  }, []);

  const resetGame = useCallback(() => {
    setRobotY(0);
    setRobotVelocityY(0);
    setIsJumping(false);
    setObstacles([]);
    setScore(0);
    setCurrentGameSpeed(INITIAL_GAME_SPEED);
    gameTimeRef.current = 0;
    nextObstacleSpawnTimeRef.current = OBSTACLE_MIN_GAP + Math.random() * (OBSTACLE_MAX_GAP - OBSTACLE_MIN_GAP);
    if (scoreTimerRef.current) clearInterval(scoreTimerRef.current);
    scoreTimerRef.current = null;
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameStatus(GameStatus.Playing);
    scoreTimerRef.current = window.setInterval(() => {
      setScore(prevScore => prevScore + SCORE_POINTS_PER_INTERVAL);
    }, SCORE_INCREMENT_INTERVAL);
  }, [resetGame]);

  const jump = useCallback(() => {
    if (!isJumping && gameStatus === GameStatus.Playing) {
      setIsJumping(true);
      setRobotVelocityY(JUMP_VELOCITY);
    }
  }, [isJumping, gameStatus]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        if (gameStatus === GameStatus.Initial || gameStatus === GameStatus.GameOver) {
          startGame();
        } else if (gameStatus === GameStatus.Playing) {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameStatus, startGame, jump]);

  useEffect(() => {
    if (gameStatus !== GameStatus.Playing) {
      if(requestRef.current !== undefined) cancelAnimationFrame(requestRef.current); 
      return;
    }

    let lastFrameTime = performance.now();

    const gameLoop = (timestamp: number) => {
      const now = performance.now();
      const rawDeltaTime = (now - lastFrameTime);
      lastFrameTime = now;
      const deltaTime = Math.min(rawDeltaTime, 50) / 16.67; 

      let potentialRobotY = robotY;
      let potentialRobotVelocityY = robotVelocityY;
      let potentialIsJumping = isJumping;

      if (potentialIsJumping) {
        potentialRobotVelocityY -= GRAVITY * deltaTime;
        potentialRobotY += potentialRobotVelocityY * deltaTime;

        if (potentialRobotY <= 0) {
          potentialRobotY = 0;
          potentialRobotVelocityY = 0;
          potentialIsJumping = false;
        }
      }
      
      let potentialObstacles = obstacles
        .map(obs => ({ ...obs, x: obs.x - currentGameSpeed * deltaTime }))
        .filter(obs => obs.x + obs.width > 0);

      nextObstacleSpawnTimeRef.current -= currentGameSpeed * deltaTime; 

      if (nextObstacleSpawnTimeRef.current <= 0) {
        const newObstacleHeight = OBSTACLE_MIN_HEIGHT + Math.random() * (OBSTACLE_MAX_HEIGHT - OBSTACLE_MIN_HEIGHT);
        const newObstacleWidth = OBSTACLE_MIN_WIDTH + Math.random() * (OBSTACLE_MAX_WIDTH - OBSTACLE_MIN_WIDTH);
        potentialObstacles.push({
          id: Date.now(),
          x: GAME_WIDTH, 
          width: newObstacleWidth,
          height: newObstacleHeight,
        });
        const baseGap = OBSTACLE_MIN_GAP + Math.random() * (OBSTACLE_MAX_GAP - OBSTACLE_MIN_GAP);
        nextObstacleSpawnTimeRef.current = baseGap + newObstacleWidth; 
      }

      const robotRect = {
        x: ROBOT_INITIAL_X,
        y: potentialRobotY, 
        width: ROBOT_WIDTH,
        height: ROBOT_HEIGHT,
      };

      let collisionDetected = false;
      for (const obs of potentialObstacles) {
        const obsRect = {
          x: obs.x,
          y: 0, 
          width: obs.width,
          height: obs.height,
        };
        
        if (
          robotRect.x < obsRect.x + obsRect.width &&
          robotRect.x + robotRect.width > obsRect.x &&
          robotRect.y < obsRect.y + obsRect.height && 
          robotRect.y + robotRect.height > obsRect.y    
        ) {
          collisionDetected = true;
          break;
        }
      }
      
      if (collisionDetected) {
        setGameStatus(GameStatus.GameOver);
        if (scoreTimerRef.current) clearInterval(scoreTimerRef.current);
        scoreTimerRef.current = null;
        return; 
      } else {
        setRobotY(potentialRobotY);
        setRobotVelocityY(potentialRobotVelocityY);
        if (isJumping !== potentialIsJumping) {
          setIsJumping(potentialIsJumping);
        }
        setObstacles(potentialObstacles);
        setCurrentGameSpeed(prevSpeed => Math.min(MAX_GAME_SPEED, INITIAL_GAME_SPEED + score * GAME_SPEED_INCREMENT));
        requestRef.current = requestAnimationFrame(gameLoop);
      }
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if(requestRef.current !== undefined) cancelAnimationFrame(requestRef.current); 
    };
  }, [gameStatus, score, obstacles, robotY, isJumping, robotVelocityY, currentGameSpeed, INITIAL_GAME_SPEED, jump, resetGame]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 select-none" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)'}}>
      <div
        className="relative border-4 rounded-lg shadow-2xl overflow-hidden"
        style={{ 
          width: `${GAME_WIDTH}px`, 
          height: `${GAME_HEIGHT}px`,
          backgroundColor: 'var(--color-tertiary-element)', 
          borderColor: 'var(--color-stroke)' 
        }}
        aria-label="Robot Runner game area"
        role="application"
      >
        {/* Ground */}
        <div 
          className="absolute left-0 right-0 bottom-0 border-t-4 pattern-mono-ground"
          style={{ 
            height: `${GROUND_RENDER_HEIGHT}px`,
            backgroundColor: 'var(--color-primary-element)', 
            borderColor: 'var(--color-stroke)', 
          }}
          aria-hidden="true"
        >
        </div>

        <RobotComponent y={robotY} isJumping={isJumping} gameStatus={gameStatus} />

        {obstacles.map(obstacle => (
          <ObstacleComponent key={obstacle.id} obstacle={obstacle} />
        ))}
        
        <Scoreboard score={score} />

        {gameStatus === GameStatus.Initial && <StartScreen onToggleTheme={toggleTheme} currentTheme={theme} />}
        {gameStatus === GameStatus.GameOver && <GameOverScreen score={score} />}
      </div>
    </div>
  );
};

export default App;