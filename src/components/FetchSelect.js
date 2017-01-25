import React, { Component, PropTypes } from 'react'

import debounce from 'lodash/debounce'
import isFunction from 'lodash/isFunction'
import keys from 'lodash/keys'
import path from 'path'
import qs from 'qs'

import { DEFAULT_LANG } from '../utils/consts'

import Select from './Select'
import fetchJson from '../utils/fetch'

function composeFetchPath(endpoint, params = {}, searchTerm, termQuery) {
  let fetchPath
  let fetchParams = Object.assign({}, params)

  if (searchTerm) {
    if (!termQuery) throw new Error('Provide fetch.termQuery prop')

    fetchParams = Object.assign(fetchParams, {
      [termQuery]: searchTerm
    })
  }

  if (keys(fetchParams)) {
    fetchPath = path.join(endpoint, `?${qs.stringify(fetchParams)}`)
  }

  return fetchPath
}

class FetchSelect extends Component {
  static defaultProps = {
    fetch: {
      once: false,
      requestDelay: 300,
      termMinLength: 3,
    }
  }

  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onSearchTermChange: PropTypes.func,
    fetch: PropTypes.shape({
      ajaxClient: PropTypes.func,
      endpoint: PropTypes.string.isRequired,
      once: PropTypes.bool,
      params: PropTypes.object,
      requestDelay: PropTypes.number, // default: 300 (ms)
      responseDataFormatter: PropTypes.func,
      termQuery: PropTypes.string,
    }).isRequired,
    language: PropTypes.object,
    search: PropTypes.object,
  }

  constructor(props) {
    super(props)

    const { fetch } = props

    this.state = {
      fetched: false,
      error: false,
      isPending: false,
      options: [],
    }

    if (fetch.once) {
      this._fetchOptions = this._fetch
    } else {
      this._fetchOptions = debounce(this._fetch, fetch.requestDelay)
    }

    this.language = this._composeLanguageObject()
  }

  componentDidMount = () => {
    if (this.props.fetch.once) {
      this._fetchOptions()
    }
  }

  /**
   * Proxy interface methods of Select component
   */

  get value() {
    return this.selectRef.value
  }

  clear() {
    this.selectRef.clear()
  }

  _composeLanguageObject = () => {
    const { language, fetch: { termMinLength: minLength = 3 } } = this.props
    const lang = Object.assign({}, DEFAULT_LANG, language)

    lang.minLength = lang.minLength.replace(/\$\{minLength\}/, minLength)

    return lang
  }

  _fetch = searchTerm => {
    const { fetch: { ajaxClient, endpoint, params, responseDataFormatter, termQuery, } } = this.props

    if (!ajaxClient && endpoint !== 'string') {
      throw new Error('You must provide endpoint to fetch options.')
    }

    const fetchClient = ajaxClient || fetchJson
    const fetchPath = (endpoint && composeFetchPath(endpoint, params, searchTerm, termQuery)) || null

    this.setState({
      error: this.props.error || null,
      fetched: true,
      isPending: true,
    })

    fetchClient(fetchPath)
      .then(data => {
        let options = data
        if (isFunction(responseDataFormatter)) {
          options = data.map(responseDataFormatter)
        }

        this.setState({
          options: this._setOptions(options),
          error: false,
          isPending: false,
        })
      })
      .catch((error) => {
        console.warn(error) // eslint-disable-line no-console
        this.setState({
          error: true,
          isPending: false,
        })
      })
  }

  _getSelectRef = (node) => {
    this.selectRef = node
  }

  _setOptions = (options) => {
    this.selectRef.options = options
    return options
  }

  _onSearchTermChange = (e) => {
    const { fetch: { termMinLength = 3 }, onSearchTermChange } = this.props
    const { target: { value: term } } = e

    if (isFunction(onSearchTermChange)) {
      onSearchTermChange(e)
    }

    if (term.length >= termMinLength) {
      this._fetchOptions(term)
    }
  }

  _getStatus = () => {
    const { options, fetched, error, isPending } = this.state
    const { fetch: { once } } = this.props
    const {
      minLength,
      isPending: isPendingStatus,
      serverError,
      responseEmpty,
      isEmpty
    } = this.language

    if (isPending) {
      return isPendingStatus
    }

    if (!once) {
      if (!fetched) {
        return minLength
      } else if (error) {
        return serverError
      }

      return responseEmpty
    }

    if (!options.length) {
      return isEmpty
    }

    return null
  }

  render() {
    const { fetch: { once }, search, onSearchTermChange, ...props } = this.props // eslint-disable-line no-unused-vars
    const status = this._getStatus()

    return (
      <Select ref={ this._getSelectRef }
              search={ { show: !once, status, minimumResults: search.minimumResults } }
              onSearchTermChange={ this._onSearchTermChange }
              {...props}/>
    )
  }
}

export default FetchSelect
