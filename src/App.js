import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import theme from './theme'
import './global-styles';
import Header from './components/Header';

const App = styled.div`
  font-family: 'Open Sans', sans-serif;
  line-height: 1.35;
  min-height: 300px;
  width: 350px;
`;

export default () => (
  <ThemeProvider theme={theme}>
    <App>
      <Header />
    </App>
  </ThemeProvider>
);
