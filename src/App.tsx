import { useState } from 'react'
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

export default function App() {
  const [value, setValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("lb");
  const [toUnit, setToUnit] = useState<string>("kg");

  // ✅ result is now an array
  const [result, setResult] = useState<number[] | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>("Weight");

  const categories = ["Weight", "Distance", "Temperature"];

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

    // ✅ split input into array
    const values = value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "")
      .map((v) => Number(v));

    // ✅ convert each value
    const results = values.map((v) =>
      isNaN(v) ? NaN : converter(v)
    );

    setResult(results);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* NAV */}
      <nav className="sticky top-0 backdrop-blur-md bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Unit Converter
          </h1>

          <div className="flex gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full transition ${
                  activeCategory === cat
                    ? "bg-cyan-400 text-slate-900 scale-105"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-4xl font-bold text-center mb-8">
            {activeCategory} Converter
          </h2>

          {/* INPUT */}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter numbers (e.g. 1, 2, 3)"
            className="w-full p-4 mb-6 text-lg rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* SELECTS */}
          <div className="grid grid-cols-2 gap-4 mb-6">

            {/* FROM */}
            <select
              value={fromUnit}
              onChange={(e) => {
                const newFrom = e.target.value;
                setFromUnit(newFrom);

                if (newFrom === toUnit) {
                  const options = unitOptions[activeCategory];
                  const other = options.find((u) => u !== newFrom);
                  if (other) setToUnit(other);
                }
              }}
              className="p-3 rounded-xl bg-black/30 border border-white/10"
            >
              {unitOptions[activeCategory].map((unit) => (
                <option key={unit} value={unit}>
                  {unit.toUpperCase()}
                </option>
              ))}
            </select>

            {/* TO */}
            <select
              value={toUnit}
              onChange={(e) => {
                const newTo = e.target.value;
                setToUnit(newTo);

                if (newTo === fromUnit) {
                  const options = unitOptions[activeCategory];
                  const other = options.find((u) => u !== newTo);
                  if (other) setFromUnit(other);
                }
              }}
              className="p-3 rounded-xl bg-black/30 border border-white/10"
            >
              {unitOptions[activeCategory].map((unit) => (
                <option key={unit} value={unit}>
                  {unit.toUpperCase()}
                </option>
              ))}
            </select>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleConvert}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 py-3 rounded-xl font-bold hover:scale-[1.02] transition"
          >
            Convert
          </button>

          {/* RESULT */}
          {result !== null && (
            <div className="mt-8 text-center space-y-2">
              <p className="text-sm text-slate-400">Results</p>

              {result.map((r, i) => (
                <p key={i} className="text-xl font-bold text-cyan-400">
                  {isNaN(r) ? "Invalid input" : r.toFixed(2)}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}