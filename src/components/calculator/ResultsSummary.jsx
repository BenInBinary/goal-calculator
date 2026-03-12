"use client";

import { Calendar, Clock, Trophy } from "lucide-react";

export default function ResultsSummary({ months, goal, currentBalance }) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let timeString = "";
  if (years > 0) {
    timeString += `${years} year${years > 1 ? 's' : ''}`;
  }
  if (remainingMonths > 0) {
    if (timeString) timeString += " and ";
    timeString += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  }
  if (months === 0) {
    timeString = "0 months";
  }

  const isAchieved = currentBalance >= goal && goal > 0;
  
  if (months > 1200) {
    return (
       <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm dark:border-red-900/50 dark:bg-red-900/20">
         <p className="text-red-600 dark:text-red-400 font-medium">It will take more than 100 years to reach your goal. Consider increasing your contributions.</p>
       </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all duration-500 ${isAchieved ? 'border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/20' : 'border-indigo-100 bg-indigo-50/50 dark:border-indigo-900/30 dark:bg-indigo-900/10'}`}>
      
      <div className="absolute -right-4 -top-4 opacity-10">
        <Trophy className="h-24 w-24 text-indigo-600 dark:text-indigo-400" />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${isAchieved ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'}`}>
          {isAchieved ? <Trophy className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {isAchieved ? "Goal Achieved!" : "Time to Reach Goal"}
          </h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {timeString}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
             <Calendar className="h-4 w-4" />
             {months} total months
          </p>
        </div>
      </div>
    </div>
  );
}
