import React from 'react'
import { observer } from 'mobx-react'

const Tr = observer(({ store, state, i }) => {
  const { title, year } = state

  const pushOrPopSelection = e => {
    const tr = e.target.parentNode
    const { isMouseDown, selected } = store

    if ( selected.includes(state) ) {
        selected.splice( selected.indexOf(state, 1) )
        tr.setAttribute('style', '')
        console.log('popped', [state.title, state.year])
      }
      else {
        selected.push(state)
        console.log('pushed', [state.title, state.year])
        tr.setAttribute('style', 'background-color: dodgerblue;')
      }
  }

  const handleMouseOver = e => {
    const { isMouseDown, selected } = store

    if ( isMouseDown.value ) {
      if ( selected.includes(state) ) {
        selected.splice( selected.indexOf(state, 1) )
        console.log('popped', [state.title, state.year])
      }
      else {
        selected.push(state)
        console.log('pushed', [state.title, state.year])
      }
    }
  }

  return (
    <tr 
      onMouseOver={ handleMouseOver }
      onMouseDown={ pushOrPopSelection }
      style={ store.selected.includes(state) ? { backgroundColor: 'dodgerblue' } : {} }>
      <td>{ i }</td>
      <td>{ title }</td>
      <td>{ year }</td>
      <td>false</td>
      <td>{ store.selected.includes(state) ? 'true' : 'false' }</td>
    </tr>
  )
})

const App = ({ store }) => {
  const noSelect = {
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none'
  }

  return (
    <div className="large-6 columns">
      <table style={ noSelect }>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Year</th>
            <th>Selecting</th>
            <th>Selected</th>
          </tr>
        </thead>
        <tbody
          style={{ cursor: 'pointer' }} 
          onMouseDown={ e => store.isMouseDown.value = true }
          onMouseUp={ e => store.isMouseDown.value = false }>
        {
          store.all.map((x, i) => 
            <Tr key={ i } store={ store } state={ store.all[i] } i={ i } />
          )
        }
        </tbody>
      </table>
    </div>
  )
}

// console.table(store.selected.slice().map(x => ({title: x.title, year: x.year})))

export default observer(App)
