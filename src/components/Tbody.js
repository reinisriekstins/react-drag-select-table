import React from 'react'
import { observer } from 'mobx-react'

const defaultStyle = () => ({
  cursor: 'pointer',
  userSelect: 'none'
})

const Tbody = props => {
  const
    { store,
      children,
      style,
      onMouseDown,
      onMouseUp,
      ...rest
    } = props,
    { isMouseDown } = store

  const
    handleMouseDown = e => {
      isMouseDown.value = true
      if (onMouseDown) onMouseDown(e)
    },
    handleMouseUp = e => {
      isMouseDown.value = false
      if (onMouseUp) onMouseUp(e)
    }

  return (
    <tbody
      { ...rest }
      style={style || defaultStyle()}
      onMouseDown={ handleMouseDown }
      onMouseUp={ handleMouseUp }>
      { children }
    </tbody>
  )
}

Tbody.defaultStyle = defaultStyle

export default observer(Tbody)