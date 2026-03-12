# Goal Months Calculator

A clean, responsive Next.js UI with real-time updates and performant charting tailored for the **NeuralfinAI** philosophy: *making personal finance radically simpler*.

## Quick Demo Scenarios
- Goal: $10,000 | Monthly: $500 | Rate: 5% → **1 year and 8 months** (20 total months)
- Goal: $500,000 | Monthly: $15,000 | Rate: 7% → **2 years and 4 months** (28 total months)
- Goal: $2,000,000 | Monthly: $20,000 | Rate: 10% → **5 years and 8 months** (68 total months)

*(Try these live in the application!)*

---

## 🏗️ Core Architecture (System Alignment)

### 1. Clear Communicators 
- **Domain-Driven Naming:** Variables (`accumulatedContributions`, `accumulatedInterest`) explicitly define financial math logic.
- **Strict Typing:** The core engine (`utils.js`) utilizes comprehensive JSDoc annotations outlining exact input/output contracts.
- **Separation of Concerns:** Business logic lives entirely inside a custom `useGoalCalculator` hook, keeping the React UI exclusively focused on presentation.

### 2. Detail-Oriented Builders
- **Invalid State Guards:** The calculation hook actively prevents negative/NaN inputs, maintaining a valid mathematical state rather than silently failing.
- **Maximum Threshold Safeties:** Financial math loops can crash browsers given an unachievable goal. A strict `MAX_MONTHS` cutoff (100 years max) protects the event loop.
- **Accessible UI Basics:** Inputs include proper `id` and `htmlFor` labeling for keyboard navigation and screen readers.

### 3. Systems Thinkers
- **O(1) Data Decimation:** Drawing 1,200 SVG points freezes modern charting widgets. I built an exact **decimation algorithm** returning a strictly capped array of plottable points, ensuring visually perfect curves and O(1) rendering time, regardless of whether a goal takes 10 years or 100 years.
- **Decoupled Math Engine:** The compounding interest calculation (`calculateGoalProjection`) is a pure JS function totally decoupled from React—it actively *assumes monthly compounding (common in savings/mutual funds)* through future value iteration.

### 4. People of Action
- **Testing over Trusting:** The core math logic has full internal test coverage. Execute tests rapidly using `npm run test` (Vitest).
- **Speed to Value:** Built leveraging Next.js App Router for immediate start-up times. Instant calculation reacts dynamically on input change with zero UI lag.

---

## 🚀 How to Run & Verify

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start the Application:**
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) in your browser.*
   
3. **Run the Math Engine Tests:**
   ```bash
   npm run test
   ```
