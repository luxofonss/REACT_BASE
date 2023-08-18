import { useEffect, RefObject } from 'react'

type Callback = () => void

export default function useOutsideComponent(ref: RefObject<HTMLElement>, callback: Callback = () => {}) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}
