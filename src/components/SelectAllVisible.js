import React from 'react'
import { observer } from 'mobx-react'

export const SelectAllVisible = observer(props => {
  const
    { store, children, onClick, ...rest } = props,
    { filtered, actions } = store,
    { pushStateIntoSelected } = actions

  const handleClick = e => {
    filtered.forEach(pushStateIntoSelected)
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
})
SelectAllVisible.displayName = 'SelectAllVisible'