export const comparison = (key) => {
  return (x, y) => {
    return ((x[key] === y[key]) ? 0 : ((x[key] > y[key]) ? 1 : -1))
  }
}
