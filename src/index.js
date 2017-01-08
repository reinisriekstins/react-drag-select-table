import React from 'react'
import { render } from 'react-dom'
import { Tbody, Tr } from './components/DragSelect' //{ Tbody, Tr }
import SelectAllVisible from './components/SelectAllVisible'
import DeselectAll from './components/DeselectAll'
import Selected from './components/Selected'
import Filter from './components/Filter'
import CreateStore from './store'
import { observer } from 'mobx-react'
import cappedArgMap from 'lodash/fp/map'
const map = cappedArgMap.convert({ cap: false })
import './foundation.css'
import data from './sample-data'

const store = window.store = CreateStore(data)

const MyTable = observer(props => {
  const { store, ...rest } = props
  return (
    <table { ...rest }>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Year</th>
        </tr>
      </thead>
      <Tbody store={ store }>
      {
        (() => {
          const { filtered } = store
          if (filtered.length)
            return map((state, i) => {
              const { title, year } = state
              return (
                <Tr
                  key={ i }
                  store={ store }
                  state={ state }
                  i={ i }>
                  <td>{ i }</td>
                  <td>{ title }</td>
                  <td>{ year }</td>
                </Tr>
              )
            })(filtered)
          return (
            <tr>
              <td></td>
              <td>None found.</td>
              <td></td>
              <td></td>
            </tr>
          )
        })()
      }
      </Tbody>
    </table>
  )
})

render(
  <div className="row">
    <div className="large-6 columns">
      <div className="row">
        <div className="large-6 medium-6 columns">
          <label htmlFor="filter">
            <strong>Filter:</strong>
          </label>
          <Filter store={ store } id="filter" />
        </div>
        <div className="large-6 medium-6 columns">
          <Selected label="Selected: " store={ store } />
        </div>
      </div>
      <div className="row">
        <div className="large-6 medium-6 columns">
          <SelectAllVisible store={ store } className="button expanded">
            Select All Visible
          </SelectAllVisible>
        </div>
        <div className="large-6 medium-6 columns">
          <DeselectAll store={ store } className="button expanded">
            Deselect All
          </DeselectAll>
        </div>
      </div>
      <MyTable store={ store } />
    </div>
    <div className="large-6 columns">
    </div>
  </div>,
  document.getElementById('root')
)
