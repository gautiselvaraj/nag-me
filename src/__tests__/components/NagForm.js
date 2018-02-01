import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import MockDate from 'mockdate';
import NagForm from '../../components/NagForm';
import 'jest-styled-components';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([]);

describe('<NagForm />', () => {
  let nagIndex, nagPause, nagCreate, nagUpdate;
  const nagObject = {
    id: 1,
    title: 'Test Nag 1',
    firstNag: 1234567890,
    nextNag: 1234567890,
    repeats: '1 min',
    status: 'LIVE',
    createdAt: 1234567890
  };

  beforeAll(() => {
    MockDate.set('10/10/2016');
  });

  afterAll(() => {
    MockDate.reset();
  });

  beforeEach(() => {
    nagIndex = jest.fn();
    nagCreate = jest.fn();
    nagUpdate = jest.fn();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={mockStore()}>
          <NagForm
            nagIndex={nagIndex}
            nagCreate={nagCreate}
            nagUpdate={nagUpdate}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct elements and children', () => {
    const nagForm = mount(
      <Provider store={mockStore()}>
        <NagForm
          nagIndex={nagIndex}
          nagCreate={nagCreate}
          nagUpdate={nagUpdate}
        />
      </Provider>
    );
    expect(nagForm.find('button[title="Back"]').length).toBe(1);
    expect(nagForm.find('h3').length).toBe(1);
    expect(nagForm.find('h3').text()).toBe('Create a nag');
    expect(nagForm.find('input#nag_title').length).toBe(1);
    expect(nagForm.find('input#nag_on').length).toBe(1);
    expect(nagForm.find('select#nag_repeats').length).toBe(1);
    expect(nagForm.find('button[type="submit"]').length).toBe(1);
  });

  it('should call nagIndex', () => {
    const nagForm = mount(
      <Provider store={mockStore()}>
        <NagForm
          nagIndex={nagIndex}
          nagCreate={nagCreate}
          nagUpdate={nagUpdate}
        />
      </Provider>
    );
    nagForm.find('button[title="Back"]').simulate('click');
    expect(nagIndex.mock.calls.length).toBe(1);
  });

  it('should call nagCreate when all fields are valid', () => {
    const nagForm = mount(
      <Provider store={mockStore()}>
        <NagForm
          nagIndex={nagIndex}
          nagCreate={nagCreate}
          nagUpdate={nagUpdate}
        />
      </Provider>
    );
    nagForm.find('form').simulate('submit');
    expect(nagCreate.mock.calls.length).toBe(0);

    const nagTitle = nagForm.find('input#nag_title');
    nagTitle.instance().value = 'Nag Title';
    nagTitle.simulate('change', nagTitle);
    const nagOn = nagForm.find('input#nag_on');
    nagOn.instance().value = moment()
      .add(1, 'd')
      .format('MMM Do, YYYY h:mm A');
    nagOn.simulate('change', nagOn);
    nagForm.find('form').simulate('submit');
    expect(nagCreate.mock.calls.length).toBe(1);
  });

  it('should call nagUpdate when all fields are valid', () => {
    const nagForm = mount(
      <Provider store={mockStore()}>
        <NagForm
          nagIndex={nagIndex}
          nagCreate={nagCreate}
          nagUpdate={nagUpdate}
          editNag={nagObject}
          editNagId={nagObject.id}
        />
      </Provider>
    );

    const nagTitle = nagForm.find('input#nag_title');
    nagTitle.instance().value = 'Nag Title';
    nagTitle.simulate('change', nagTitle);
    const nagOn = nagForm.find('input#nag_on');
    nagOn.instance().value = moment()
      .add(1, 'd')
      .format('MMM Do, YYYY h:mm A');
    nagOn.simulate('change', nagOn);
    nagForm.find('form').simulate('submit');
    expect(nagUpdate.mock.calls.length).toBe(1);
  });
});
