import React from 'react'
import { observer } from 'mobx-react'

const Tr = ({ store, state, i, children }) => {
  const {
    selected,
    isMouseDown,
    lastToggleSelected
  } = store

  const toggleSelection = () => {
    if ( selected.includes(state) )
      selected.splice( selected.indexOf(state), 1 )
    else selected.push(state)
  }

  const handleMouseOver = () => {
    if (isMouseDown.value && state !== lastToggleSelected) {
      toggleSelection()
    }
  }

  return (
    <tr
      onMouseOver={ handleMouseOver }
      onMouseDown={ toggleSelection }
      style={(() => {
        if (selected.includes(state))
          return {
            backgroundColor: 'dodgerblue',
            color: 'white'
          }
        return {}
      })()}>
      { children }
    </tr>
  )
}

export default observer(Tr)