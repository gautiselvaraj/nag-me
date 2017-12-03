import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {StaggeredMotion, spring} from 'react-motion';
import Nag from './Nag';

const NagsUl = styled.ul`
  list-style-type: none;
  margin: 0;
  overflow-x: hidden;
  padding: .5rem;
  will-change: transform;
`;

const NagsLi = styled.li`
  cursor: pointer;
  margin-bottom: .5rem;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`;

const nagsSpring = {stiffness: 150, damping: 16};

export default class Nags extends Component {
  static propTypes = {
    nags: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  state = {initiated: false};

  getInterpolatedStyles = prevInterpolatedStyles => {
    const endValue = prevInterpolatedStyles.map((_, i) => {
      return i === 0 ?
        {t: spring(0, nagsSpring)} :
        {t: spring(prevInterpolatedStyles[i - 1].t, nagsSpring)};
    });
    return endValue;
  };

  componentDidMount() {
    this.timeoutTimer = setTimeout(() => this.setState({initiated: true}), 225);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutTimer);
  }

  render() {
    const {nags} = this.props;
    const {initiated} = this.state;

    if(!initiated) {
      return null;
    }

    return (
      <StaggeredMotion
        defaultStyles={Array.from(Array(nags.length)).map(i => ({t: 100}))}
        styles={this.getInterpolatedStyles}
      >
        {interpolatingStyles =>
          <NagsUl>
            {interpolatingStyles.map(({t}, i) =>
              <NagsLi
                style={{
                  WebkitTransform: `translateY(${t}px)`,
                  transform: `translateY(${t}px)`
                }}
                key={nags[i].id}
              >
                <Nag nag={nags[i]} />
              </NagsLi>
            )}
          </NagsUl>
        }
      </StaggeredMotion>
    )
  }
}
