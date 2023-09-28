import { useState } from 'react'
import { isFunction } from 'lodash-es'

export const useSetState = <T> (initialState: T | (() => T)) => {
  const [state, setState] = useState<T>(initialState)
  const _setState = (patch: Partial<T>) => {
    if (isFunction(patch)) {
      setState((preState) => {
        const newState = patch(preState)
        return {
          ...preState,
          ...newState
        }
      })
    } else {
      setState({
        ...state,
        ...patch
      })
    }
  }
  return [state, _setState]
}
