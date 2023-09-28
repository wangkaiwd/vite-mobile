const scrollProperties = ['auto', 'scroll']
export const getScrollParent = (el: HTMLElement) => {
  let current = el.parentElement
  while (current) {
    const computedStyle = getComputedStyle(current)
    const overflowY = computedStyle.overflowY
    if (scrollProperties.includes(overflowY)) {
      return current
    }
    current = current.parentElement
  }
  return window
}

export const isWindow = (value: any): value is Window => {
  return value === window
}
export const getScrollTop = (el: HTMLElement | Window) => {
  if (isWindow(el)) {
    return el.scrollY
  }
  return el.scrollTop
}

export const getRect = (el: HTMLElement | Window) => {
  if (isWindow(el)) {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
      left: -window.scrollX,
      top: -window.scrollY,
      bottom: window.innerHeight,
      right: innerWidth,
      x: -window.scrollX,
      y: -window.scrollY
    } as DOMRect
  }
  return el.getBoundingClientRect()
}



