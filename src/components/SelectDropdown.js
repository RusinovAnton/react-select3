import React, { Children, Component, PropTypes } from 'react'

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
        search: PropTypes.object.isRequired,
        value: PropTypes.string,
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
        // reset filterTerm if term === ''
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
            this.setState(Object.assign(SelectDropdown.initialState(), { options: propsOptions }))
        } else {
            const filterRegExp = new RegExp(filterTerm, 'gi')
            const options = propsOptions.filter(({ text: element }) => {
                // @fixme: getChildrenText is not perfect tbh
                const elementText = getChildrenText(element)

                return filterRegExp.test(elementText)
            })

            this.setState({ options })
        }
    }

    render = () => {
        // TODO: fetch dropdown
        // TODO: language
        const { highlighted, lang, isPending, search, value, onSelect } = this.props
        const { options } = this.state
        const language = Object.assign({}, LANG_RU, lang)
        const showSearch = search.minimumResults <= options.length

        return (
            <span className="pure-react-select__dropdown">
                { showSearch && <SelectSearchInput onChange={ this._onFilterTermChange }/> }
                <SelectOptionsList {...{ options, value, highlighted, onSelect }} />
            </span>
        )
    }
}

export default SelectDropdown
