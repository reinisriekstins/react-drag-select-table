import { observable, action, useStrict } from 'mobx'
import { Observable } from 'rxjs/Rx'
import { toStream, fromStream } from 'mobx-utils'
import difference from 'lodash/fp/difference'
import last from 'lodash/fp/last'
import filter from 'lodash/fp/filter'
import emptyArray from './utils/emptyArray'

export default (data, strict = true) => {

  useStrict(strict)

/*----------------------------------------
 *
 * MOBX OBSERVABLES AND COMPUTED FUNCTIONS
 *
 *----------------------------------------*/
  const
    filterVal = observable({ value: '' }),
    isMouseDown = observable(false),
    all = observable(data),
    filtered = () => filter(x => {
      const
        { title, year } = x,
        { value } = filterVal,
        filterRegex = new RegExp(value, 'gi')

      if (filterRegex.test(title) || filterRegex.test(year))
        return true
      return false
    })(all),
    // all the rows selected by the user
    selected = observable([]),
    // all the rows that are not selected by the user
    unselected = () => difference(all, selected)

  const
    source$ = Observable
      .from(toStream(() => [...selected])),
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

  // {current: null} // this will reintroduce a bug, but remove the mobx error
  const lastToggleSelected = fromStream(lastToggleSelected$)

  // for debugging purposes:
  // lastToggleSelected$.subscribe(
  //   next => console.log('Toggled', next), //{title: next.title, year: next.year}
  //   err => console.warn(err),
  //   () => console.info('done')
  // )

/*-----------------------------------
*
* ACTIONS
*
*-----------------------------------*/
  const toggleSelection = action(
    'toggleSelection',
    state => {
      if ( selected.includes(state) )
        selected.splice( selected.indexOf(state), 1 )
      else selected.push(state)
    }
  )

  const toggleMouseDown = action(
    'setMouseDown',
    () => isMouseDown.value = !isMouseDown.value
  )

  const updateFilterValue = action(
    'updateFilterValue',
    e => filterVal.value = e.target.value
  )

  const emptySelected = action(
    'emptySelected',
    () => emptyArray(selected)
  )

  const pushStateIntoSelected = action(
    'pushStateIntoSelected',
    state => {
      if ( !selected.includes(state) )
        selected.push(state)
    }
  )

  const store = {
    filterVal,
    isMouseDown,
    all,
    get filtered() { return filtered() },
    selected,
    get unselected() { return unselected() },
    get lastToggleSelected() {
      return lastToggleSelected.current
    },
    actions: {
      toggleSelection,
      toggleMouseDown,
      updateFilterValue,
      emptySelected,
      pushStateIntoSelected
    }
  }
  return store
}