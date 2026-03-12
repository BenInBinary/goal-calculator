import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ALGORITHM_LIMITS } from "./constants";

/**
 * Utility for merging Tailwind CSS classes safely
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * @typedef {Object} ProjectionDataPoint
 * @property {number} month - The month number (0 is initial state)
 * @property {number} balance - Total balance (contributions + interest)
 * @property {number} accumulatedContributions - Total principal contributed to date
 * @property {number} accumulatedInterest - Total compound interest earned to date
 */

/**
 * @typedef {Object} GoalProjectionResult
 * @property {number} months - The total number of months required to reach the goal
 * @property {ProjectionDataPoint[]} data - Decimated array of data points optimized for charting performance
 */

/**
 * Calculates the number of months required to reach a financial goal,
 * and generates a performance-optimized data array for visualization.
 * 
 * Assumes monthly compounding (common in savings/mutual funds).
 * Formula: future value iteration.
 * 
 * Uses an exact decimation algorithm to guarantee the chart never receives 
 * more than ALGORITHM_LIMITS.MAX_DATA_POINTS, ensuring O(1) rendering cost 
 * regardless of the time horizon (1 year vs 100 years).
 * 
 * @param {number} targetGoal - Target financial amount
 * @param {number} monthlyContribution - Amount added each month (Principal)
 * @param {number} annualInterestRate - Annual interest rate percentage (e.g., 5.0 for 5%)
 * @param {number} [initialBalance=0] - Starting balance
 * @returns {GoalProjectionResult} Object containing months required and projection data array
 */
export function calculateGoalProjection(targetGoal, monthlyContribution, annualInterestRate, initialBalance = 0) {
  if (targetGoal <= 0 || monthlyContribution <= 0) {
    return { months: 0, data: [] };
  }

  const monthlyRate = (annualInterestRate / 100) / 12;
  const rawData = [];
  
  let currentBalance = initialBalance;
  let accumulatedContributions = initialBalance;
  let accumulatedInterest = 0;
  let elapsedMonths = 0;

  rawData.push({
    month: 0,
    balance: Math.round(currentBalance),
    accumulatedContributions: Math.round(accumulatedContributions),
    accumulatedInterest: Math.round(accumulatedInterest),
  });

  // Iterative compound calculation with system safety limits
  while (currentBalance < targetGoal && elapsedMonths < ALGORITHM_LIMITS.MAX_MONTHS) {
    elapsedMonths++;
    
    currentBalance += monthlyContribution;
    accumulatedContributions += monthlyContribution;
    
    const monthlyInterest = currentBalance * monthlyRate;
    currentBalance += monthlyInterest;
    accumulatedInterest += monthlyInterest;

    rawData.push({
      month: elapsedMonths,
      balance: Math.round(currentBalance),
      accumulatedContributions: Math.round(accumulatedContributions),
      accumulatedInterest: Math.round(accumulatedInterest),
    });
  }

  // Decimation Algorithm (Systems Thinking):
  // Reduce massive arrays to a fixed maximum length for charting performance.
  // We always keep the first and last points for exact start/end representation.
  const totalPoints = rawData.length;
  if (totalPoints <= ALGORITHM_LIMITS.MAX_DATA_POINTS) {
    return { months: elapsedMonths, data: rawData };
  }

  const step = Math.ceil(totalPoints / ALGORITHM_LIMITS.MAX_DATA_POINTS);
  const decimatedData = [];

  for (let i = 0; i < totalPoints; i++) {
    // Keep first point, last point, and evenly distributed steps
    if (i === 0 || i === totalPoints - 1 || i % step === 0) {
      decimatedData.push(rawData[i]);
    }
  }

  return { months: elapsedMonths, data: decimatedData };
}
