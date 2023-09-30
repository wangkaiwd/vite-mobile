import type { ReactNode } from 'react'
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react'
import IndexAnchor, { INDEX_ANCHOR_KEY, type IndexAnchorInstance } from './IndexAnchor.tsx'
import './index-bar.less'
import clsx from 'clsx'
import { COMPONENT_KEY } from '../constant'
import { useScrollParent } from '../../hooks/useScrollParent.tsx'
import { IndexBarContext } from './context.tsx'
import { map } from 'lodash-es'
import { useThrottleFn } from '../../hooks/useThrottleFn.ts'

interface IndexBarProps {
  children: ReactNode,
  indexList: string[]
}

// difficulty: implement previous anchor title and current anchor title scroll to top together

const IndexBar = (props: IndexBarProps) => {
  const { children, indexList } = props
  // fixme: indexList maybe obtain by http request
  const [activeIndex, setActiveIndex] = useState(indexList[0])
  const rootRef = useRef<HTMLDivElement>(null)
  const anchorRefs = useRef<{ [k: string]: IndexAnchorInstance }>({})
  const scrollParent = useScrollParent(rootRef)

  const findActiveAnchor = () => {
    const anchorRects = map(anchorRefs.current, (val, key) => {
      const rect = val.root!.getBoundingClientRect()
      return {
        key,
        rect
      }
    })
    for (let i = 0; i < anchorRects.length; i++) {
      const prev = anchorRects[i - 1]
      const cur = anchorRects[i]
      const next = anchorRects[i + 1]
      const prevHeight = prev ? prev.rect.height : 0
      // last anchor
      if (!next) {
        return {
          key: cur.key,
          i
        }
      }
      const curTop = Math.floor(cur.rect.top)
      const nextTop = Math.floor(next.rect.top)
      if (curTop <= prevHeight && nextTop > cur.rect.height) {
        return {
          key: cur.key,
          i
        }
      }
    }
    return {
      key: null,
      i: -1
    }
  }
  const updateAnchorsState = (activeKey: string, activeIndex: number) => {
    const keys = Object.keys(anchorRefs.current)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const val = anchorRefs.current[key]
      const activeVal = anchorRefs.current[activeKey]
      if (!val.root || !activeVal.root) {return}
      const rect = val.root.getBoundingClientRect()
      const activeRect = activeVal.root.getBoundingClientRect()
      if (i === activeIndex) {
        val.setState({
          active: true,
          top: rect.top < 0 ? 0 : rect.top
        })
      } else if (i === activeIndex - 1) {
        val.setState({
          active: activeRect.top > 0,
          top: activeRect.top - rect.height
        })
      } else {
        val.setState({
          active: false,
          top: 0
        })
      }
    }
  }
  const _onScroll = () => {
    const { key: anchor, i } = findActiveAnchor()
    if (anchor) {
      setActiveIndex(anchor)
      updateAnchorsState(anchor, i)
    }
  }
  const { run: onScroll } = useThrottleFn(_onScroll, { wait: 30 })
  useEffect(() => {
    scrollParent?.addEventListener('scroll', onScroll)
    return () => {
      scrollParent?.removeEventListener('scroll', onScroll)
    }
  }, [scrollParent])
  const onClickIndex = (index: string) => {
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
