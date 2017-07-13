import React, { Component } from 'react'
import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'
import isFunction from 'lodash/isFunction'
import keys from 'lodash/keys'
import qs from 'qs'

import { DEFAULT_LANG } from '../utils/consts'

import Select from './Select'
import fetchJson from '../utils/fetch'

function composeFetchPath(endpoint, params = {}, searchTerm, termQuery) {
  let fetchPath;
  let fetchParams = Object.assign({}, params);

  if (searchTerm) {
    if (!termQuery) throw new Error('Provide fetch.termQuery prop');

    fetchParams = Object.assign(fetchParams, {
      [termQuery]: searchTerm,
    })
  }

  if (keys(fetchParams)) {
    fetchPath = `${endpoint}?${qs.stringify(fetchParams)}`
  }

  return fetchPath
}

class FetchSelect extends Component {
  constructor(props) {
    super(props);

    const { fetch } = props;

    this.state = {
      fetched: false,
      error: false,
      isPending: false,
      options: [],
    };

    if (fetch.once) {
      this.fetchOptions = this.fetch
    } else {
      this.fetchOptions = debounce(this.fetch, fetch.requestDelay)
    }

    this.language = this.composeLanguageObject()
  }

  static defaultProps = {
    search: {},
    fetch: {
      once: false,
      requestDelay: 300,
      termMinLength: 3,
    },
  };

  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onSearchTermChange: PropTypes.func,
    fetch: PropTypes.shape({
      ajaxClient: PropTypes.func,
      endpoint: PropTypes.string,
      minLength: PropTypes.number,
      once: PropTypes.bool,
      params: PropTypes.object,
      requestDelay: PropTypes.number, // default: 300 (ms)
      responseDataFormatter: PropTypes.func,
      termQuery: PropTypes.string,
    }).isRequired,
    language: PropTypes.object,
    search: PropTypes.object,
  };

  /**
   * Proxy interface methods of Select component
   */
  clear() {
    this.selectRef.clear()
  }

  get options() {
    return this.selectRef.options
  }

  get valid() {
    return this.selectRef.valid
  }

  get value() {
    return this.selectRef.value
  }

  componentDidMount = () => {
    if (this.props.fetch.once) {
      this.fetchOptions()
    }
  };

  componentWillReceiveProps({ error }) {
    const { error: stateError } = this.state;

    if (typeof error === 'undefined') {
      return stateError
    }

    return error
  }

  composeLanguageObject = () => {
    const { language, fetch: { termMinLength: minLength = 3 } } = this.props;
    const lang = Object.assign({}, DEFAULT_LANG, language);

    lang.minLength = lang.minLength.replace(/\$\{minLength\}/, minLength);

    return lang
  };

  fetch = searchTerm => {
    const { fetch: { ajaxClient, endpoint, params, responseDataFormatter, termQuery } } = this.props;

    if (!ajaxClient && typeof endpoint !== 'string') {
      throw new Error('You must provide endpoint to fetch options.')
    }

    const fetchClient = ajaxClient || fetchJson;
    const fetchPath = (endpoint && composeFetchPath(endpoint, params, searchTerm, termQuery)) || null;

    this.setState({
      error: this.props.error || null,
      fetched: true,
      isPending: true,
    });

    fetchClient(fetchPath)
      .then(data => {
        let options = data;

        if (isFunction(responseDataFormatter)) {
          options = data.map(responseDataFormatter)
        }

        this.setState({
          options: this.setOptions(options),
          error: false,
          isPending: false,
        })
      })
      .catch((error) => {
        console.warn(error); // eslint-disable-line no-console
        this.setState({
          error: true,
          isPending: false,
        })
      })
  };

  getSelectRef = (node) => {
    this.selectRef = node
  };

  setOptions = (options) => {
    this.selectRef.options = options;

    return options
  };

  onSearchTermChange = (e) => {
    const { fetch: { termMinLength = 3 }, onSearchTermChange } = this.props;
    const { target: { value: term } } = e;

    if (isFunction(onSearchTermChange)) {
      onSearchTermChange(e)
    }

    if (term.length >= termMinLength) {
      this.fetchOptions(term)
    }
  };

  getStatus = () => {
    const { options, fetched, error, isPending } = this.state;
    const { fetch: { once } } = this.props;
    const {
      isEmpty,
      isPending: isPendingStatus,
      minLength,
      responseEmpty,
      serverError,
    } = this.language;

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
  };

  render() {
    const { fetch: { once }, search, onSearchTermChange, ...props } = this.props; // eslint-disable-line no-unused-vars
    const status = this.getStatus();

    return (
      <Select
        ref={this.getSelectRef}
        search={{ show: !once, status, minimumResults: once ? search.minimumResults : undefined }}
        onSearchTermChange={this.onSearchTermChange}
        {...props}
      />
    )
  }
}

export default FetchSelect
