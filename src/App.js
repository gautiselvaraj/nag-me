import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';
import {TransitionMotion, spring} from 'react-motion';
import theme from './theme'
import './global-styles';
import Header from './containers/Header';
import SearchSort from './components/SearchSort';
import Nags from './components/Nags';
import NagForm from './containers/NagForm';

const AppWrap = styled.div`
  font-family: 'Open Sans', sans-serif;
  line-height: 1.35;
  overflow-x: hidden;
  width: 350px;
`;

const AnimateParent = styled.div`
  height: 400px;
  overflow-y: scroll;
  position: relative;
`;

const AnimateChild = styled.div`
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  will-change: transform;
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

const pagesSpring = {stiffness: 250, damping: 18};

class App extends Component {
  willLeave = ({key}) => ({
    translateX: spring(key === 'Index' ? -350 : 350, pagesSpring)
  })

  willEnter = ({key}) => ({
    translateX: key === 'Index' ? -350 : 350
  })

  render() {
    const {activePage} = this.props;
    const styles = [{
      key: activePage,
      style: {
        translateX: spring(0, pagesSpring)
      }
    }];

    return (
      <ThemeProvider theme={theme}>
        <AppWrap>
          <Header />
          <TransitionMotion willLeave={this.willLeave} willEnter={this.willEnter} styles={styles}>
            {interpolated =>
              <AnimateParent datapage={activePage}>
                {interpolated.map(({key, style}) =>
                  <AnimateChild
                    style={{
                      WebkitTransform: `translateX(${style.translateX}px)`,
                      transform: `translateX(${style.translateX}px)`
                    }}
                    key={key}
                  >
                    {key === 'Index' &&
                      <div>
                        <SearchSort />
                        <Nags nags={nags} />
                      </div>
                    }
                    {key === 'NagForm' &&
                      <NagForm />
                    }
                  </AnimateChild>
                )}
              </AnimateParent>
            }
          </TransitionMotion>
        </AppWrap>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  activePage: state.getIn(['page', 'activePage'])
});

export default connect(mapStateToProps)(App);
