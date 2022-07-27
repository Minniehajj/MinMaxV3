const getReadTime = (arg0: string): number => {
  const words = arg0.split(" ").length;
  const minutes = Math.round(words / 200);
  return minutes;
};

export default getReadTime;
