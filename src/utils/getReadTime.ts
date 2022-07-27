const getReadTime = (arg0: string): number => {
  const words = arg0.length;
  const minutes = Math.round(words / 1500);
  return minutes;
};

export default getReadTime;
