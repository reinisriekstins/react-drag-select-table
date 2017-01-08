import React from 'react'
import { observer } from 'mobx-react'

const Table = props => {
  const { children, ...rest } = props
  return (
    <table { ...rest }>
      { children }
    </table>
  )
}

export default observer(Table)