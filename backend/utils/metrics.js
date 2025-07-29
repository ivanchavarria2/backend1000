// /utils/metrics.js
import {
  calculateCalories,
  calculateSpeed,
  calculateBMI
} from './calculations.js';

export const calculateWorkoutMetrics = (workout) => {
  const { weightKg, durationMin, distanceKm, heightCm } = workout;

  const caloriesBurned = calculateCalories(weightKg, durationMin);
  const speed = calculateSpeed(distanceKm, durationMin);
  const bmi = calculateBMI(weightKg, heightCm);

  return {
    caloriesBurned,
    speed,
    bmi
  };
};
