/*

Name: Jireh Agbozo
Date: May 30, 2026

Program Description:
This program is a responsive unit converter website
built using React, TypeScript, Vite, and Tailwind CSS which are our core stack we are studying this semester in web development.
The application allows users to convert between metric
and imperial units for weight, distance, and temperature.
Users can convert both single numerical values and lists
of values separated by commas. The program uses a
higher-order function that returns arrow functions
to perform all unit conversions dynamically.

*/

import { useState } from "react";

type Category = "Weight" | "Distance" | "Temperature";

type ConversionOption = {
  label: string;
  fromUnit: string;
  toUnit: string;
};

const conversionOptions: Record<Category, ConversionOption[]> = {
  Weight: [
    {
      label: "Pounds to Kilograms",
      fromUnit: "lb",
      toUnit: "kg",
    },
    {
      label: "Kilograms to Pounds",
      fromUnit: "kg",
      toUnit: "lb",
    },
  ],

  Distance: [
    {
      label: "Miles to Kilometres",
      fromUnit: "mi",
      toUnit: "km",
    },
    {
      label: "Kilometres to Miles",
      fromUnit: "km",
      toUnit: "mi",
    },
  ],

  Temperature: [
    {
      label: "Celsius to Fahrenheit",
      fromUnit: "c",
      toUnit: "f",
    },
    {
      label: "Fahrenheit to Celsius",
      fromUnit: "f",
      toUnit: "c",
    },
  ],
};



// Higher-order conversion function
const createConverter = (fromUnit: string, toUnit: string) => {
  return (value: number): number => {
    // Weight conversions
    if (fromUnit === "lb" && toUnit === "kg") {
      return value * 0.453592;
    }

    if (fromUnit === "kg" && toUnit === "lb") {
      return value * 2.20462;
    }

    // Distance conversions
    if (fromUnit === "mi" && toUnit === "km") {
      return value * 1.60934;
    }

    if (fromUnit === "km" && toUnit === "mi") {
      return value * 0.621371;
    }

    //Temperature conversions
    if (fromUnit === "c" && toUnit === "f") {
      return (value * 9) / 5 + 32;
    }

    if (fromUnit === "f" && toUnit === "c") {
      return ((value - 32) * 5) / 9;
    }

    return value;
  };
};

function App() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("Weight");

  const [selectedOptionIndex, setSelectedOptionIndex] =
    useState<number>(0);

  const [singleValue, setSingleValue] =
    useState<string>("");

  const [listValues, setListValues] =
    useState<string>("");

  const [singleResult, setSingleResult] =
    useState<string>("");

  const [listResult, setListResult] =
    useState<string>("");

  const selectedOption =
    conversionOptions[activeCategory][selectedOptionIndex];

  // This is for handling navbar tab switching
  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);

    setSelectedOptionIndex(0);

    setSingleValue("");
    setListValues("");

    setSingleResult("");
    setListResult("");
  };

  // Converting a single value
  const convertSingleValue = () => {
    const numberValue = Number(singleValue);

    if (
      singleValue.trim() === "" ||
      Number.isNaN(numberValue)
    ) {
      setSingleResult("Please enter a valid number.");
      return;
    }

    const converter = createConverter(
      selectedOption.fromUnit,
      selectedOption.toUnit
    );

    const result = converter(numberValue).toFixed(2);

    setSingleResult(
      `${singleValue} ${selectedOption.fromUnit} = ${result} ${selectedOption.toUnit}`
    );
  };

  // Converting a list of values
  const convertListValues = () => {
    const values = listValues
      .split(",")
      .map((value) => Number(value.trim()));

    const hasInvalidValue = values.some((value) =>
      Number.isNaN(value)
    );

    if (
      listValues.trim() === "" ||
      hasInvalidValue
    ) {
      setListResult(
        "Please enter numbers separated by commas. Example: 5, 10, 15"
      );

      return;
    }

    const converter = createConverter(
      selectedOption.fromUnit,
      selectedOption.toUnit
    );

    const results = values.map((value) =>
      converter(value).toFixed(2)
    );

    setListResult(
      `[${results.join(", ")}] ${selectedOption.toUnit}`
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 px-6 py-4 shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="text-2xl font-bold text-cyan-400">
            Unit Converter
          </h1>

          <div className="flex flex-wrap justify-center gap-3">
            {(
              ["Weight", "Distance", "Temperature"] as Category[]
            ).map((category) => (
              <button
                key={category}
                onClick={() =>
                  handleCategoryChange(category)
                }
                className={`rounded-xl px-5 py-2 font-semibold transition ${
                  activeCategory === category
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
          
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold md:text-5xl">
              {activeCategory} Converter
            </h2>

            <p className="mt-3 text-slate-300">
              Convert single values or lists of values
              between metric and imperial units.
            </p>
          </header>

          
          <section className="mb-8">
            <label className="mb-2 block text-lg font-semibold">
              Select Conversion Type
            </label>

            <select
              value={selectedOptionIndex}
              onChange={(event) =>
                setSelectedOptionIndex(
                  Number(event.target.value)
                )
              }
              className="w-full rounded-xl border border-slate-600 bg-slate-950 p-3 text-white outline-none focus:border-cyan-400"
            >
              {conversionOptions[activeCategory].map(
                (option, index) => (
                  <option
                    key={option.label}
                    value={index}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </section>

          
          <section className="grid gap-6 md:grid-cols-2">
            
            

            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
              <h3 className="mb-4 text-2xl font-bold">
                Single Value Conversion
              </h3>

              <input
                type="number"
                value={singleValue}
                onChange={(event) =>
                  setSingleValue(event.target.value)
                }
                placeholder={`Enter value in ${selectedOption.fromUnit}`}
                className="mb-4 w-full rounded-xl border border-slate-600 bg-slate-950 p-3 text-white outline-none focus:border-cyan-400"
              />

              <button
                onClick={convertSingleValue}
                className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Convert Single Value
              </button>

              {singleResult && (
                <div className="mt-4 rounded-xl bg-slate-950 p-4 text-cyan-300">
                  {singleResult}
                </div>
              )}
            </div>

            
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
              <h3 className="mb-4 text-2xl font-bold">
                List Conversion
              </h3>

              <input
                type="text"
                value={listValues}
                onChange={(event) =>
                  setListValues(event.target.value)
                }
                placeholder="Example: 5, 10, 15"
                className="mb-4 w-full rounded-xl border border-slate-600 bg-slate-950 p-3 text-white outline-none focus:border-cyan-400"
              />

              <button
                onClick={convertListValues}
                className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Convert List
              </button>

              {listResult && (
                <div className="mt-4 rounded-xl bg-slate-950 p-4 text-cyan-300">
                  {listResult}
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;