const scrollProperties = ['auto', 'scroll'];
export const getScrollParent = (el: HTMLElement) => {
  let current = el.parentElement;
  while (current) {
    const computedStyle = getComputedStyle(current);
    const overflowY = computedStyle.overflowY;
    if (scrollProperties.includes(overflowY)) {
      return current;
    }
    current = current.parentElement;
  }
  return window;
};

export const getScrollTop = (el: HTMLElement | Window) => {
  if (el === window) {
    return el.scrollY;
  }
  return (el as HTMLElement).scrollTop;
};
