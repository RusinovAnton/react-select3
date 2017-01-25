import React, { Component } from 'react'
// import Select from 'react-select3'

import Select, { FetchSelect } from 'react-select3'
import 'react-select3/dist/styles.css'


const dummy = [
  {
    id: 3,
    text: 'three'
  },
  {
    id: 4,
    text: 'four'
  },
  {
    id: 5,
    text: 'five'
  },
  {
    id: 6,
    text: 'six'
  },
  {
    id: 7,
    text: 'seven'
  },
  {
    id: 8,
    text: 'eight'
  },
  {
    id: 9,
    text: 'nine'
  },
  {
    id: 10,
    text: 'ten'
  },
  {
    id: 11,
    text: 'eleven'
  },
  {
    id: 12,
    text: 'twelve'
  },
];

const dummy2 = [
  {
    id: 13,
    text: 'ninety three'
  },
  {
    id: 14,
    text: 'ninety four'
  },
  {
    id: 15,
    text: 'ninety five'
  },
  {
    id: 16,
    text: 'ninety six'
  },
  {
    id: 17,
    text: 'ninety seven'
  },
  {
    id: 18,
    text: 'ninety eight'
  },
  {
    id: 19,
    text: 'ninety nine'
  },
  {
    id: 110,
    text: 'ninety ten'
  },
  {
    id: 111,
    text: 'ninety eleven'
  },
  {
    id: 12,
    text: 'ninety twelve'
  },
];


const ajaxClient = (endpoint) => {
  console.log(endpoint)

  return Promise.resolve(dummy)
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null,
      searchTerm: '',
      disabled: false,
      selectedOption: null,
      error: false,
      options: dummy
    }
  }

  _onSearchTermChange = ({ target: { value: searchTerm } }) => {
    console.log(searchTerm)
    this.setState({
      searchTerm
    })
  }

  _onSelect = (e) => {
    console.log(e)
    this.setState({ value: e.target.value, selectedOption: e.target.option })
  }

  _resetSelect = () => {
    this.selectRef.clear()
  }

  _setDummyOptions = () => {
    this.selectRef.options = dummy2
  }

  _toggleDisabled = () => {
    this.setState(({ disabled }) => ({
      disabled: !disabled
    }))
  }

  _toggleError = () => {
    this.setState(({ error }) => ({
      error: !error
    }))
  }

  _getSelectRef = (node) => {
    this.selectRef = node
  }

  _formSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    console.dir(e.target)
    for (let entry of formData.entries()) {
      console.log(entry)
    }
  }

  render() {
    const { searchTerm, disabled, selectedOption, error } = this.state

    return (
      <div>
        <FetchSelect fetch={{ ajaxClient, once: true }}/>
        <div>
          <p>
            search term: { searchTerm }
          </p>
          <p>
            is disabled: { String(disabled) }
          </p>
          <p>
            selectedOption: { JSON.stringify(selectedOption) }
          </p>
          <p>
            <button onClick={ this._resetSelect }>
              Reset
            </button>
            <button onClick={ this._setDummyOptions }>
              Set dummy options
            </button>
            <button onClick={ this._toggleDisabled }>
              { disabled ? 'Enable' : 'Disable' }
            </button>
            <button onClick={ this._toggleError }>
              Toggle error
            </button>
          </p>
        </div>
        <form action="#" onSubmit={this._formSubmit}>
          <input type="text" name="dummyName"/>
          <input type="text" name="dummyName2"/>
          <Select name="dummyData3" options={ dummy } placeholder="Select me"/>
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }
}

export default App