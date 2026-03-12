import { useState, useMemo, useCallback } from "react";
import { calculateGoalProjection } from "@/lib/utils";
import { CALCULATOR_DEFAULTS } from "@/lib/constants";

export function useGoalCalculator() {
  const [goal, setGoalState] = useState(CALCULATOR_DEFAULTS.GOAL);
  const [initialBalance, setInitialBalanceState] = useState(CALCULATOR_DEFAULTS.INITIAL_BALANCE);
  const [contribution, setContributionState] = useState(CALCULATOR_DEFAULTS.MONTHLY_CONTRIBUTION);
  const [interestRate, setInterestRateState] = useState(CALCULATOR_DEFAULTS.INTEREST_RATE);

  const setGoal = useCallback((val) => setGoalState(Math.max(0, Number(val) || 0)), []);
  const setInitialBalance = useCallback((val) => setInitialBalanceState(Math.max(0, Number(val) || 0)), []);
  const setContribution = useCallback((val) => setContributionState(Math.max(0, Number(val) || 0)), []);
  const setInterestRate = useCallback((val) => setInterestRateState(Number(val) || 0), []);

  const projection = useMemo(() => {
    return calculateGoalProjection(goal, contribution, interestRate, initialBalance);
  }, [goal, contribution, interestRate, initialBalance]);

  return {
    state: {
      goal,
      initialBalance,
      contribution,
      interestRate
    },
    setters: {
      setGoal,
      setInitialBalance,
      setContribution,
      setInterestRate
    },
    projection
  };
}
