import { type MutableRefObject, useEffect, useState } from 'react'
import { getScrollParent } from '../utils/dom.ts'

// fixme: this need to re-calculate when dom dimension make changes
export const useScrollParent = (el: MutableRefObject<HTMLElement | null>) => {
  const [scrollParent, setScrollParent] = useState<HTMLElement | Window>()
  useEffect(() => {
    console.log('effect')
    if (el.current) {
      const parent = getScrollParent(el.current)
      setScrollParent(parent)
    }
  }, [])

  return scrollParent
}
