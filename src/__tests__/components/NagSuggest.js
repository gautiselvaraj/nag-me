import React from 'react';
import { mount } from 'enzyme';
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

  it('should match snapshot and have correct elements and children', () => {
    const nagSuggest = mount(<NagSuggest nagCreate={nagCreate} />);

    expect(nagSuggest).toMatchSnapshot();
    expect(nagSuggest.find('h5').text()).toBe('Or try the nags below');
    expect(nagSuggest.find('li').length).toBe(5);
    nagSuggest
      .find('button')
      .first()
      .simulate('click');
    expect(nagCreate.mock.calls.length).toBe(1);
  });
});
