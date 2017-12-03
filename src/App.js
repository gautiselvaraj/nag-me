import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import theme from './theme'
import './global-styles';
import Header from './components/Header';
import SearchSort from './components/SearchSort';
import Nags from './components/Nags';
import NagForm from './components/NagForm';

const App = styled.div`
  font-family: 'Open Sans', sans-serif;
  line-height: 1.35;
  width: 350px;
`;

const nags = [
  {
    id: 1,
    title: 'Drink Water',
    nextNag: Date.parse(new Date('2017-12-4')),
    repeats: '2 min',
    paused: false,
    nagCount: 0,
    createdAt: Date.parse(new Date('2017-12-2')),
  },
  {
    id: 2,
    title: 'Take a deep breath',
    nextNag: Date.parse(new Date('2017-12-5')),
    repeats: '20 min',
    paused: false,
    nagCount: 0,
    createdAt: Date.parse(new Date('2017-12-2')),
  },
  {
    id: 3,
    title: 'Take a short walk',
    nextNag: Date.parse(new Date('2017-12-25')),
    repeats: '5 hour',
    paused: true,
    nagCount: 0,
    createdAt: Date.parse(new Date('2017-12-2')),
  },
  {
    id: 4,
    title: 'Sleep once in a while',
    nextNag: Date.parse(new Date('2018-2-5')),
    repeats: false,
    paused: false,
    nagCount: 0,
    createdAt: Date.parse(new Date('2017-12-2')),
  }
]

export default () => (
  <ThemeProvider theme={theme}>
    <App>
      <Header />
      <SearchSort />
      <Nags nags={nags} />
      <NagForm />
    </App>
  </ThemeProvider>
);
