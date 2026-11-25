import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  Play,
  Pause
} from 'lucide-react';

export default function CookMode({ recipe, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const totalSteps = recipe.instructions.length;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  // Keyboard navigation support: Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, totalSteps, onClose]);

  // Optional Cooking Stopwatch
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const toggleStepCompleted = (index) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="cook-mode-overlay animate-fade-in" role="dialog" aria-modal="true">
      {/* Top Bar */}
      <header className="cook-mode-header">
        <div className="cook-recipe-info">
          <h2>{recipe.name}</h2>
          <div className="cook-step-counter">
            Step {currentStep + 1} of {totalSteps} • {recipe.cuisine} • {recipe.cookTime} mins total
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Kitchen Timer Widget */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem'
            }}
          >
            <Clock size={16} color="#8FA876" />
            <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>
              {formatTimer(timerSeconds)}
            </span>
            <button
              type="button"
              onClick={() => setTimerActive(!timerActive)}
              style={{ color: 'white', display: 'flex' }}
              title={timerActive ? 'Pause timer' : 'Start kitchen timer'}
            >
              {timerActive ? <Pause size={14} /> : <Play size={14} />}
            </button>
            {timerSeconds > 0 && (
              <button
                type="button"
                onClick={() => {
                  setTimerActive(false);
                  setTimerSeconds(0);
                }}
                style={{ color: '#9CA89E', display: 'flex' }}
                title="Reset timer"
              >
                <RotateCcw size={12} />
              </button>
            )}
          </div>

          {/* Exit Cook Mode */}
          <button type="button" className="btn-exit-cook" onClick={onClose}>
            <X size={18} />
            <span>Exit Cook Mode</span>
          </button>
        </div>
      </header>

      {/* Progress Track */}
      <div className="cook-progress-container">
        <div className="cook-progress-track">
          <div
            className="cook-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Active Step Card */}
      <div className="cook-step-container">
        <div className="cook-step-badge">
          Step {currentStep + 1} of {totalSteps}
        </div>

        {/* Step Instruction Text */}
        <p className="cook-instruction-text">
          "{recipe.instructions[currentStep]}"
        </p>

        {/* Mark step as completed checkbox */}
        <div style={{ marginBottom: '2.5rem' }}>
          <button
            type="button"
            onClick={() => toggleStepCompleted(currentStep)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: completedSteps[currentStep]
                ? 'rgba(42, 157, 143, 0.25)'
                : 'rgba(255, 255, 255, 0.08)',
              border: `1.5px solid ${completedSteps[currentStep] ? '#2A9D8F' : 'rgba(255, 255, 255, 0.2)'}`,
              color: completedSteps[currentStep] ? '#52B788' : '#DDE5DF',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <CheckCircle2 size={18} />
            <span>
              {completedSteps[currentStep]
                ? 'Step Completed! Well Done'
                : 'Mark Step as Completed'}
            </span>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="cook-controls-row">
          <button
            type="button"
            className="btn-cook-nav prev"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={20} />
            <span>Previous Step</span>
          </button>

          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              className="btn-cook-nav next"
              onClick={() => setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1))}
            >
              <span>Next Step</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              type="button"
              className="btn-cook-nav next"
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                boxShadow: '0 8px 20px rgba(231, 111, 81, 0.4)'
              }}
            >
              <Sparkles size={18} />
              <span>Dish Ready! Finish Cooking</span>
            </button>
          )}
        </div>

        {/* Step dots navigation */}
        <div style={{ display: 'flex', gap: '0.45rem', marginTop: '2.5rem' }}>
          {recipe.instructions.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentStep(i)}
              style={{
                width: i === currentStep ? '28px' : '10px',
                height: '10px',
                borderRadius: 'var(--radius-full)',
                background:
                  i === currentStep
                    ? '#52B788'
                    : completedSteps[i]
                    ? 'rgba(42, 157, 143, 0.5)'
                    : 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.25s ease'
              }}
              title={`Jump to step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

