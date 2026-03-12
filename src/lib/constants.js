/**
 * Application-wide constants
 */

export const CALCULATOR_DEFAULTS = {
  GOAL: 10000,
  INITIAL_BALANCE: 0,
  MONTHLY_CONTRIBUTION: 500,
  INTEREST_RATE: 5.0,
  INTEREST_TYPE: 'yearly',        // 'yearly' | 'monthly'
  COMPOUNDING_PERIOD: 12,         // For yearly: every N months (1,3,6,12). For monthly: 1 always.
};

export const ALGORITHM_LIMITS = {
  MAX_MONTHS: 1200, // 100 years max to prevent infinite loops
  MAX_DATA_POINTS: 100, // Strict limit for charting performance
};

/**
 * Real-world compounding frequency options for YEARLY interest rates.
 * 
 * Examples:
 *  - "Monthly"   → bank savings accounts, most mutual funds
 *  - "Quarterly" → many fixed deposits (FDs) in India, some bonds
 *  - "Semi-Annual" → government bonds (NSC, PPF payout cycles), some corporate bonds
 *  - "Annually"  → traditional NSC, some insurance-linked investment plans
 */
export const YEARLY_COMPOUNDING_OPTIONS = [
  { value: 1,  label: 'Monthly (every 1 month)',      description: 'Savings accounts, SIPs, most mutual funds' },
  { value: 3,  label: 'Quarterly (every 3 months)',   description: 'Fixed Deposits, NPS, many equity funds' },
  { value: 6,  label: 'Semi-Annual (every 6 months)', description: 'Government bonds, NSC, some corporate bonds' },
  { value: 12, label: 'Annually (every 12 months)',   description: 'PPF, traditional insurance plans, LIC policies' },
];

/**
 * Real-world compounding frequency options for MONTHLY interest rates.
 * When the rate itself is monthly, interest is credited on the chosen cycle.
 *
 * Examples:
 *  - "Every Month"      → microfinance loans, chit funds, monthly income plans
 *  - "Every 3 Months"   → some RD (Recurring Deposit) quarterly payout schemes
 *  - "Every 6 Months"   → semi-annual payout MIS (Monthly Income Scheme) variants
 */
export const MONTHLY_COMPOUNDING_OPTIONS = [
  { value: 1, label: 'Every Month (monthly)',          description: 'Microfinance, chit funds, monthly income plans' },
  { value: 3, label: 'Every 3 Months (quarterly)',     description: 'Recurring Deposits quarterly payout, some ULIPs' },
  { value: 6, label: 'Every 6 Months (semi-annual)',   description: 'Post Office MIS, semi-annual dividend funds' },
];
