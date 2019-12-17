import useDispatch from './useDispatch'
import { push, goBack } from 'connected-react-router'
import { selectRouterState } from 'lib/store/store'
import useSelector from './useSelector'

/**
 * 获取以及操作router的 hook
 */
export default () => {
  const dispatch = useDispatch()
  const routerState = useSelector(selectRouterState)

  return {
    location: routerState.location,
    push: (path: string) => dispatch(push(path)),
    goBack: () => dispatch(goBack())
  }
}
