import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import Nags from '../../components/Nags';
import 'jest-styled-components';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([]);

describe('<Nags />', () => {
  let nagNew,
    nagEdit,
    nagPause,
    nagResume,
    nagDelete,
    nagStatusUpdate,
    originalSetTimeout,
    dateNow;

  const nagList = [
    {
      id: 1,
      title: 'Test Nag 1',
      firstNag: 1234567890,
      nextNag: 1234567890,
      repeats: '1 min',
      status: 'LIVE',
      createdAt: 1234567890
    },
    {
      id: 2,
      title: 'Test Nag 2',
      firstNag: 1234567890,
      nextNag: 1234567890,
      repeats: '10 min',
      status: 'PAUSED',
      createdAt: 1234567890
    }
  ];

  beforeEach(() => {
    nagNew = jest.fn();
    nagEdit = jest.fn();
    nagPause = jest.fn();
    nagResume = jest.fn();
    nagDelete = jest.fn();
    nagStatusUpdate = jest.fn();
  });

  beforeAll(() => {
    dateNow = window.Date.now;
    window.Date.now = jest.fn(() => 1517227842390);
    originalSetTimeout = window.setTimeout;
    window.setTimeout = (callback, time) => callback();
  });

  afterAll(() => {
    window.Date.now = dateNow;
    window.setTimeout = originalSetTimeout;
  });

  describe('empty nag list', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(
          <Provider store={mockStore()}>
            <Nags
              nags={[]}
              nagNew={nagNew}
              nagEdit={nagEdit}
              nagPause={nagPause}
              nagResume={nagResume}
              nagDelete={nagDelete}
              nagStatusUpdate={nagStatusUpdate}
            />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct elements and children', () => {
      const nags = mount(
        <Provider store={mockStore()}>
          <Nags
            nags={[]}
            nagNew={nagNew}
            nagEdit={nagEdit}
            nagPause={nagPause}
            nagResume={nagResume}
            nagDelete={nagDelete}
            nagStatusUpdate={nagStatusUpdate}
          />
        </Provider>
      );

      expect(nags.find('h3').length).toBe(1);
      expect(nags.find('h3').text()).toBe('Nothing to nag about');
      expect(nags.find('button').length).toBe(6);
      nags
        .find('button')
        .first()
        .simulate('click');
      expect(nagNew.mock.calls.length).toBe(1);
    });
  });

  describe('populated nag list', () => {
    it('should match snapshot', () => {
      const tree = renderer
        .create(
          <Provider store={mockStore(fromJS({ query: null, sortBy: null }))}>
            <Nags
              nags={nagList}
              nagNew={nagNew}
              nagEdit={nagEdit}
              nagPause={nagPause}
              nagResume={nagResume}
              nagDelete={nagDelete}
              nagStatusUpdate={nagStatusUpdate}
            />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have correct elements and children', () => {
      const nags = mount(
        <Provider store={mockStore(fromJS({ query: null, sortBy: null }))}>
          <Nags
            nags={nagList}
            nagNew={nagNew}
            nagEdit={nagEdit}
            nagPause={nagPause}
            nagResume={nagResume}
            nagDelete={nagDelete}
            nagStatusUpdate={nagStatusUpdate}
          />
        </Provider>
      );

      expect(nags.find('ul').length).toBe(1);
      expect(nags.find('li').length).toBe(2);
    });
  });
});
