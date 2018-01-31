import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import NagSuggest from '../../components/NagSuggest';
import 'jest-styled-components';

describe('<NagSuggest />', () => {
  let nagCreate, originalSetTimeout;

  beforeEach(() => {
    nagCreate = jest.fn();
  });

  beforeAll(() => {
    originalSetTimeout = window.setTimeout;
    window.setTimeout = (callback, time) => callback();
  });

  afterAll(() => {
    window.setTimeout = originalSetTimeout;
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<NagSuggest nagCreate={nagCreate} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct elements and children', () => {
    const nagSuggest = mount(<NagSuggest nagCreate={nagCreate} />);
    expect(nagSuggest.find('h5').text()).toBe('Or try the nags below');
    expect(nagSuggest.find('li').length).toBe(5);
    nagSuggest
      .find('button')
      .first()
      .simulate('click');
    expect(nagCreate.mock.calls.length).toBe(1);
  });
});
