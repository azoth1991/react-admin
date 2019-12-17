import { useDispatch } from 'react-redux'
import { Dispatch } from 'lib/store/store'

export default () => {
  return useDispatch() as Dispatch
}
