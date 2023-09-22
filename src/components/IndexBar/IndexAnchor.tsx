import './anchor.less'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { COMPONENT_KEY } from '../constant'

interface AnchorProps {
  index: string
}

export interface IndexAnchorInstance {
  root: HTMLDivElement | null
}

// unique property with symbol
export const INDEX_ANCHOR_KEY = Symbol('IndexAnchor')
const _IndexAnchor = forwardRef<IndexAnchorInstance, AnchorProps>((props, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const { index } = props
  useImperativeHandle(ref, () => {
    return {
      // will this need to a ref ?
      root: rootRef.current
    }
  })
  return (
    <div className="index-anchor" ref={rootRef}>
      {index}
    </div>
  )
})

// add property for function: Object.assign
// https://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript
const IndexAnchor = Object.assign(_IndexAnchor, { [COMPONENT_KEY]: INDEX_ANCHOR_KEY })
export default IndexAnchor
