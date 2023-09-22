import type { ReactNode } from 'react'
import IndexAnchor, { type IndexAnchorInstance, INDEX_ANCHOR_KEY } from './IndexAnchor.tsx'
import './index-bar.less'
import { Children, cloneElement, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { COMPONENT_KEY } from '../constant'

interface IndexBarProps {
  children: ReactNode,
  indexList: string[]
}

const IndexBar = (props: IndexBarProps) => {
  const { children, indexList } = props
  // fixme: indexList maybe obtain by http request
  const [activeIndex, setActiveIndex] = useState(indexList[0])
  const anchorRefs = useRef<{ [k: string]: IndexAnchorInstance }>({})
  const onClickIndex = (index: string) => {
    setActiveIndex(index)
    anchorRefs.current?.[index].root?.scrollIntoView()
  }
  const memoChildren = useMemo(() => {
    const renderChildren = (children: any): ReactNode => {
      return Children.map(children, (child: any) => {
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
    <div className="index-bar">
      {memoChildren}
      {renderIndices()}
    </div>
  )
}

IndexBar.Anchor = IndexAnchor

export default IndexBar
