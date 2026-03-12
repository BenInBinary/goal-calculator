"use client";

import { DollarSign, Percent, Calendar, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  YEARLY_COMPOUNDING_OPTIONS,
  MONTHLY_COMPOUNDING_OPTIONS,
} from "@/lib/constants";

export default function CalculatorForm({ setters, state }) {
  const { goal, initialBalance, contribution, interestRate, interestType, compoundingPeriod } = state;
  const { setGoal, setInitialBalance, setContribution, setInterestRate, setInterestType, setCompoundingPeriod } = setters;

  const isYearly = interestType === "yearly";
  const compoundingOptions = isYearly ? YEARLY_COMPOUNDING_OPTIONS : MONTHLY_COMPOUNDING_OPTIONS;

  // Find description for the currently selected compounding period
  const selectedOption = compoundingOptions.find(
    (opt) => opt.value === Number(compoundingPeriod)
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">

        <Input
          id="goal"
          label="Financial Goal"
          icon={DollarSign}
          placeholder="10000"
          value={goal || ""}
          onChange={(e) => setGoal(e.target.value)}
          min="0"
          type="number"
        />

        <Input
          id="initialBalance"
          label="Initial Balance (Optional)"
          icon={DollarSign}
          placeholder="0"
          value={initialBalance || ""}
          onChange={(e) => setInitialBalance(e.target.value)}
          min="0"
          type="number"
        />

        <Input
          id="contribution"
          label="Monthly Contribution"
          icon={DollarSign}
          placeholder="500"
          value={contribution || ""}
          onChange={(e) => setContribution(e.target.value)}
          min="0"
          type="number"
        />

        {/* ── Interest Rate Section ────────────────────────────── */}
        <div className="rounded-lg border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 p-4 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            Interest Rate Settings
          </p>

          {/* Toggle: Yearly vs Monthly */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interest Rate Type
            </label>
            <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-700 w-fit">
              <button
                type="button"
                id="interestType-yearly"
                onClick={() => setInterestType("yearly")}
                className={`px-5 py-2 text-sm font-medium transition-colors ${
                  isYearly
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                Yearly (p.a.)
              </button>
              <button
                type="button"
                id="interestType-monthly"
                onClick={() => setInterestType("monthly")}
                className={`px-5 py-2 text-sm font-medium transition-colors ${
                  !isYearly
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                Monthly (p.m.)
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {isYearly
                ? "Annual rates (p.a.) — e.g. 8% bank FD, 12% equity fund"
                : "Monthly rates (p.m.) — e.g. 1.5% chit fund, 1% microfinance"}
            </p>
          </div>

          {/* Interest Rate Input */}
          <Input
            id="interestRate"
            label={isYearly ? "Annual Interest Rate (% p.a.)" : "Monthly Interest Rate (% p.m.)"}
            icon={Percent}
            placeholder={isYearly ? "8.0" : "1.5"}
            value={interestRate || ""}
            onChange={(e) => setInterestRate(e.target.value)}
            step="0.1"
            type="number"
            min="0"
          />

          {/* Compounding Period Selector */}
          <div>
            <Select
              id="compoundingPeriod"
              label={isYearly ? "Interest Compounded / Credited Every" : "Interest Credited Every"}
              icon={Calendar}
              options={compoundingOptions}
              value={compoundingPeriod}
              onChange={(e) => setCompoundingPeriod(e.target.value)}
            />
            {selectedOption && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">Real-world examples: </span>
                {selectedOption.description}
              </p>
            )}
          </div>
        </div>
        {/* ── End Interest Rate Section ────────────────────────── */}

      </div>
    </div>
  );
}
