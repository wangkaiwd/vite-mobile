import { type Dispatch, type SetStateAction, useState } from 'react'
import { isFunction } from 'lodash-es'

export type SetState<S> = Dispatch<SetStateAction<S>>
export const useSetState = <S extends object> (initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState)
  const setMergedState = (patch: Partial<S> | SetStateAction<S>) => {
    setState((preState) => {
      const newState = isFunction(patch) ? patch(preState) : patch
      return {
        ...preState,
        ...newState
      }
    })
  }
  return [state, setMergedState]
}
