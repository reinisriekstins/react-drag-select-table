import { observable, computed } from 'mobx'
import difference from 'lodash/fp/difference'
import data from './sample-data'

export const store = {
  isMouseDown: observable(false),
  all: observable(data),
  selected: observable([

  ]),
  selecting: observable([
    
  ]),
  chosen: observable([

  ]),
  get unchosen() {
    return difference(store.all, store.chosen)
  }
}