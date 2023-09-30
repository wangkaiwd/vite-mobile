import { useMemo, useRef } from 'react'
import { throttle, type ThrottleSettings } from 'lodash-es'

interface ThrottleFnOptions extends ThrottleSettings {
  wait?: number
}

export const useThrottleFn = (fn: (...args: any[]) => any, options: ThrottleFnOptions = {}) => {
  const { wait = 200, ...rest } = options
  const fnRef = useRef(fn)
  const throttledFn = useMemo(() => {
    return throttle(fnRef.current, wait, rest)
  }, [fnRef])
  return {
    run: throttledFn,
    cancel: throttledFn.cancel,
    flush: throttledFn.flush
  }
}
