export const mapper = (str: string, type: string) => {
  if (type === "date") {
    if (str) {
      return new Date(str).toLocaleString();
    }
  }

  return str;
};
