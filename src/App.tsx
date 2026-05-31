import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'



export const createConverter = (
  fromUnit: string,
  toUnit: string
) => {
  return (value: number): number => {
    if (fromUnit === "lb" && toUnit === "kg") return value * 0.453592;
    if (fromUnit === "kg" && toUnit === "lb") return value * 2.20462;

    if (fromUnit === "mi" && toUnit === "km") return value * 1.60934;
    if (fromUnit === "km" && toUnit === "mi") return value * 0.621371;

    if (fromUnit === "c" && toUnit === "f") return (value * 9) / 5 + 32;
    if (fromUnit === "f" && toUnit === "c") return ((value - 32) * 5) / 9;

    return value;
  };
};

// ✅ App.tsx with proper TypeScript types
export default function App() {
  const [value, setValue] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<string>("lb");
  const [toUnit, setToUnit] = useState<string>("kg");
  const [result, setResult] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Weight");
  const categories: string[] = ["Weight", "Distance", "Temperature"];
  const unitOptions: Record<string, string[]> = {
    Weight: ["lb", "kg"],
    Distance: ["mi", "km"],
    Temperature: ["c", "f"],
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const units = unitOptions[category];
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setResult(null);
  };

  const handleConvert = () => {
    const converter = createConverter(fromUnit, toUnit);
    setResult(converter(Number(value)));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="sticky top-0 border-b border-slate-800 bg-slate-950/90 px-6 py-4">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-cyan-400">
            Unit Converter
          </h1>
          <div className="flex gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl font-semibold transition ${
                  activeCategory === cat
                    ? "bg-cyan-400 text-slate-900"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-xl p-6">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-6">
            {activeCategory} Converter
          </h2>

          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full p-3 mb-4 rounded-lg bg-slate-950 border border-slate-700"
            placeholder="Enter value"
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="p-2 rounded-lg bg-slate-800"
            >
              {unitOptions[activeCategory].map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>


            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="p-2 rounded-lg bg-slate-800"
            >
              {unitOptions[activeCategory].map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-cyan-400 text-slate-900 py-2 rounded-lg font-semibold hover:opacity-90"
          >
            Convert
          </button>

          {result !== null && (
            <div className="mt-6 text-center">
              <p className="text-slate-400">Result</p>
              <p className="text-2xl font-bold">
                {result.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
