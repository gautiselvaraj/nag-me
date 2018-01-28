import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';
import 'jest-styled-components';

describe('<App />', () => {
  it('works', () => {
    const wrapper = shallow(<App nagInit={jest.fn()} activePage="Index" />);
  });

  it('match snapshot', () => {
    expect(
      shallow(<App nagInit={jest.fn()} activePage="Index" />)
    ).toMatchSnapshot();
  });
});
