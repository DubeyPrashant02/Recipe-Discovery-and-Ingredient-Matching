import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MatchProgress({ match, showCounts = true, compact = false }) {
  const { matchPercentage, availableCount, missingCount, totalRequired, isFullMatch } = match;

  // Determine color theme based on score
  let statusClass = 'low';
  if (matchPercentage >= 70) {
    statusClass = 'high';
  } else if (matchPercentage >= 35) {
    statusClass = 'med';
  }

  return (
    <div className={`match-section ${compact ? 'compact' : ''}`}>
      <div className="match-header">
        <span className="match-label">
          <Sparkles size={14} color={isFullMatch ? '#2A9D8F' : 'var(--olive-600)'} />
          Ingredient Match
        </span>
        <span className={`match-percent-val ${statusClass}`}>
          {matchPercentage}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="progress-track">
        <div
          className={`progress-fill ${statusClass}`}
          style={{ width: `${Math.min(matchPercentage, 100)}%` }}
        />
      </div>

      {/* Available / Missing Counter Row */}
      {showCounts && (
        <div className="match-counts-row">
          <span className="count-badge-good">
            ✓ {availableCount} of {totalRequired} available
          </span>
          {missingCount > 0 ? (
            <span className="count-badge-missing">
              ✕ {missingCount} missing
            </span>
          ) : (
            <span className="count-badge-good" style={{ color: '#2A9D8F' }}>
              All ingredients ready!
            </span>
          )}
        </div>
      )}
    </div>
  );
}

