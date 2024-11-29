export const allowedImageFormat = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg",
];

export const truncateText = (value: string, limit: number) => {
  if (value.length <= limit) {
    return value;
  }
  return `${value.substring(0, limit)}...`;
};
