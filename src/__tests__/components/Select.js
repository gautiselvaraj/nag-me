import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Select from '../../components/Select';
import theme from '../../theme';
import 'jest-styled-components';

describe('<Select />', () => {
  describe('without error and label', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(
          <Select theme={theme}>
            <option>Option 1</option>
          </Select>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct element, text, height & font-size based on small prop', () => {
      let select = mount(
        <Select theme={theme}>
          <option>Option 1</option>
        </Select>
      );
      expect(select.find('select').length).toBe(1);
      expect(select.find('select option').text()).toBe('Option 1');
      expect(select.find('select')).toHaveStyleRule('font-size', '1rem');
      expect(select.find('select')).toHaveStyleRule('height', '2rem');

      select = mount(
        <Select small theme={theme}>
          <option>Option 1</option>
        </Select>
      );
      expect(select.find('select')).toHaveStyleRule('font-size', '.85rem');
      expect(select.find('select')).toHaveStyleRule('height', '1.5rem');
    });
  });

  describe('with error and label', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(
          <Select label="Label 1" error="Error 1" theme={theme}>
            <option>Option 1</option>
          </Select>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have label element if passed', () => {
      const select = mount(
        <Select label="Label 1" error="Error 1" theme={theme}>
          <option>Option 1</option>
        </Select>
      );
      expect(select.find('label').length).toBe(1);
      expect(select.find('label').text()).toBe('Label 1');
    });
  });
});
