
export interface RobotState {
  y: number;
  velocityY: number;
  isJumping: boolean;
}

export interface ObstacleState {
  id: number;
  x: number;
  width: number;
  height: number;
  // type: 'block' | 'spike'; // Future extension
}

export enum GameStatus {
  Initial = 'initial',
  Playing = 'playing',
  GameOver = 'gameOver',
}
