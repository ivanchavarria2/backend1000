import * as geolib from 'geolib';

export const geolibDistance = (pointA, pointB) =>
  geolib.getDistance(pointA, pointB);

export const calculateCalories = (weightKg, durationMin, met = 7) =>
  Math.round((met * weightKg * durationMin) / 60);

export const calculateSpeed = (distanceKm, durationMin) => {
  if (durationMin <= 0) return 0;
  return parseFloat((distanceKm / (durationMin / 60)).toFixed(2));
};

export const calculateBMI = (weightKg, heightCm) => {
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM ** 2)).toFixed(2));
};
