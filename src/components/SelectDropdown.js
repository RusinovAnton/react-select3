import React, { Children, Component, PropTypes } from 'react'

import isFunction from 'lodash/isFunction'
import { stopPropagation } from '../utils/events'

import SelectOptionsList from './SelectOptionsList'
import SelectSearchInput from './SelectSearchInput'


const LANG_DEFAULT = {
    empty: 'Ничего не найдено',
    emptyValue: '-',
    error: 'Не удалось получить данные!',
    loading: 'Загрузка...',
    // @fixme: hardcoded minlength
    minLength: 'Введите минимум 3 буквы',
    pending: 'Поиск...',
}

const getChildrenText = element => {
    if (typeof element === 'string') return element

    return getChildrenText(Children.toArray(element)[0].props.children)
}

class SelectDropdown extends Component {
    static propTypes = {
        highlighted: PropTypes.number,
        isPending: PropTypes.bool,
        lang: PropTypes.object,
        onSearch: PropTypes.func,
        onSelect: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        requestSearch: PropTypes.bool,
        search: PropTypes.object.isRequired,
        value: PropTypes.string,
    }

    constructor(props, context) {
        super(props, context)

        this.state = {
            searchTerm: null,
            options: props.options,
        }
    }

    _onSearchTermChange = ({ target: { value: term } }) => {
        const { onSearch } = this.props
        // reset searchTerm if term === ''
        const searchTerm = term || null

        if (isFunction(onSearch)) {
            onSearch(searchTerm)
        } else {
            this.setState({ searchTerm })
        }
    }

    componentWillUpdate = ({ options: propsOptions }, { searchTerm }) => {
        if (searchTerm === this.state.searchTerm) {
            return
        } else if (!searchTerm) {
            this.setState(Object.assign(SelectDropdown.initialState(), { options: propsOptions }))
        } else {
            const searchRegExp = new RegExp(searchTerm, 'gi')
            const options = propsOptions.filter(({ text: element }) => {
                // @fixme: getChildrenText is not perfect tbh
                const elementText = getChildrenText(element)

                return searchRegExp.test(elementText)
            })

            this.setState({ options })
        }
    }

    render = () => {
        // TODO: fetch dropdown
        // TODO: language
        const {
            highlighted,
            isPending,
            lang,
            onSelect,
            requestSearch,
            search,
            value,
        } = this.props

        const { options } = this.state
        const language = Object.assign({}, LANG_DEFAULT, lang)
        const showSearch = requestSearch || search.minimumResults <= options.length

        return (
            <span className="pure-react-select__dropdown">
                { showSearch && <SelectSearchInput onClick={ stopPropagation() } onChange={ this._onSearchTermChange }/> }
                <SelectOptionsList {...{ options, value, highlighted, onSelect }} />
            </span>
        )
    }
}

export default SelectDropdown
