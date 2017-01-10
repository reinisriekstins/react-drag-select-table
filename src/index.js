import React from 'react'
import { render } from 'react-dom'
import {
  Table,
  SelectAllVisible,
  DeselectAll,
  Selected,
  Filter,
  CreateStore
} from './exports'

import data from './sample-data'
import './foundation.css'

const store = window.store = CreateStore(data)

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
      <Table store={ store } />
    </div>
    <div className="large-6 columns">
    </div>
  </div>,
  document.getElementById('root')
)
