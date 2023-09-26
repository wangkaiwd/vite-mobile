import './anchor.less'
import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { COMPONENT_KEY } from '../constant'
import clsx from 'clsx'
import { useScrollParent } from '../../hooks/useScrollParent.tsx'

interface AnchorProps {
  index: string;
}

export interface IndexAnchorInstance {
  root: HTMLDivElement | null;
  onScroll: (e?: React.MouseEvent) => void;
}

// unique property with symbol
export const INDEX_ANCHOR_KEY = Symbol('IndexAnchor')
const _IndexAnchor = forwardRef<IndexAnchorInstance, AnchorProps>((props, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const { index } = props
  const [isSticky, setIsSticky] = useState(false)
  const scrollParent = useScrollParent(rootRef)
  const rootStyle = useMemo(() => {
    if (innerRef.current) {
      const { width, height } = innerRef.current.getBoundingClientRect()
      return {
        width,
        height,
      }
    }
    return {}
  }, [isSticky])
  const onScroll = () => {
    if (!scrollParent || !rootRef.current) {
      return
    }
    const { top } = rootRef.current.getBoundingClientRect()
    if (top <= 0) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }
  useImperativeHandle(ref, () => {
    return {
      // will this need to a ref ?
      root: rootRef.current,
      onScroll
    }
  })
  return (
    <div className={'index-anchor'} ref={rootRef} style={rootStyle}>
      <div className={clsx('index-anchor-inner', { 'index-anchor-fixed': isSticky })} ref={innerRef}>
        {index}
      </div>
    </div>
  )
})

// add property for function: Object.assign
// https://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript
const IndexAnchor = Object.assign(_IndexAnchor, { [COMPONENT_KEY]: INDEX_ANCHOR_KEY })
export default IndexAnchor
