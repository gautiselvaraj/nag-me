import React from 'react';
import { mount } from 'enzyme';
import Input, { InputError } from '../../components/Input';
import theme from '../../theme';
import 'jest-styled-components';

describe('<Input />', () => {
  it('should match snapshot and have correct element height & font-size based on small prop', () => {
    let input = mount(<Input theme={theme} />);
    expect(input).toMatchSnapshot();
    expect(input.find('input').length).toBe(1);
    expect(input.find('input')).toHaveStyleRule('font-size', '1rem');
    expect(input.find('input')).toHaveStyleRule('height', '2rem');

    input = mount(<Input small theme={theme} />);
    expect(input.find('input')).toHaveStyleRule('font-size', '.85rem');
    expect(input.find('input')).toHaveStyleRule('height', '1.5rem');
  });

  it('should match snapshot and have label and error element if passed', () => {
    let input = mount(<Input label="Label 1" error="Error 1" theme={theme} />);
    expect(input).toMatchSnapshot();
    expect(input.find('label').length).toBe(1);
    expect(input.find('label').text()).toBe('Label 1');
    expect(input.find(InputError).text()).toBe('Error 1');
    expect(input.find(InputError)).toHaveStyleRule('color', 'red');
  });
});
