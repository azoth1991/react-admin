import useEffectOnce from './useEffectOnce'

const useUnmount = (fn: () => void | undefined | any) => {
  useEffectOnce(() => fn)
}

export default useUnmount
