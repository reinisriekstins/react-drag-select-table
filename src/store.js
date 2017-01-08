import { observable } from 'mobx'
import { Observable } from 'rxjs/Rx'
import { toStream, fromStream } from 'mobx-utils'
import difference from 'lodash/fp/difference'
import last from 'lodash/fp/last'

export default function CreateStore(data) {
  const
    filter = observable({ value: '' }),
    isMouseDown = observable(false),
    all = observable(data),
    filtered = () => all.filter(x => {
      const
        { title, year } = x,
        { value } = filter,
        filterRegex = new RegExp(value, 'gi')

      if (filterRegex.test(title) || filterRegex.test(year))
        return true
      return false
    }),
    // all the rows selected by the user
    selected = observable([]),
    // all the rows that are not selected by the user
    unselected = () => difference(all, selected)

  const
    source$ = Observable
      .from(toStream(() => selected.slice())),
    firstSelected$ = source$
      .first()
      .map(x => x[0]),
    nextToggleSelected$ = source$
      .pairwise()
      .map(([prev, curr]) => {
        if (prev.length < curr.length)
          return last(curr)
        return difference(prev, curr)[0]
      }),
    lastToggleSelected$ = Observable.merge(
      firstSelected$, nextToggleSelected$
    )

  const lastToggleSelected =
    fromStream( lastToggleSelected$ )

  // for debugging purposes:
  // lastToggleSelected$.subscribe(
  //   next => console.log('Toggled', next), //{title: next.title, year: next.year}
  //   err => console.warn(err),
  //   () => console.info('done')
  // )

  const store = {
    filter,
    isMouseDown,
    all,
    get filtered() { return filtered() },
    selected,
    get unselected() { return unselected() },
    get lastToggleSelected() {
      return lastToggleSelected.current
    }
  }
  return store
}