export const pxToVw = (value: number) => {
  const clientWidth = document.documentElement.clientWidth
  return 100 / clientWidth * value
}
