
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 300;
export const GROUND_Y_POSITION = GAME_HEIGHT - 50; // Bottom of the robot is at this y - DEPRECATED for visual positioning
export const GROUND_RENDER_HEIGHT = 50; // Visual height of the ground element

export const ROBOT_WIDTH = 40;
export const ROBOT_HEIGHT = 60;
export const ROBOT_INITIAL_X = 50;

export const JUMP_VELOCITY = 13; // Initial upward velocity on jump (Reduced from 18)
export const GRAVITY = 0.8; // Acceleration due to gravity

export const OBSTACLE_MIN_WIDTH = 20;
export const OBSTACLE_MAX_WIDTH = 50;
export const OBSTACLE_MIN_HEIGHT = 30;
export const OBSTACLE_MAX_HEIGHT = 70;
export const OBSTACLE_MIN_GAP = 200; // Minimum gap between obstacles
export const OBSTACLE_MAX_GAP = 450; // Maximum gap between obstacles

export const INITIAL_GAME_SPEED = 5;
export const GAME_SPEED_INCREMENT = 0.01; // How much speed increases per score point
export const MAX_GAME_SPEED = 15;

export const SCORE_INCREMENT_INTERVAL = 50; // milliseconds
export const SCORE_POINTS_PER_INTERVAL = 1;