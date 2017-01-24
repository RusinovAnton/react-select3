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
    if (!termQuery) throw new Error('Provide request.termQuery prop')

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
    request: {
      once: false,
      requestDelay: 300,
      termMinLength: 3,
    }
  }

  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onSearchTermChange: PropTypes.func,
    request: PropTypes.shape({
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

    const { request } = props

    this.state = {
      fetched: false,
      error: false,
      isPending: false,
      options: [],
    }

    if (!request.once) {
      this._requestOptions = debounce(this._request, request.requestDelay)
    } else {
      this._requestOptions = this._request
    }

    this.language = this._composeLanguageObject
  }

  _composeLanguageObject = () => {
    const { language, request: { termMinLength: minLength = 3 } } = this.props
    const lang = Object.assign({}, DEFAULT_LANG, language)

    lang.minLength = lang.minLength.replace(/\$\{minLength\}/, minLength)

    return lang
  }

  _request = searchTerm => {
    const { request: { ajaxClient, endpoint, params, responseDataFormatter, termQuery, } } = this.props

    const fetchClient = ajaxClient || fetchJson
    const fetchPath = composeFetchPath(endpoint, params, searchTerm, termQuery)

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
      .catch(() => {
        this.setState({
          error: true,
          isPending: false,
        })
      })
  }

  componentDidMount = () => {
    if (this.props.request.once) {
      this._request()
    }
  }

  _setOptions = (options) => {
    this.selectRef.options = options
  }

  _onSearchTermChange = (e) => {
    const { request: { termMinLength }, onSearchTermChange } = this.props
    const { target: { value: term } } = e

    if (isFunction(onSearchTermChange)) {
      onSearchTermChange(e)
    }

    if (term.length >= termMinLength) {
      this._requestOptions(term)
    }
  }

  _getStatus = () => {
    const { options, fetched, error, isPending } = this.state
    const { request: { once } } = this.props
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
    const { request: { once }, search, onSearchTermChange, ...props } = this.props // eslint-disable-line no-unused-vars

    return (
      <Select search={ { show: !once, status: this._getStatus() } }
              onSearchTermChange={ this._onSearchTermChange }
              {...props}/>
    )
  }
}

export default FetchSelect
