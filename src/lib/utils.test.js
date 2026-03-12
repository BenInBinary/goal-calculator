import { describe, it, expect } from 'vitest';
import { calculateGoalProjection } from './utils';

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
    // Goal: 1000, Contribution: 100, Interest: 0
    // Should take exactly 10 months
    const result = calculateGoalProjection(1000, 100, 0);
    expect(result.months).toBe(10);
    // The final balance should be exactly 1000
    expect(result.data[result.data.length - 1].balance).toBe(1000);
  });

  it('should factor in initial balance correctly', () => {
    // Goal: 1000, Contribution: 100, Interest: 0, Initial Balance: 500
    // Should take 5 months
    const result = calculateGoalProjection(1000, 100, 0, 500);
    expect(result.months).toBe(5);
  });

  it('should reach goals faster with positive interest', () => {
    // Goal: 10000, Contribution: 500
    const noInterestResult = calculateGoalProjection(10000, 500, 0);
    const withInterestResult = calculateGoalProjection(10000, 500, 10);
    
    // With 10% interest, it should take fewer months than 0% interest
    expect(withInterestResult.months).toBeLessThan(noInterestResult.months);
  });

  it('should enforce the maximum month safety limit', () => {
    // Goal: 1,000,000, Contribution: 1, Interest: 0
    // Would normally take 1M months, should cut off at 1200
    const result = calculateGoalProjection(1000000, 1, 0, 0);
    expect(result.months).toBe(1200);
  });
});
