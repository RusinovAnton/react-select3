# REACT-SELECT3

[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/react-select3)
[![Build Status](https://travis-ci.org/RusinovAnton/react-select3.svg?branch=master)](https://travis-ci.org/RusinovAnton/react-select3)

This is `<select>` written with ReactJS.

## Motivation:

* Easy styling
* Easy control
* Easy fetching

## [Demo](https://rusinovanton.github.io/react-select3/)

## API reference

### Select

Basic usage:

```javascript
import Select from 'react-select3'
import 'react-select3/dist/styles.css'

const selectOptions = [
    { id: 1, text: 'Uno' },
    { id: 2, text: 'Dos' },
    { id: 3, text: 'Tres' },
    { id: 4, text: 'Cuatro' },
]

<Select options={ selectOptions } placeholder={'Select option'}/>
```

Props:

| PropName                              | PropType              | Description                                                                                                     |
| ------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------- |
| **_allowClear_**                      | `<bool>`              | whether to allow user to clear selected option _`// Default: false`_                                            |
| **_cssClassNamePrefix_**              | `<string>`            | you can provide custom prefix for Selects' classNames                                                           |
| **_autoFocus_**                       | `<bool>`              | whether to focus Select on mount                                                                                |
| **_closeOnClickOutside_**             | `<bool>`              | whether to close dropdown on click outside Select component _`// Default: true`_                                |
| **_defaultValue_**                    | `<string>`/`<number>` | provide id of the default selected option                                                                       |
| **_disabled_**                        | `<bool>`              | disable selecting and reseting                                                                                  |
| **_error_**                           | `<bool>`/`<string>`   | you can provide boolean to indicate Select's error or string to show error message                              |
| **_layout_**                          | `<object>`            | props related to Select component view                                                                          |
| **_layout.width_**                    | `<string>`            | width for Select container _`// Default: '245px'`_                                                              |
| **_layout.dropdownVerticalPosition_** | 'above'/ 'below'      | whether to show dropdown above or below Select container _`// Default: 'below'`_                                |
| **_layout.emptyOptionsLabel_**        | `<string>`            | label that shows up when there is no options left                                                               |
| **_name_**                            | `<string>`            | Selects name attribute                                                                                          |
| **_optionRenderer_**                  | `<function>`          | function that transforms single option output, you can provide it if you want to change layout of options e.g.: |
|                                       |

```javascript
const optionRenderer = option => (
  <strong className="my-custom-option">
    <i className={`fa fa-${icons[option.id]}`} />
    {option.text}
  </strong>
);
```

| PropName       | PropType     | Description                                                                                            |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| **_options_**  | `<array>`    | array with options object. they must have next format: `{ id: <number|string>, text: <number|string>}` |
| **_onSelect_** | `<function>` | callback on options select event. event object that passed into callback has next format:              |

```javascript
{
  type: 'select',
  isClear: <bool>, // indicates that value being cleared by onClearSelection
  target: {
    name: <string>, // Selects' name attribute
    option: <object>, // selected option object
    value: <string>, // selected option id
  }
}
```

| PropName                    | PropType              | Description                                                                                                                             |
| --------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **_placeholder_**           | `<string>`            | shows up when there is no selected option                                                                                               |
| **_search_**                | `<object>`            | props related to SearchInput, which used to filter options list, you can override its behaviour by providing `onSearchTermChange` prop. |
| **_search.minimumResults_** | `<number>`            | minimum number of results before show SearchInput                                                                                       |
| **_search.show_**           | `<bool>`              | provide if you want to always show SearchInput                                                                                          |
| **_search.status_**         | `<string>`            | provide status message, shows up only when there are no available options                                                               |
| **_onSearchTermChange_**    | `<function>`          | callback for SearchInput changes, takes input event as agrument                                                                         |
| **_value_**                 | `<number>`/`<string>` | you can provide option id to control selection                                                                                          |

### Selects ref interface methods

Select component has number of handy public methods that you can use by saving its ref, e.g.:

```javascript
class MyMajesticComponent extends React.Component {
  _selectRef = node => {
    this.select = node;
  };

  _resetSelect = () => {
    this.select.clear();
  };

  render = () => {
    return (
      <div>
        <Select ref={this._selectRef} />
        <button onClick={this._resetSelect}>Reset</button>
      </div>
    );
  };
}
```

Methods:

| Method name   | Method type | Description                                                                                                                                                                        |
| ------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **_clear_**   |             | use it to clear selection programmaticaly                                                                                                                                          |
| **_options_** | `<setter>`  | sets options for Select component. `Select.options = [/* new options */]`. This setter is used by `FetchSelect` to set fetched options to Select component without rerendering it. |
| **_options_** | `<getter>`  | returns array of actual options from Selects' state `Select.options // options array`                                                                                              |
| **_value_**   |             | returns id of currently selected option `Select.value // selected option's id`                                                                                                     |

### FetchSelect

This component is a wrapper for Select component  
that provides interface for fetching options from server by "termQuery"  
on SearchInput change event, or once at component mount.

Usage:

```javascript
import { FetchSelect as Select } from 'react-select3'
import 'react-select3/dist/styles.css'

// function that formats fetched objects into options
const responseDataFormatter = user => ({
    // required keys
    id: user._id,
    text: `${user.first_name} ${user.last_name}`,

    // Additional info that you can display in the options layout with "optionRenderer" function
    phone: user.phone,
    email: user.email,
})

// By default FetchSelect uses its own client that based on fetch,  
// also you can provide your custom 'ajaxClient'  
// e.g. endpoint: '/api/users/?filter=John&emailVerified=0'  
const ajaxClient = (endpoint) => fetch(endpoint).then(data => data.users)

<Select fetch={{
            endpoint: '/api/users',
            termQuery: 'filter',
            responseDataFormatter,
            ajaxClient,
            params: { emailVerified: 0 }
        }}
        placeholder='Select user by typing his name'/>
```

All ref interface methods and props except of  
`search.show`, `search.status` and `search.minimumResults`(if fetch.once = false)  
are being proxied onto Select component.

There are a number of FetchSelect specific props:

| PropName               | PropType     | Description                                                                                                                                        |
| ---------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **_fetch_**            | `<object>`   | props that related to fetching options from server                                                                                                 |
| **_fetch.ajaxClient_** | `<function>` | custom client to fetch options, it must return `<Promise>`                                                                                         |
| **_fetch.endpoint_**   | `<string>`   | path to resource to fetch                                                                                                                          |
| **_fetch.minLength_**  | `<number>`   | minimum characters length of SearchInput value to start fetching _`// Default: 3`_                                                                 |
| **_fetch.once_**       | `<bool>`     | if true, options fetched once on FetchSelect mount, in this case SearchInput change not triggers fetch again but filters options that are in state |
| **_fetch.params_**     | `<object>`   | additional params that being merged with "termQuery" into endpoint e.g.                                                                            |

```javascript
SearchInput.value = 'John';

fetch = {
  endpoint: '/api/users',
  termQuery: 'filter',
  params: {
    emailVerified: 0,
  },
};

// fetch path: '/api/users?filter=John&emailVerified=0'
```

| PropName                          | PropType     | Description                                                                           |
| --------------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| **_fetch.requestDelay_**          | `<number>`   | delay between request on SearchInput change _`// Default: 300`_                       |
| **_fetch.responseDataFormatter_** | `<function>` | function that formats fetched objects into options. See example above                 |
| **_fetch.termQuery_**             | `<string>`   | key for dynamic query param that takes SearchInput value on change. See example above |
| **_language_**                    | `<object>`   | pass language object to override default status labels:                               |

```javascript
{
  isEmpty: 'No options.',
  isPending: '...',
  minLength: 'Minimum ${minLength} to search...',
  responseEmpty: 'Cannot find anything.',
  serverError: 'Server error.',
}
```

### Styling

You can style Select component in a several ways:

* Use default Select component styles by importing them from dist folder(TODO: skins):  
  `import 'react-select3/dist/styles.css'`
* Use scss source from `react-select3/src/styles/...`, override specific variables and mixins  
  and compile into custom style
* Write your own styles from scratch, you can even provide custom cssClassNamePrefix by passing prop  
  into Select component and change variable in the scss source code

## License

react-select3 Copyright 2017 Rusinov Anton

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Changelog

[Changelog](https://github.com/RusinovAnton/react-select3/releases)

### Credits

⭐️ Thanks for help to:

* Artem Berdyshev
