import React, { Children, Component, PropTypes } from 'react'

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


const SelectDropdown = ({
    highlighted,
    isPending,
    lang,
    onSearchTermChange,
    onSelect,
    options,
    requestSearch,
    search,
    searchTerm,
    value,
}) => {
    const language = Object.assign({}, LANG_DEFAULT, lang)
    const showSearch = requestSearch || search.minimumResults <= options.length

    return (
        <span className="pure-react-select__dropdown">
            { showSearch &&
                <SelectSearchInput value={ searchTerm } onChange={ onSearchTermChange }/> }
            { isPending && !options.length ?
                'Loading...'
                : <SelectOptionsList {...{ options, value, highlighted, onSelect }} />
            }
        </span>
    )
}

SelectDropdown.propTypes = {
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

export default SelectDropdown
