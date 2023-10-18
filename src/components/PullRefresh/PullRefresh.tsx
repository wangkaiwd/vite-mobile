import './index.less'
import type { ReactNode } from 'react'

interface PullRefreshProps {
  children: ReactNode
}

const PullRefresh = (props: PullRefreshProps) => {
  const { children } = props
  return (
    <div className="pull-refresh">
      <div className="pull-refresh-head"></div>
      {children}
    </div>
  )
}

export default PullRefresh
