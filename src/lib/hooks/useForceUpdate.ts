import { useState } from 'react'

/**
 * Force Update By Update a boolen value repeatly
 */
const toggle = (state: boolean): boolean => !state
export default function useForceUpdate() {
  const [, setState] = useState<boolean>(true)
  function forceUpdate(): boolean {
    setState(toggle)
    return true
  }
  return forceUpdate
}
