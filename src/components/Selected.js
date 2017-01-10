import React from 'react'
import { observer } from 'mobx-react'

export const Selected = observer(({ store, label = 'Selected: ' }) => (
    <span>
      <strong>{ label }</strong>
      <strong>{ store.selected.length }</strong>
    </span>
  )
)
Selected.displayName = 'Selected'