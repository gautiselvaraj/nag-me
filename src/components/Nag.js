import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import humanizeDuration from 'humanize-duration';
import {StaggeredMotion, spring} from 'react-motion';
import {humanizeNextNag} from '../utils/time';
import Button from './Button';
import Icon from './Icon';

const NagWrap = styled.div`
  background-color: #ffffff;
  border: 2px solid transparent;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .25);
  padding: 5px;
  will-change: transform;
`;

const NagHeading = styled.h3`
  font-size: 1.15rem;
  margin: 0;
`;

const NagTimer = styled.p`
  color: ${props => props.theme.greyDarker};
  font-size: .85rem;
  margin-bottom: 0;
  margin-top: 5px;
`;

const NagRepeat = styled.p`
  color: ${props => props.theme.greyLight};
  font-size: .75rem;
  margin-bottom: 0;
  margin-top: 5px;
`;

const NagEditLink = styled.div`
  position: absolute;
  right: -45px;
  top: 50%;
  will-change: transform;
`;

const NagDeleteLink = styled.div`
  position: absolute;
  right: -85px;
  top: 50%;
  will-change: transform;
`;

const NagStateLink = styled.div`
  position: absolute;
  right: -125px;
  top: 50%;
  will-change: transform;
`;

const nagSpring = {stiffness: 250, damping: 22};

export default class Nag extends Component {
  static propTypes = {
    nag: PropTypes.object.isRequired
  };

  state = {nowTimestamp: Date.now(), active: false};

  updateTimestamp = () => {
    this.setState({nowTimestamp: Date.now()});
  }

  getInterpolatedStyles = prevInterpolatedStyles => {
    const endValue = prevInterpolatedStyles.map((_, i) => {
      if(this.state.active) {
        return i === 0 ?
          {t: spring(-135, nagSpring)} :
          {t: spring(prevInterpolatedStyles[i - 1].t, nagSpring)};
      } else {
        return i === 3 ?
          {t: spring(0, nagSpring)} :
          {t: spring(prevInterpolatedStyles[i + 1].t, nagSpring)};
        }
    });
    return endValue;
  };

  handleClick = () => {
    this.setState({active: !this.state.active})
  }

  componentDidMount() {
    this.intervalTimer = setInterval(this.updateTimestamp, 1000);
  }

  componentDidUnMount() {
    clearInterval(this.intervalTimer);
  }

  render() {
    const {nag} = this.props;
    const {nowTimestamp} = this.state;

    return (
      <StaggeredMotion
        defaultStyles={Array.from(Array(4)).map(i => ({t: 0}))}
        styles={this.getInterpolatedStyles}>
        {interpolatingStyles =>
          <div onClick={this.handleClick}>
            {interpolatingStyles.map(({t}, i) => (
              <div key={i}>
                {i === 0 &&
                  <NagWrap style={{
                    WebkitTransform: `translateX(${t}px)`,
                    transform: `translateX(${t}px)`
                  }}>
                    <NagHeading>{nag.title}</NagHeading>
                    <NagTimer>in {humanizeNextNag(nag.nextNag - nowTimestamp)}</NagTimer>
                    <NagRepeat>
                      {!!nag.repeats &&
                        <span>and repeat every {humanizeDuration(nag.repeats)}</span>
                      }
                    </NagRepeat>
                  </NagWrap>
                }
                {i === 1 &&
                  <NagEditLink style={{
                    WebkitTransform: `translate(${t}px, -50%)`,
                    transform: `translate(${t}px, -50%)`
                  }}>
                    <Button circle title={`Edit ${nag.title} Nag`}>
                      <Icon edit />
                    </Button>
                  </NagEditLink>
                }
                {i === 2 &&
                  <NagDeleteLink style={{
                    WebkitTransform: `translate(${t}px, -50%)`,
                    transform: `translate(${t}px, -50%)`
                  }}>
                    <Button circle title={`Delete ${nag.title} Nag`}>
                      <Icon delete />
                    </Button>
                  </NagDeleteLink>
                }
                {i === 3 &&
                  <NagStateLink style={{
                    WebkitTransform: `translate(${t}px, -50%)`,
                    transform: `translate(${t}px, -50%)`
                  }}>
                    {nag.paused ?
                      <Button circle title={`Resume ${nag.title} Nag`}>
                        <Icon resume />
                      </Button> :
                      <Button circle title={`Pause ${nag.title} Nag`}>
                        <Icon pause />
                      </Button>
                    }
                  </NagStateLink>
                }
              </div>
            ))}
          </div>
        }
      </StaggeredMotion>
    )
  }
}
