import { observable, computed } from 'mobx'
import { Observable } from 'rxjs/Rx'
import { toStream, fromStream } from 'mobx-utils'
import difference from 'lodash/fp/difference'
import last from 'lodash/fp/last'

import data from './sample-data'

export const store = {
  filter: observable({ value: '' }),
  isMouseDown: observable(false),
  all: observable(data),
  // filtered results
  get visible() {
   return store.all.filter(x => {
      const { title, year } = x
      const { value } = store.filter
      const filterRegex = new RegExp(value, 'gi')

      if (filterRegex.test(title) || filterRegex.test(year))
        return true
    })
  },
  selected: observable([]),
  get unselected() {
    return difference(store.all, store.selected)
  }
}

const lastSelected$ = Observable
  .from(toStream(() => last(store.selected)))

const lastUnselected$ = Observable
  .from(toStream(() => last(store.unselected)))

const lastToggleSelected$ = Observable
  .merge(lastSelected$, lastUnselected$)

store.lastToggleSelected = computed(() => {
  return fromStream(lastToggleSelected$)
})
