// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
import { lang } from './src/components/Select';


global.shallow = shallow;
global.render = render;
global.mount = mount;

// Skip createElement warnings but fail tests on any other warning
console.error = message => {
    if (!/(React.createElement: type should not be null)/.test(message)) {
        throw new Error(message);
    }
};

global.selectContext = { lang }

