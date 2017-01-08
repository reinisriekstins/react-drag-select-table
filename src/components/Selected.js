import React from 'react'
import { observer } from 'mobx-react'

const Selected = ({ store, label = 'Selected: ' }) => (
  <strong>{ label }{ store.selected.length }</strong>
)

export default observer(Selected)