import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';
import 'jest-styled-components';

describe('<App />', () => {
  it('should match snapshot', () => {
    expect(
      shallow(<App nagInit={jest.fn()} activePage="Index" />)
    ).toMatchSnapshot();
  });
});
