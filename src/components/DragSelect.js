import React from 'react'
import { observer } from 'mobx-react'
import Table from './Table'
import Tbody from './Tbody'
import Tr from './Tr'
import cappedArgMap from 'lodash/fp/map'
const map = cappedArgMap.convert({ cap: false })

const DragSelect = props => {
  const
    { store, children } = props,
    { filtered } = store

  console.log(children)

  if ( !children ) return (
    <table>
      <thead>
        <tr>
          <th>#</th>
        {
          map((val, key) =>
            <th key={ key }>{ key }</th>
          )(store.all[0])
        }
        </tr>
      </thead>
      <Tbody store={ store }>
      {
        (() => {
          if (filtered.length)
            return map((state, i) => {
              return (
                <Tr
                  key={ i }
                  store={ store }
                  state={ state }
                  i={ i }>
                  <td>{ i }</td>
                {
                  map((prop, key) =>
                    <td key={ key }>{ prop }</td>
                  )(state)
                }
                </Tr>
              )
            })(filtered)
        })()
      }
      </Tbody>
    </table>
  )
  else throw new Error('something went wrong')
}

export { Tr, Tbody, Table }

// console.table(store.selected.slice().map(x => ({title: x.title, year: x.year})))

export default observer(DragSelect)
