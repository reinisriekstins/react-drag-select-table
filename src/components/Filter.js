import React from 'react'
import { observer } from 'mobx-react'
import emptyArray from '../utils/emptyArray'

const Filter = props => {
  const
    { store, onChange, ...rest } = props,
    { filter, selected } = store

  const handleChange = e => {
    filter.value = e.target.value
    emptyArray(selected)

    if (onChange) onChange(e)
  }

  return (
    <input
      { ...rest }
      type="text"
      value={ filter.value }
      onChange={ handleChange }
    />
  )
}

export default observer(Filter)