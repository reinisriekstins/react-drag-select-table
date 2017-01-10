import React from 'react'
import { observer } from 'mobx-react'

export const Filter = observer(props => {
  const
    { store, onChange, ...rest } = props,
    { filterVal, actions } = store,
    { updateFilterValue, emptySelected } = actions

  const handleChange = e => {
    updateFilterValue(e)
    emptySelected()

    if (onChange) onChange(e)
  }

  return (
    <input
      { ...rest }
      type="text"
      value={ filterVal.value }
      onChange={ handleChange }
    />
  )
})
Filter.displayName = 'Filter'