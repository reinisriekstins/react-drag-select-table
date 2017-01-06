import React from 'react'
import { observer } from 'mobx-react'

const Tr = observer(({ store, state, i }) => {
  const { title, year } = state
  const { selected, isMouseDown } = store

  const toggleSelection = () => {
    if ( selected.includes(state) ) {
      selected.splice( selected.indexOf(state), 1 )
      console.table([{ action: 'added', title, year }])
    }
    else {
      selected.push(state)
      console.table([{ action: 'removed', title, year}])
    }
  }

  const handleMouseOver = () => {
    if (isMouseDown.value) toggleSelection()
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
      <td>{ i }</td>
      <td>{ title }</td>
      <td>{ year }</td>
      <td>{ selected.includes(state) ? 'true' : 'false' }</td>
    </tr>
  )
})

const App = ({ store }) => {
  const { isMouseDown, all, filter, visible, selected } = store

  const noSelect = {
    // WebkitTouchCallout: 'none',
    // WebkitUserSelect: 'none',
    // KhtmlUserSelect: 'none',
    // MozUserSelect: 'none',
    // MsUserSelect: 'none',
    userSelect: 'none'
  }

  const handleInputChange = e => {
    filter.value = e.target.value

    console.table(
      selected
      .slice()
      .map(({title, year}) => 
        ({ action: 'removed', title, year })
      )
    )
    function emptyArray(arr) {
      arr.pop()
      if (arr.length) emptyArray(arr)
    }

    emptyArray(selected)
  }

  return (
    <div className="large-6 columns">
      <div className="large-6 columns">
      <label htmlFor="filter">
        <strong>Filter:</strong>
      </label>
      <input type="text" id="filter" value={ filter.value } onChange={ handleInputChange } />
      </div>
      <div className="large-6 columns">
        <strong>Selected: { selected.length }</strong>
      </div>
      <table style={ noSelect }>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Year</th>
            <th>Selected</th>
          </tr>
        </thead>
        <tbody
          style={{ cursor: 'pointer' }} 
          onMouseDown={ e => isMouseDown.value = true }
          onMouseUp={ e => isMouseDown.value = false }>
        {(() => {
          if (visible.length)
            return visible.map((x, i) =>
              <Tr key={ i } store={ store } state={ visible[i] } i={ i } />
            )
          else return (
            <tr>
              <td></td>
              <td>None found.</td>
              <td></td>
              <td></td>
            </tr>
          )
        })()}
        </tbody>
      </table>
    </div>
  )
}

// console.table(store.selected.slice().map(x => ({title: x.title, year: x.year})))

export default observer(App)
