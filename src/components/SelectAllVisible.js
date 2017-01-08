import React from 'react'
import { observer } from 'mobx-react'

const SelectAllVisible = props => {
  const
    { store, children, onClick, ...rest } = props,
    { selected, filtered } = store

  const handleClick = e => {
    filtered.forEach(x =>
      !selected.includes(x) && selected.push(x))
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

export default observer(SelectAllVisible)