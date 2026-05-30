/*

Name: Jireh Agbozo
Date: May 30, 2026

Program Description:
This file contains a higher-order conversion function
for unit conversion between metric and imperial units.
The function takes two unit parameters and returns
an arrow function that performs the requested conversion.

*/

// Higher-order conversion function
 export const createConverter = (
  fromUnit: string,
  toUnit: string
) => {

  //  the arrow function returned
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

    // Temperature conversions
    if (fromUnit === "c" && toUnit === "f") {
      return (value * 9) / 5 + 32;
    }

    if (fromUnit === "f" && toUnit === "c") {
      return ((value - 32) * 5) / 9;
    }

    return value;
  };
};

// Example usage
const poundsToKg = createConverter("lb", "kg");

console.log(poundsToKg(10));

const milesToKm = createConverter("mi", "km");

console.log(milesToKm(5));