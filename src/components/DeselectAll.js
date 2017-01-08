import React from 'react'
import { observer } from 'mobx-react'

import emptyArray from '../utils/emptyArray'

const DeselectAll = props => {
  const
    { store, children, onClick, ...rest } = props,
    { selected } = store
  const handleClick = e => {
    emptyArray(selected)
    if (onClick) onClick(e)
  }
  return (
    <button
      { ...rest }
      type="button"
      onClick={ handleClick }>
      { children }
    </button>
  )
}

export default observer(DeselectAll)