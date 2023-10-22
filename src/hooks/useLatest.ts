import { useRef } from 'react'

export const useLatest = <T> (val: T) => {
  const valRef = useRef(val)
  valRef.current = val
  return valRef
}
