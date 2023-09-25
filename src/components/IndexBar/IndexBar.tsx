import type { ReactNode } from 'react'
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react'
import IndexAnchor, { INDEX_ANCHOR_KEY, type IndexAnchorInstance } from './IndexAnchor.tsx'
import './index-bar.less'
import clsx from 'clsx'
import { COMPONENT_KEY } from '../constant'
import { useScrollParent } from '../../hooks/useScrollParent.tsx'
import { IndexBarContext } from './context.tsx'
import { useMemoizedFn } from '../../hooks/useMemoizedFn.ts'

interface IndexBarProps {
  children: ReactNode,
  indexList: string[]
}

const IndexBar = (props: IndexBarProps) => {
  const { children, indexList } = props
  // fixme: indexList maybe obtain by http request
  const [activeIndex, setActiveIndex] = useState(indexList[0])
  const rootRef = useRef<HTMLDivElement>(null)
  const anchorRefs = useRef<{ [k: string]: IndexAnchorInstance }>({})
  const scrollParent = useScrollParent(rootRef)

  const onScroll = useMemoizedFn((e: React.MouseEvent) => {
    Object.keys(anchorRefs.current).map(key => {
      const anchorInstance = anchorRefs.current[key]
      anchorInstance.onScroll(e)
    })
  })
  useEffect(() => {
    scrollParent?.addEventListener('scroll', onScroll)
    return () => {
      scrollParent?.removeEventListener('scroll', onScroll)
    }
  }, [scrollParent])
  const onClickIndex = (index: string) => {
    setActiveIndex(index)
    anchorRefs.current?.[index].root?.scrollIntoView()
  }
  const memoChildren = useMemo(() => {
    // todo: annotation children ts type
    const renderChildren = (children: any): ReactNode => {
      return Children.map(children, (child: JSX.Element) => {
        if (child.type?.[COMPONENT_KEY] === INDEX_ANCHOR_KEY) {
          return cloneElement(child, {
            ref: (ref: IndexAnchorInstance | null) => {
              if (ref) {
                anchorRefs.current[child.props.index] = ref
              }
            }
          })
        }
        if (child.props?.children) {
          return renderChildren(child.props.children)
        }
        return child
      })
    }
    return renderChildren(children)
  }, [children])
  const renderIndices = () => {
    return (
      <div className={'index-bar-indices'}>
        {indexList.map((item, i) => {
          return (
            <div
              key={i}
              className={clsx('index-bar-index', { 'index-bar-index-active': activeIndex === item })}
              onClick={() => onClickIndex(item)}
            >
              {item}
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <IndexBarContext.Provider value={{ scrollParent }}>
      <div className="index-bar" ref={rootRef}>
        {memoChildren}
        {renderIndices()}
      </div>
    </IndexBarContext.Provider>
  )
}

IndexBar.Anchor = IndexAnchor

export default IndexBar
