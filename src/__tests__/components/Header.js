import React from 'react';
import { mount } from 'enzyme';
import Header from '../../components/Header';
import 'jest-styled-components';

describe('<Header />', () => {
  let nagIndex, nagNew, header;

  beforeEach(() => {
    nagIndex = jest.fn();
    nagNew = jest.fn();
    header = mount(<Header nagIndex={nagIndex} nagNew={nagNew} />);
  });

  it('should match snapshot and have correct elements and children', () => {
    expect(header).toMatchSnapshot();
    expect(header.find('header').length).toBe(1);
    expect(header.find('a[href="https://www.gauti.info/nag-me"]').length).toBe(
      1
    );
    expect(header.find('button[title="Nags Index"]').length).toBe(1);
    expect(header.find('button[title="Create a nag"]').length).toBe(1);
  });

  it('should call nagIndex', () => {
    header.find('button[title="Nags Index"]').simulate('click');
    expect(nagIndex.mock.calls.length).toBe(1);
  });

  it('should call nagNew', () => {
    header.find('button[title="Create a nag"]').simulate('click');
    expect(nagNew.mock.calls.length).toBe(1);
  });
});
