import { useState, useMemo, useCallback } from "react";
import { calculateGoalProjection } from "@/lib/utils";
import { CALCULATOR_DEFAULTS } from "@/lib/constants";

export function useGoalCalculator() {
  const [goal, setGoalState] = useState(CALCULATOR_DEFAULTS.GOAL);
  const [initialBalance, setInitialBalanceState] = useState(CALCULATOR_DEFAULTS.INITIAL_BALANCE);
  const [contribution, setContributionState] = useState(CALCULATOR_DEFAULTS.MONTHLY_CONTRIBUTION);
  const [interestRate, setInterestRateState] = useState(CALCULATOR_DEFAULTS.INTEREST_RATE);
  const [interestType, setInterestTypeState] = useState(CALCULATOR_DEFAULTS.INTEREST_TYPE);
  const [compoundingPeriod, setCompoundingPeriodState] = useState(CALCULATOR_DEFAULTS.COMPOUNDING_PERIOD);

  const setGoal = useCallback((val) => setGoalState(Math.max(0, Number(val) || 0)), []);
  const setInitialBalance = useCallback((val) => setInitialBalanceState(Math.max(0, Number(val) || 0)), []);
  const setContribution = useCallback((val) => setContributionState(Math.max(0, Number(val) || 0)), []);
  const setInterestRate = useCallback((val) => setInterestRateState(Number(val) || 0), []);

  // When switching interest type, reset compoundingPeriod to a sensible default
  const setInterestType = useCallback((val) => {
    setInterestTypeState(val);
    // Yearly defaults to quarterly (3), monthly defaults to monthly (1)
    setCompoundingPeriodState(val === 'yearly' ? 12 : 1);
  }, []);

  const setCompoundingPeriod = useCallback((val) => setCompoundingPeriodState(Number(val)), []);

  const projection = useMemo(() => {
    return calculateGoalProjection(
      goal,
      contribution,
      interestRate,
      initialBalance,
      interestType,
      compoundingPeriod
    );
  }, [goal, contribution, interestRate, initialBalance, interestType, compoundingPeriod]);

  return {
    state: {
      goal,
      initialBalance,
      contribution,
      interestRate,
      interestType,
      compoundingPeriod,
    },
    setters: {
      setGoal,
      setInitialBalance,
      setContribution,
      setInterestRate,
      setInterestType,
      setCompoundingPeriod,
    },
    projection
  };
}
