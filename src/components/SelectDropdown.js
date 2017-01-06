import React, { Component, PropTypes } from 'react'

import isFunction from 'lodash/isFunction'

import SelectSearchInput from './SelectSearchInput'
import SelectOptionsList from './SelectOptionsList'


const LANG_RU = {
    pending: 'Поиск...',
    // @fixme: hardcoded minlength
    minLength: 'Введите минимум 3 буквы',
    loading: 'Загрузка...',
    error: 'Не удалось получить данные!',
    empty: 'Ничего не найдено',
    emptyValue: '-',
}

class SelectDropdown extends Component {
    static propTypes = {
        highlighted: PropTypes.bool,
        lang: PropTypes.object,
        isPending: PropTypes.bool,
        onSearch: PropTypes.func,
        onSelect: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        search: PropTypes.object.isRequired,
        selectedOption: PropTypes.object.isRequired,
    }

    static initialState = () => ({
        filterTerm: null,
        options: [],
    })

    constructor(props) {
        super(props)

        const { options } = props
        this.state = Object.assign(SelectDropdown.initialState(), { options })
    }

    _onFilterTermChange = ({ target: { value: term } }) => {
        const { onSearch } = this.props
        const filterTerm = term || null

        if (isFunction(onSearch)) {
            onSearch(filterTerm)
        } else {
            this.setState({ filterTerm })
        }
    }

    componentWillUpdate = ({ options: propsOptions }, { filterTerm }) => {
        if (filterTerm === this.state.filterTerm) {
            return
        } else if (!filterTerm) {
            this.setState(Object.assign(SelectDropdown.initialState(), { options }))
        } else {
            const filterRegExp = new RegExp(filterTerm, 'gi')
            const options = propsOptions.filter(({ text }) => filterRegExp.test(text))

            this.setState({ options })
        }
    }

    render = () => {
        // TODO: fetch dropdown
        // TODO: language
        const { highlighted, lang, isPending, onSelect, search, selectedOption } = this.props
        const { options } = this.state
        const language = Object.assign({}, LANG_RU, lang)
        const showSearch = search.minimumResults <= this.props.options.length
        

        return ( 
            <span className="dropdown-wrapper">
                <span className="react-select-dropdown"> 
                    { showSearch && <SelectSearchInput onChange={ this._onFilterTermChange } /> } 
                    <SelectOptionsList {...{ options, selectedOption, highlighted, onSelect }} /> 
                </span> 
            </span>
        )
    }
}

export default SelectDropdown
