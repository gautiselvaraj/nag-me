import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { App } from '../App';
import 'jest-styled-components';

describe('<App />', () => {
  it('should match snapshot', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <App nagInit={jest.fn()} activePage="Index" />
    );
    expect(tree).toMatchSnapshot();
  });
});
