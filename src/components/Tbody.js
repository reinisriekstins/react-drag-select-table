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
    { isMouseDown } = store,
    { toggleMouseDown } = store.actions

  const
    handleMouseDown = e => {
      if (isMouseDown.value === false)
        toggleMouseDown()
      if (onMouseDown)
        onMouseDown(e)
    },
    handleMouseUp = e => {
      if (isMouseDown.value === true)
        toggleMouseDown()
      if (onMouseUp)
        onMouseUp(e)
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