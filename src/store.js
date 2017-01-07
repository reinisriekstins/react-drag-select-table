import { observable } from 'mobx'
import { Observable } from 'rxjs/Rx'
import { toStream, fromStream } from 'mobx-utils'
import difference from 'lodash/fp/difference'
import last from 'lodash/fp/last'

import data from './sample-data'

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
  selected = observable([]),
  unselected = () => difference(all, selected)

const
  lastSelected$ = Observable
    .from(toStream(() => last(selected))),
  lastUnselected$ = Observable
    .from(toStream(() => last(unselected)))

const lastToggleSelected = fromStream(
  Observable.merge(lastSelected$, lastUnselected$)
)

export const store = {
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




// export const store = {
//   filter: observable({ value: '' }),
//   isMouseDown: observable(false),
//   all: observable(data),
//   // filtered results
//   get visible() {
//    return store.all.filter(x => {
//       const { title, year } = x
//       const { value } = store.filter
//       const filterRegex = new RegExp(value, 'gi')

//       if (filterRegex.test(title) || filterRegex.test(year))
//         return true
//       return false
//     })
//   },
//   selected: observable([]),
//   get unselected() {
//     return difference(store.all, store.selected)
//   },
//   lastSelected$: Observable
//     .from(toStream(() => last(store.selected))),
//   lastUnselected$: Observable
//     .from(toStream(() => last(store.unselected))),
//   lastToggleSelected$: Observable
//     .merge(store.lastSelected$, store.lastUnselected$),
//   get lastToggleSelected() {
//     return fromStream(store.lastToggleSelected$)
//   }
// }

// const lastSelected$ = Observable
//   .from(toStream(() => last(store.selected)))

// const lastUnselected$ = Observable
//   .from(toStream(() => last(store.unselected)))

// const lastToggleSelected$ = Observable
//   .merge(lastSelected$, lastUnselected$)

// store.lastToggleSelected = computed(() => {
//   return fromStream(lastToggleSelected$)
// })
