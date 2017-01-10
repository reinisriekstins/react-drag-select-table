import React from 'react'
import { observer } from 'mobx-react'

export const Tr = observer(props => {
  const {
    onMouseOver,
    onMouseDown,
    children,
    store,
    state
  } = props,
  {
    selected,
    isMouseDown,
    lastToggleSelected,
    actions
  } = store,
  { toggleSelection } = actions

  const
    handleMouseOver = e => {
      if (isMouseDown.value && state !== lastToggleSelected)
        toggleSelection(state)
      if (onMouseOver) onMouseOver(e)
    },
    handleMouseDown = e => {
      toggleSelection(state)
      if (onMouseDown) onMouseDown(e)
    }

  return (
    <tr
      onMouseOver={ handleMouseOver }
      onMouseDown={ handleMouseDown }
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
})

Tr.displayName = 'Tr'