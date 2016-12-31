import React, { Component, PropTypes } from 'react'

import SelectSearchInput from './SelectSearchInput'
import SelectOptionsList from './SelectOptionsList'


class SelectDropdown extends Component {

  static propTypes = {
    data: PropTypes.array,
    dropdownOpened: PropTypes.bool,
    highlighted: PropTypes.number,
    onContainerKeyDown: PropTypes.func,
    onSelect: PropTypes.func,
    searchShow: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      })
    ]),
  }

  static getInitialState = () => ({
    filterTerm: null,
    optionsData: null,
  })

  constructor() {
    super(...arguments)

    this.state = Object.assign(SelectDropdown.getInitialState(), { optionsData: this.props.data })
  }

  onFilterTermChange = ({ target: { value: filterTerm } }) => {
    if (!filterTerm) {
      filterTerm = null // eslint-disable-line no-param-reassign
    }

    this.setState({ filterTerm })
  }

  componentWillReceiveProps = ({ data }) => {
    this.setState(Object.assign(SelectDropdown.getInitialState(), { optionsData: data }))
  }

  componentWillUpdate = ({ data }, { filterTerm }) => {
    if (filterTerm === this.state.filterTerm) return
    if (!filterTerm) {
      this.setState(Object.assign(SelectDropdown.getInitialState(), { optionsData: data }))
      return
    }

    const filterRegExp = new RegExp(filterTerm, 'gi')
    const optionsData = data.filter(({ text }) => filterRegExp.test(text))

    this.setState({ optionsData })
  }

  render = () => {
    if (!this.props.dropdownOpened) {
      return null
    }

    const { optionsData } = this.state
    const { highlighted, onSelect, searchShow, value, onContainerKeyDown } = this.props

    return (
      <span className="dropdown-wrapper">
        <span className="react-select-dropdown">
          { searchShow &&
          <SelectSearchInput onTermChange={ this.onFilterTermChange } onKeyDown={ onContainerKeyDown }/>
          }
          <SelectOptionsList {...{ data: optionsData, value, highlighted, onSelect }}/>
        </span>
      </span>
    )
  }
}

export default SelectDropdown
