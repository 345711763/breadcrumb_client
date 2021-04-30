export const joinPath = (a, b) => {
  if (a[a.length - 1] === '/') {
    return `${a}${b}`;
  }
  return `${a}/${b}`;
};
