"use client";

import { DollarSign, Percent, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/Input";

export default function CalculatorForm({ setters, state }) {
  const { goal, initialBalance, contribution, interestRate } = state;
  const { setGoal, setInitialBalance, setContribution, setInterestRate } = setters;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        
        <Input
          id="goal"
          label="Financial Goal"
          icon={DollarSign}
          placeholder="10000"
          value={goal || ''}
          onChange={(e) => setGoal(e.target.value)}
          min="0"
        />

        <Input
          id="initialBalance"
          label="Initial Balance (Optional)"
          icon={DollarSign}
          placeholder="0"
          value={initialBalance || ''}
          onChange={(e) => setInitialBalance(e.target.value)}
          min="0"
        />

        <Input
          id="contribution"
          label="Monthly Contribution"
          icon={TrendingUp}
          placeholder="500"
          value={contribution || ''}
          onChange={(e) => setContribution(e.target.value)}
          min="0"
        />

        <Input
          id="interestRate"
          label="Annual Interest Rate (%)"
          icon={Percent}
          placeholder="5.0"
          value={interestRate || ''}
          onChange={(e) => setInterestRate(e.target.value)}
          step="0.1"
        />

      </div>
    </div>
  );
}
