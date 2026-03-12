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
 * Calculates the effective per-period interest rate based on the compounding config.
 *
 * Real-world patterns supported:
 *
 *  ┌─────────────────────────────────────────────────────────────────────────┐
 *  │ YEARLY interest rate (e.g. 12% p.a.)                                   │
 *  │                                                                         │
 *  │  compoundingPeriodMonths=1  → Monthly compounding (banks, mutual funds) │
 *  │    effectiveRate = 12% / 12 = 1% per month                             │
 *  │                                                                         │
 *  │  compoundingPeriodMonths=3  → Quarterly compounding (FDs, NPS)          │
 *  │    effectiveRate = 12% / 4 = 3% per quarter                            │
 *  │                                                                         │
 *  │  compoundingPeriodMonths=6  → Semi-annual (gov bonds, NSC)              │
 *  │    effectiveRate = 12% / 2 = 6% per half-year                          │
 *  │                                                                         │
 *  │  compoundingPeriodMonths=12 → Annual compounding (PPF, LIC)             │
 *  │    effectiveRate = 12% / 1 = 12% per year                              │
 *  └─────────────────────────────────────────────────────────────────────────┘
 *
 *  ┌─────────────────────────────────────────────────────────────────────────┐
 *  │ MONTHLY interest rate (e.g. 1.5% per month)                            │
 *  │                                                                         │
 *  │  compoundingPeriodMonths=1  → Credited each month (chit funds, MIP)     │
 *  │    effectiveRate = 1.5% per month                                       │
 *  │                                                                         │
 *  │  compoundingPeriodMonths=3  → Credited every 3 months (quarterly RD)    │
 *  │    effectiveRate = 1.5% × 3 = 4.5% per quarter                        │
 *  │                                                                         │
 *  │  compoundingPeriodMonths=6  → Credited every 6 months (Post Office MIS) │
 *  │    effectiveRate = 1.5% × 6 = 9% per half-year                        │
 *  └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {number} interestRate - The stated rate (annual or monthly, as a %)
 * @param {'yearly'|'monthly'} interestType - Whether the rate is annual or monthly
 * @param {number} compoundingPeriodMonths - How often interest is compounded/credited (in months)
 * @returns {number} Effective rate per compounding period (as a decimal, e.g. 0.03 for 3%)
 */
export function getEffectiveRate(interestRate, interestType, compoundingPeriodMonths) {
  const rate = interestRate / 100;

  if (interestType === 'yearly') {
    // Annual rate ÷ (12 / compoundingPeriod) = rate per compounding period
    const periodsPerYear = 12 / compoundingPeriodMonths;
    return rate / periodsPerYear;
  } else {
    // Monthly rate × compoundingPeriodMonths = rate per compounding period
    return rate * compoundingPeriodMonths;
  }
}

/**
 * Calculates the number of months required to reach a financial goal,
 * and generates a performance-optimized data array for visualization.
 *
 * Supports both yearly and monthly interest rates, with configurable
 * compounding periods (e.g. every 1, 3, 6, or 12 months).
 *
 * Uses an exact decimation algorithm to guarantee the chart never receives
 * more than ALGORITHM_LIMITS.MAX_DATA_POINTS, ensuring O(1) rendering cost
 * regardless of the time horizon (1 year vs 100 years).
 *
 * @param {number} targetGoal - Target financial amount
 * @param {number} monthlyContribution - Amount added each month (Principal)
 * @param {number} interestRate - Interest rate percentage (annual or monthly, see interestType)
 * @param {number} [initialBalance=0] - Starting balance
 * @param {'yearly'|'monthly'} [interestType='yearly'] - Whether the stated rate is yearly or monthly
 * @param {number} [compoundingPeriodMonths=1] - How often interest compounds/credits (in months)
 * @returns {GoalProjectionResult} Object containing months required and projection data array
 */
export function calculateGoalProjection(
  targetGoal,
  monthlyContribution,
  interestRate,
  initialBalance = 0,
  interestType = 'yearly',
  compoundingPeriodMonths = 1
) {
  if (targetGoal <= 0 || monthlyContribution <= 0) {
    return { months: 0, data: [] };
  }

  const effectiveRate = getEffectiveRate(interestRate, interestType, compoundingPeriodMonths);
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

  // Iterative compound calculation with system safety limits.
  // Interest is only applied at the END of each compounding period.
  while (currentBalance < targetGoal && elapsedMonths < ALGORITHM_LIMITS.MAX_MONTHS) {
    elapsedMonths++;

    // Add monthly contribution every month
    currentBalance += monthlyContribution;
    accumulatedContributions += monthlyContribution;

    // Apply interest only at the end of each compounding period
    const isCompoundingMonth = elapsedMonths % compoundingPeriodMonths === 0;
    if (isCompoundingMonth) {
      const periodInterest = currentBalance * effectiveRate;
      currentBalance += periodInterest;
      accumulatedInterest += periodInterest;
    }

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
    if (i === 0 || i === totalPoints - 1 || i % step === 0) {
      decimatedData.push(rawData[i]);
    }
  }

  return { months: elapsedMonths, data: decimatedData };
}
