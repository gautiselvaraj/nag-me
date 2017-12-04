import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { TransitionMotion, spring } from 'react-motion';
import theme from './theme';
import './global-styles';
import Header from './containers/Header';
import SearchSort from './containers/SearchSort';
import Nags from './containers/Nags';
import NagForm from './containers/NagForm';
import { storageGet } from './utils/storage';
import { nagInit } from './actions/NagActions';

const AppWrap = styled.div`
  font-family: 'Open Sans', sans-serif;
  line-height: 1.35;
  overflow-x: hidden;
  width: 350px;
`;

const AnimateParent = styled.div`
  height: 500px;
  overflow-x: hidden;
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

const pagesSpring = { stiffness: 350, damping: 26 };

class App extends Component {
  static propTypes = {
    nagInit: PropTypes.func.isRequired,
    activePage: PropTypes.string.isRequired
  };

  willLeave = ({ key }) => ({
    translateX: spring(key === 'Index' ? -350 : 350, pagesSpring)
  });

  willEnter = ({ key }) => ({
    translateX: key === 'Index' ? -350 : 350
  });

  componentDidMount = () => {
    storageGet('nag', this.props.nagInit);
  };

  render() {
    const { activePage } = this.props;
    const styles = [
      {
        key: activePage,
        style: {
          translateX: spring(0, pagesSpring)
        }
      }
    ];

    return (
      <ThemeProvider theme={theme}>
        <AppWrap>
          <Header />
          <TransitionMotion
            willLeave={this.willLeave}
            willEnter={this.willEnter}
            styles={styles}
          >
            {interpolated => (
              <AnimateParent datapage={activePage}>
                {interpolated.map(({ key, style }) => (
                  <AnimateChild
                    style={{
                      WebkitTransform: `translateX(${style.translateX}px)`,
                      transform: `translateX(${style.translateX}px)`
                    }}
                    key={key}
                  >
                    {key === 'Index' && (
                      <div>
                        <SearchSort />
                        <Nags />
                      </div>
                    )}
                    {key === 'NagForm' && <NagForm />}
                  </AnimateChild>
                ))}
              </AnimateParent>
            )}
          </TransitionMotion>
        </AppWrap>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  activePage: state.getIn(['page', 'activePage'])
});

const mapDispatchToProps = dispatch => ({
  nagInit: nag => dispatch(nagInit(nag))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
