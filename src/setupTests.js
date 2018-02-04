import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme and react 16adaptor
Enzyme.configure({ adapter: new Adapter() });

// browser extension API mocks
window.browser = {
  alarms: {
    create: jest.fn(),
    clear: jest.fn(),
    clearAll: jest.fn()
  },
  notifications: {
    create: jest.fn()
  },
  runtime: {
    sendMessage: jest.fn(),
    onMessage: jest.fn()
  },
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn()
    }
  }
};
