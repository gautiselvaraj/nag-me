import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Header from '../../components/Header';
import 'jest-styled-components';

describe('<Header />', () => {
  let nagIndex, nagNew;

  beforeEach(() => {
    nagIndex = jest.fn();
    nagNew = jest.fn();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(<Header nagIndex={nagIndex} nagNew={nagNew} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct elements and children', () => {
    const header = mount(<Header nagIndex={nagIndex} nagNew={nagNew} />);
    expect(header.find('header').length).toBe(1);
    expect(header.find('a[href="https://www.gauti.info/nag-me"]').length).toBe(
      1
    );
    expect(header.find('button[title="Nags Index"]').length).toBe(1);
    expect(header.find('button[title="Create a nag"]').length).toBe(1);
  });

  it('should call nagIndex', () => {
    const header = mount(<Header nagIndex={nagIndex} nagNew={nagNew} />);
    header.find('button[title="Nags Index"]').simulate('click');
    expect(nagIndex.mock.calls.length).toBe(1);
  });

  it('should call nagNew', () => {
    const header = mount(<Header nagIndex={nagIndex} nagNew={nagNew} />);
    header.find('button[title="Create a nag"]').simulate('click');
    expect(nagNew.mock.calls.length).toBe(1);
  });
});
