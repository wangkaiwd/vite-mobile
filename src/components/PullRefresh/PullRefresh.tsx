import './index.less'
import type { CSSProperties, ReactNode } from 'react'
import React, { useMemo, useRef, useState } from 'react'
import { pxToVw } from '../../utils/unit.ts'

interface PullRefreshProps {
  children: ReactNode
}

const pullDistance = 50

type RefreshStatus = 'normal' | 'loading' | 'success' | 'fail'

const PullRefresh = (props: PullRefreshProps) => {
  const { children } = props
  const startPointRef = useRef<any>(null)
  const headRef = useRef<HTMLDivElement | null>(null)
  const [deltaY, setDeltaY] = useState(0)
  const [refreshStatus, setRefreshStatus] = useState<RefreshStatus>('normal')
  const ease = (distance: number) => {
    if (distance > pullDistance) {
      if (distance < pullDistance * 2) {
        distance = pullDistance + (distance - pullDistance) / 2
      } else {
        distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4
      }
    }

    return Math.round(distance)
  }
  const containerStyle = useMemo(() => {
    return {
      transform: `translateY(${ease(pxToVw(deltaY))}vw)`
    }
  }, [deltaY])
  const headStyle: CSSProperties = {
    transform: 'translateY(-100%)',
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!headRef.current) {return}
    const { clientY } = e.touches[0]
    const deltaY = clientY - startPointRef.current.clientY
    setDeltaY(deltaY)
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
    setStatus()
  }
  const setStatus = () => {
    if (deltaY >= pullDistance) { // refresh success
      setDeltaY(pullDistance)
      setRefreshStatus('loading')
      setTimeout(() => {
        setDeltaY(0)
        setRefreshStatus('success')
      }, 1000)
    }
  }
  const renderStatus = () => {
    if (refreshStatus === 'normal') {
      return '下拉刷新'
    } else if (refreshStatus === 'loading') {
      return '加载中...'
    } else if (refreshStatus === 'success') {
      return '加载成功'
    } else {
      return '加载失败'
    }
  }
  return (
    <div
      style={containerStyle}
      className="pull-refresh"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div ref={headRef} className="pull-refresh-head" style={headStyle}>
        {renderStatus()}
      </div>
      {children}
    </div>
  )
}

export default PullRefresh
