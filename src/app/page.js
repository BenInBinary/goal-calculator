"use client";

import CalculatorForm from "@/components/calculator/CalculatorForm";
import ResultsSummary from "@/components/calculator/ResultsSummary";
import ProjectionChart from "@/components/calculator/ProjectionChart";
import { useGoalCalculator } from "@/hooks/useGoalCalculator";
import { Target } from "lucide-react";

export default function Home() {
  const { state, setters, projection } = useGoalCalculator();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Premium Header */}
      <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Goal Tracker
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="mb-8">
           <h2 className="text-3xl font-extrabold tracking-tight">Plan Your Future</h2>
           <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Calculate exactly how many months it will take to reach your financial goal based on your monthly contributions and expected return.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-indigo-100/20 dark:shadow-none border border-gray-100 dark:border-gray-800 p-6 md:p-8">
               <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                 Your Parameters
               </h3>
               <CalculatorForm 
                  state={state}
                  setters={setters}
               />
            </div>
          </div>

          {/* Right Column: Results & Chart */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            <ResultsSummary 
              months={projection.months} 
              goal={state.goal} 
              currentBalance={projection.data.length > 0 ? projection.data[projection.data.length - 1].balance : 0} 
            />

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-indigo-100/20 dark:shadow-none border border-gray-100 dark:border-gray-800 p-6 md:p-8 flex-grow">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Growth Projection</h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                    Interactive timeline
                  </div>
               </div>
               
               <ProjectionChart data={projection.data} />
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
