import React from 'react'
import { observer } from 'mobx-react'

const DeselectAll = props => {
  const
    { store, children, onClick, ...rest } = props,
    { emptySelected } = store.actions

  const handleClick = e => {
    emptySelected()
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