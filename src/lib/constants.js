/**
 * Application-wide constants
 */

export const CALCULATOR_DEFAULTS = {
  GOAL: 10000,
  INITIAL_BALANCE: 0,
  MONTHLY_CONTRIBUTION: 500,
  INTEREST_RATE: 5.0,
};

export const ALGORITHM_LIMITS = {
  MAX_MONTHS: 1200, // 100 years max to prevent infinite loops
  MAX_DATA_POINTS: 100, // Strict limit for charting performance
};
