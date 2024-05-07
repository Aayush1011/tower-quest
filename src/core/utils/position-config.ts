import { IndexValues } from "./game-config.types";

export const getPosition = (index: IndexValues) => {
  const max = 0.75;
  const min = 0.35;
  switch (index) {
    case 0:
      return [
        Math.random() * (max - min) + min,
        0.2,
        Math.random() * (max - min) + min,
      ];

    case 1:
      return [
        Math.random() * (min - max) - min,
        0.2,
        Math.random() * (max - min) + min,
      ];

    case 2:
      return [
        Math.random() * (max - min) + min,
        0.2,
        Math.random() * (min - max) - min,
      ];

    case 3:
      return [
        Math.random() * (min - max) - min,
        0.2,
        Math.random() * (min - max) - min,
      ];

    default:
      break;
  }
};
