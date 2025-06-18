
import React from 'react';

interface StartScreenProps {
  onToggleTheme: () => void;
  currentTheme: 'light' | 'dark';
  isMobile: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onToggleTheme, currentTheme, isMobile }) => {
  return (
    <div 
      className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-8 rounded-lg text-center"
      style={{ 
        backgroundColor: 'var(--color-modal-backdrop)', 
        color: 'var(--color-text-primary)',
        backdropFilter: 'blur(3px)' 
      }}
    >
      <h1 
        className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4"
        style={{ color: 'var(--color-highlight)'}}
      >
        Robot Runner
      </h1>
      
      {isMobile ? (
        <p className="text-lg sm:text-xl my-4 sm:my-6 animate-pulse">
          Tap to Start & Jump
        </p>
      ) : (
        <p className="text-lg sm:text-xl my-4 sm:my-6 animate-pulse">
          Press <kbd className="px-2 py-1 text-xs sm:text-sm font-semibold rounded-md shadow-sm" style={{ backgroundColor: 'var(--color-button-bg)', color: 'var(--color-button-text)', border: '1px solid var(--color-button-border)', margin: '0 0.25rem' }}>SPACE</kbd> 
          or <kbd className="px-2 py-1 text-xs sm:text-sm font-semibold rounded-md shadow-sm" style={{ backgroundColor: 'var(--color-button-bg)', color: 'var(--color-button-text)', border: '1px solid var(--color-button-border)', margin: '0 0.25rem' }}>ARROW UP</kbd> 
          to Start & Jump
        </p>
      )}

      <button
        onClick={onToggleTheme}
        className="px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold rounded-md shadow-sm transition-colors duration-150 ease-in-out"
        style={{
          backgroundColor: 'var(--color-button-bg)',
          color: 'var(--color-button-text)',
          border: '1px solid var(--color-button-border)',
        }}
        aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0">
        <p className="text-2xs sm:text-xs" style={{ color: 'var(--color-accent)'}}>
          Developed by Google AI Studio in collaboration with Shai Yerushalmi
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
