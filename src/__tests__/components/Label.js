import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Label from '../../components/Label';
import theme from '../../theme';
import 'jest-styled-components';

describe('<Label />', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Label theme={theme}>Label 1</Label>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct element, text, height & font-size based on small prop', () => {
    let label = mount(<Label theme={theme}>Label 1</Label>);
    expect(label.find('label').length).toBe(1);
    expect(label.find('label').text()).toBe('Label 1');
    expect(label.find('label')).toHaveStyleRule('font-size', '1rem');
    expect(label.find('label')).toHaveStyleRule('line-height', '2rem');

    label = mount(
      <Label small theme={theme}>
        Label 1
      </Label>
    );
    expect(label.find('label')).toHaveStyleRule('font-size', '.8rem');
    expect(label.find('label')).toHaveStyleRule('line-height', '1.5rem');
  });
});
