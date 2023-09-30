import './anchor.less'
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { COMPONENT_KEY } from '../constant'
import clsx from 'clsx'
import { type SetState, useSetState } from '../../hooks/useSetState.ts'

interface AnchorProps {
  index: string;
}

interface State {
  active: boolean
  top: number
}

export interface IndexAnchorInstance {
  root: HTMLDivElement | null;
  setState: SetState<State>
}

// unique property with symbol
export const INDEX_ANCHOR_KEY = Symbol('IndexAnchor')
const _IndexAnchor = forwardRef<IndexAnchorInstance, AnchorProps>((props, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const { index } = props
  const [state, setState] = useSetState<State>({ active: false, top: 0 })
  const rootStyle = useMemo(() => {
    if (innerRef.current) {
      const { width, height } = innerRef.current.getBoundingClientRect()
      return {
        width,
        height,
      }
    }
    return {}
  }, [state.active])
  useImperativeHandle(ref, () => {
    return {
      root: rootRef.current,
      setState
    }
  })
  return (
    <div className={'index-anchor'} ref={rootRef} style={rootStyle}>
      <div
        className={clsx('index-anchor-inner', { 'index-anchor-fixed': state.active })}
        ref={innerRef}
        style={{
          top: state.top
        }}
      >
        {index}
      </div>
    </div>
  )
})

// add property for function: Object.assign
// https://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript
const IndexAnchor = Object.assign(_IndexAnchor, { [COMPONENT_KEY]: INDEX_ANCHOR_KEY })
export default IndexAnchor
