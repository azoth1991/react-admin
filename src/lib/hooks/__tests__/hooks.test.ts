import { renderHook, act } from '@testing-library/react-hooks'
import useMount from '../useMount'
import useForceUpdate from '../useForceUpdate'
import useTeaModal from '../useTeaModal'

test('useMount Hook Test', () => {
  const { result } = renderHook(() => useMount(() => console.log('test')))
  expect(result.current).toBe(undefined)
})

test('useForceUpdate Hook Test', () => {
  const { result } = renderHook(() => useForceUpdate())

  act(() => {
    const res = result.current()
    expect(res).toBe(true)
  })
})

test('useTeaModal Hook Test: Open Modal', () => {
  const { result } = renderHook(() => useTeaModal())

  // 模拟开启Modal
  act(() => {
    const [, open] = result.current
    open()
  })

  expect(result.current[0]).toBe(true)
})

test('useTeaModal Hook Test: Close Modal', () => {
  const { result } = renderHook(() => useTeaModal())

  // 模拟开启并关闭Modal
  act(() => {
    const [, open, close] = result.current
    open()
    close()
  })

  expect(result.current[0]).toBe(false)
})
