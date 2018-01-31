import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Nag, {
  NagTimer,
  NagRepeat,
  NagStatus,
  NagProgress,
  NagEditLink,
  NagDeleteLink,
  NagStateLink
} from '../../components/Nag';
import 'jest-styled-components';

describe('<Nag />', () => {
  let nagEdit,
    nagPause,
    nagResume,
    nagDelete,
    nagStatusUpdate,
    nagObject,
    dateNow;

  beforeAll(() => {
    dateNow = window.Date.now;
    window.Date.now = jest.fn(() => 1517227842390);
  });

  afterAll(() => {
    window.Date.now = dateNow;
  });

  beforeEach(() => {
    nagEdit = jest.fn();
    nagPause = jest.fn();
    nagResume = jest.fn();
    nagDelete = jest.fn();
    nagStatusUpdate = jest.fn();
    nagObject = {
      id: 1,
      title: 'Test Nag 1',
      firstNag: 1234567890,
      nextNag: 1234567890,
      repeats: '1 min',
      status: 'LIVE',
      createdAt: 1234567890
    };
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <Nag
          nag={nagObject}
          nagEdit={nagEdit}
          nagPause={nagPause}
          nagResume={nagResume}
          nagDelete={nagDelete}
          nagStatusUpdate={nagStatusUpdate}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct elements and children', () => {
    const nag = mount(
      <Nag
        nag={nagObject}
        nagEdit={nagEdit}
        nagPause={nagPause}
        nagResume={nagResume}
        nagDelete={nagDelete}
        nagStatusUpdate={nagStatusUpdate}
      />
    );
    expect(nag.find('h3').length).toBe(1);
    expect(nag.find('h3').text()).toBe('Test Nag 1');
    expect(nag.find(NagTimer).length).toBe(1);
    expect(nag.find(NagTimer).text()).toBe('in 48 years');
    expect(nag.find(NagRepeat).length).toBe(1);
    expect(nag.find(NagRepeat).text()).toBe('and repeat every 1 minute');
    expect(nag.find(NagStatus).length).toBe(0);
    expect(nag.find(NagProgress).length).toBe(1);
    expect(nag.find(NagEditLink).length).toBe(1);
    expect(nag.find(NagDeleteLink).length).toBe(1);
    expect(nag.find(NagStateLink).find('button[title="Pause"]').length).toBe(1);
  });

  it('should call nagEdit', () => {
    const nag = mount(
      <Nag
        nag={nagObject}
        nagEdit={nagEdit}
        nagPause={nagPause}
        nagResume={nagResume}
        nagDelete={nagDelete}
        nagStatusUpdate={nagStatusUpdate}
      />
    );
    nag
      .find(NagEditLink)
      .find('button')
      .simulate('click');
    expect(nagEdit.mock.calls.length).toBe(1);
  });

  it('should call nagPause', () => {
    const nag = mount(
      <Nag
        nag={nagObject}
        nagEdit={nagEdit}
        nagPause={nagPause}
        nagResume={nagResume}
        nagDelete={nagDelete}
        nagStatusUpdate={nagStatusUpdate}
      />
    );
    nag
      .find(NagStateLink)
      .find('button')
      .simulate('click');
    expect(nagPause.mock.calls.length).toBe(1);
  });

  it('should call nagDelete', () => {
    const nag = mount(
      <Nag
        nag={nagObject}
        nagEdit={nagEdit}
        nagPause={nagPause}
        nagResume={nagResume}
        nagDelete={nagDelete}
        nagStatusUpdate={nagStatusUpdate}
      />
    );
    nag
      .find(NagDeleteLink)
      .find('button')
      .simulate('click');
    expect(nagDelete.mock.calls.length).toBe(1);
  });

  it('should call nagResume if status is paused', () => {
    const nag = mount(
      <Nag
        nag={Object.assign({}, nagObject, { status: 'PAUSED' })}
        nagEdit={nagEdit}
        nagPause={nagPause}
        nagResume={nagResume}
        nagDelete={nagDelete}
        nagStatusUpdate={nagStatusUpdate}
      />
    );
    nag
      .find(NagStateLink)
      .find('button')
      .simulate('click');
    expect(nagResume.mock.calls.length).toBe(1);
  });
});
