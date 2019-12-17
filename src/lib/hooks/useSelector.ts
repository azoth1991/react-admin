import { useSelector as useReduxSelector, shallowEqual } from "react-redux";

export default function useSelector<TState, TSelected>(
  selector: (state: TState) => TSelected,
): TSelected {
  return useReduxSelector(selector, shallowEqual)
}
