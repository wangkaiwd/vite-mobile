import { type MutableRefObject, useEffect } from 'react'
import { useMemoizedFn } from './useMemoizedFn.ts'
import { isWindow } from '../utils/dom.ts'

interface useEventOptions {
  target?: MutableRefObject<HTMLElement | null> | HTMLElement | Window
  passive?: boolean
  capture?: boolean
  once?: boolean
  depends?: unknown[]
}

export const getTargetElement = (target: useEventOptions['target']) => {
  if (!target) {
    return
  }
  if (isWindow(target)) {
    return target
  }
  if ('current' in target) {
    return target.current
  }
  return target
}

export const useEvent = <T extends keyof HTMLElementEventMap> (event: T, listener: (ev: HTMLElementEventMap[T]) => any, options: useEventOptions = {}) => {
  const memoListener = useMemoizedFn(listener)
  const { target: rawTarget, depends = [], ...rest } = options
  useEffect(() => {
    const target = getTargetElement(rawTarget)
    if (!target) {return}
    target.addEventListener(event, memoListener, rest)
    return () => {
      if (!target) {return}
      target.removeEventListener(event, memoListener, rest)
    }
  }, [...depends, rawTarget])
}
