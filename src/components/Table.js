import React from 'react'
import { observer } from 'mobx-react'
import cappedArgMap from 'lodash/fp/map'
const map = cappedArgMap.convert({ cap: false })
import {Tbody} from './Tbody'
import {Tr} from './Tr'

export const Table = observer(props => {
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
Table.displayName = 'Table'