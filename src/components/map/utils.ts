export const getCapacityPercent = (used: number, capacity: number) => {
  if (capacity === 0) {
    return 0;
  }

  return Math.round((used / capacity) * 100);
};

export const getCapacityFill = (used: number, capacity: number) => {
  const percent = getCapacityPercent(used, capacity);

  if (percent >= 90) {
    return "#DC2626";
  }

  if (percent >= 75) {
    return "#F97316";
  }

  return "#16A34A";
};

export const getCapacityLabel = (used: number, capacity: number) => {
  const percent = getCapacityPercent(used, capacity);

  if (percent >= 90) {
    return "High";
  }

  if (percent >= 75) {
    return "Medium";
  }

  return "Good";
};
