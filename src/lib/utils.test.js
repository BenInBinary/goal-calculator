import { describe, it, expect } from 'vitest';
import { calculateGoalProjection, getEffectiveRate } from './utils';

// ─── getEffectiveRate ────────────────────────────────────────────────────────

describe('getEffectiveRate', () => {
  it('yearly 12% compounded monthly → 1% per month', () => {
    expect(getEffectiveRate(12, 'yearly', 1)).toBeCloseTo(0.01);
  });

  it('yearly 12% compounded quarterly → 3% per quarter', () => {
    expect(getEffectiveRate(12, 'yearly', 3)).toBeCloseTo(0.03);
  });

  it('yearly 12% compounded semi-annually → 6% per half-year', () => {
    expect(getEffectiveRate(12, 'yearly', 6)).toBeCloseTo(0.06);
  });

  it('yearly 12% compounded annually → 12% per year', () => {
    expect(getEffectiveRate(12, 'yearly', 12)).toBeCloseTo(0.12);
  });

  it('monthly 1.5% credited monthly → 1.5% per month', () => {
    expect(getEffectiveRate(1.5, 'monthly', 1)).toBeCloseTo(0.015);
  });

  it('monthly 1.5% credited every 3 months → 4.5% per quarter', () => {
    expect(getEffectiveRate(1.5, 'monthly', 3)).toBeCloseTo(0.045);
  });

  it('monthly 1.5% credited every 6 months → 9% per half-year', () => {
    expect(getEffectiveRate(1.5, 'monthly', 6)).toBeCloseTo(0.09);
  });
});

// ─── calculateGoalProjection (existing tests, backward-compatible) ────────────

describe('calculateGoalProjection', () => {
  it('should calculate 0 months for 0 or negative goal', () => {
    const result = calculateGoalProjection(0, 500, 5);
    expect(result.months).toBe(0);
    expect(result.data).toEqual([]);
  });

  it('should calculate 0 months for 0 or negative contribution', () => {
    const result = calculateGoalProjection(10000, 0, 5);
    expect(result.months).toBe(0);
    expect(result.data).toEqual([]);
  });

  it('should calculate months correctly with zero interest', () => {
    // Goal: 1000, Contribution: 100, Interest: 0 → exactly 10 months
    const result = calculateGoalProjection(1000, 100, 0);
    expect(result.months).toBe(10);
    expect(result.data[result.data.length - 1].balance).toBe(1000);
  });

  it('should factor in initial balance correctly', () => {
    // Goal: 1000, Contribution: 100, Interest: 0, Initial Balance: 500 → 5 months
    const result = calculateGoalProjection(1000, 100, 0, 500);
    expect(result.months).toBe(5);
  });

  it('should reach goals faster with positive interest', () => {
    const noInterestResult = calculateGoalProjection(10000, 500, 0);
    const withInterestResult = calculateGoalProjection(10000, 500, 10);
    expect(withInterestResult.months).toBeLessThan(noInterestResult.months);
  });

  it('should enforce the maximum month safety limit', () => {
    const result = calculateGoalProjection(1000000, 1, 0, 0);
    expect(result.months).toBe(1200);
  });
});

// ─── Monthly interest type tests ──────────────────────────────────────────────

describe('calculateGoalProjection — monthly interest type', () => {
  it('monthly 1% rate credited monthly should reach goal faster than 0% interest', () => {
    const noInterest = calculateGoalProjection(10000, 500, 0, 0, 'monthly', 1);
    const withInterest = calculateGoalProjection(10000, 500, 1, 0, 'monthly', 1);
    expect(withInterest.months).toBeLessThan(noInterest.months);
  });

  it('more frequent compounding should reach goal faster than less frequent', () => {
    // Same annual rate of 12%, but compounded monthly vs annually
    const monthly = calculateGoalProjection(50000, 500, 12, 0, 'yearly', 1);
    const annual  = calculateGoalProjection(50000, 500, 12, 0, 'yearly', 12);
    expect(monthly.months).toBeLessThan(annual.months);
  });

  it('monthly 1% credited quarterly should take same or fewer months than 0% interest', () => {
    const noInterest    = calculateGoalProjection(5000, 200, 0, 0, 'monthly', 3);
    const withInterest  = calculateGoalProjection(5000, 200, 1, 0, 'monthly', 3);
    expect(withInterest.months).toBeLessThanOrEqual(noInterest.months);
  });

  it('data points should start at month 0 and include balance for initial state', () => {
    const result = calculateGoalProjection(5000, 200, 5, 1000, 'yearly', 1);
    expect(result.data[0].month).toBe(0);
    expect(result.data[0].balance).toBe(1000);
    expect(result.data[0].accumulatedInterest).toBe(0);
  });
});
