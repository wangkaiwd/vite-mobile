import './index.less'
import type { CSSProperties, ReactNode } from 'react'
import React, { useRef, useState } from 'react'
import { pxToVw } from '../../utils/unit.ts'

interface PullRefreshProps {
  children: ReactNode
}

const PullRefresh = (props: PullRefreshProps) => {
  const { children } = props
  const startPointRef = useRef<any>(null)
  const [containerStyle, setContainerStyle] = useState({
    paddingTop: 0
  })
  const [headStyle, setHeadStyle] = useState<CSSProperties>({
    transform: 'translateY(-100%)',
  })
  const onTouchMove = (e: React.TouchEvent) => {
    const { clientY } = e.touches[0]
    const deltaY = clientY - startPointRef.current.clientY
    setHeadStyle({
      transform: `translateY(${pxToVw(deltaY)}vw)`,
    })
    setContainerStyle({
      paddingTop: deltaY
    })
  }
  const onTouchStart = (e: React.TouchEvent) => {
    const { clientX, clientY } = e.touches[0]
    startPointRef.current = {
      clientX,
      clientY
    }
  }
  const onTouchEnd = () => {
    startPointRef.current = null
    setHeadStyle({
      transform: 'translateY(-100%)',
    })
    setContainerStyle({
      paddingTop: 0
    })
  }
  return (
    <div
      style={containerStyle}
      className="pull-refresh"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="pull-refresh-head" style={headStyle}>下拉刷新</div>
      {children}
    </div>
  )
}

export default PullRefresh
