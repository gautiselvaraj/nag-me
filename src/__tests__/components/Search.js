import React from 'react';
import { mount } from 'enzyme';
import Search from '../../components/Search';
import theme from '../../theme';
import 'jest-styled-components';

describe('<Search />', () => {
  it('should match snapshot and have correct elements & styles', () => {
    let search = mount(<Search theme={theme} />);
    expect(search).toMatchSnapshot();
    expect(search.find('input[placeholder="Search"]').length).toBe(1);
    expect(search).toHaveStyleRule('content', "'\\e986'", {
      modifier: ':before'
    });
  });
});
