import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaggeredMotion, spring } from 'react-motion';
import {
  humanizeNextNag,
  nagRepeatText,
  roundedTimestamp,
  progressCheck
} from '../utils/time';
import Button from './Button';
import Icon from './Icon';

const NagWrap = styled.div`
  background-color: ${props =>
    props.paused
      ? props.theme.greyLighter
      : props.completed ? props.theme.greyLight : '#ffffff'};
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  padding: 10px;
  position: relative;
  user-select: none;
  will-change: transform;
  ${props =>
    props.paused ? '' : `border-bottom: 3px solid ${props.theme.greyLightest}`};
`;

const NagHeading = styled.h3`
  color: ${props => props.theme.main};
  font-size: 1.2rem;
  margin: 0;
`;

export const NagTimer = styled.p`
  color: ${props => props.theme.greyDarkest};
  font-size: 0.85rem;
  margin-bottom: 0;
  margin-top: 5px;
`;

export const NagRepeat = styled.p`
  color: ${props => props.theme.greyLight};
  font-size: 0.75rem;
  margin-bottom: 0;
  margin-top: 5px;
`;

export const NagStatus = styled.p`
  color: ${props => props.theme.greyDarker};
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 5px;
`;

export const NagProgress = styled.div`
  border-top: 3px solid #6e8ea1;
  border-radius: 0 0 3px 3px;
  bottom: -3px;
  left: 0;
  position: absolute;
  transition: width 1s;
  will-change: width;
`;

export const NagEditLink = styled.div`
  position: absolute;
  right: -45px;
  top: 50%;
  will-change: transform;
`;

export const NagDeleteLink = styled.div`
  position: absolute;
  right: -85px;
  top: 50%;
  will-change: transform;
`;

export const NagStateLink = styled.div`
  position: absolute;
  right: -125px;
  top: 50%;
  will-change: transform;
`;

const nagSpring = { stiffness: 250, damping: 22 };

export default class Nag extends Component {
  static propTypes = {
    nag: PropTypes.object.isRequired,
    nagEdit: PropTypes.func.isRequired,
    nagPause: PropTypes.func.isRequired,
    nagResume: PropTypes.func.isRequired,
    nagDelete: PropTypes.func.isRequired,
    nagStatusUpdate: PropTypes.func.isRequired
  };

  state = { nowTimestamp: roundedTimestamp(), active: false };

  updateTimestamp = () => {
    this.setState({ nowTimestamp: roundedTimestamp() });
  };

  getInterpolatedStyles = prevInterpolatedStyles => {
    const endValue = prevInterpolatedStyles.map((_, i) => {
      if (this.state.active) {
        return i === 0
          ? { t: spring(-135, nagSpring) }
          : { t: spring(prevInterpolatedStyles[i - 1].t, nagSpring) };
      } else {
        return i === 3
          ? { t: spring(0, nagSpring) }
          : { t: spring(prevInterpolatedStyles[i + 1].t, nagSpring) };
      }
    });
    return endValue;
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  startUpdateTimestamp = () => {
    this.intervalTimer = setInterval(this.updateTimestamp, 1000);
  };

  stopUpdateTimestamp = () => {
    clearInterval(this.intervalTimer);
    this.intervalTimer = null;
  };

  componentDidMount() {
    this.startUpdateTimestamp();
  }

  componentDidUpdate() {
    const { nag, nagStatusUpdate } = this.props;

    if (nag.status === 'PAUSED') {
      if (this.intervalTimer) {
        this.stopUpdateTimestamp();
      }
    } else {
      if (!this.intervalTimer) {
        this.startUpdateTimestamp();
      }
    }

    if (nag.status === 'LIVE' && this.state.nowTimestamp >= nag.nextNag) {
      nagStatusUpdate(nag.id);
    }
  }

  componentWillUnmount() {
    this.stopUpdateTimestamp();
  }

  render() {
    const { nag, nagEdit, nagPause, nagResume, nagDelete } = this.props;
    const { nowTimestamp } = this.state;

    return (
      <StaggeredMotion
        defaultStyles={Array.from(Array(4)).map(i => ({ t: 0 }))}
        styles={this.getInterpolatedStyles}
      >
        {interpolatingStyles => (
          <div onClick={this.handleClick}>
            {interpolatingStyles.map(({ t }, i) => (
              <div key={i}>
                {i === 0 && (
                  <NagWrap
                    style={{
                      WebkitTransform: `translateX(${t}px)`,
                      transform: `translateX(${t}px)`
                    }}
                    paused={nag.status === 'PAUSED'}
                    completed={nag.status === 'COMPLETED'}
                  >
                    <NagHeading>{nag.title}</NagHeading>
                    {nag.status === 'LIVE' && (
                      <div>
                        <NagTimer>
                          in {humanizeNextNag(nag.nextNag - nowTimestamp)}
                        </NagTimer>
                        <NagRepeat>
                          {!!nag.repeats && (
                            <span>
                              and repeat every {nagRepeatText(nag.repeats)}
                            </span>
                          )}
                        </NagRepeat>
                      </div>
                    )}
                    {nag.status === 'PAUSED' && <NagStatus>Paused</NagStatus>}
                    {nag.status === 'COMPLETED' && (
                      <NagStatus>Completed</NagStatus>
                    )}
                    {nag.status === 'LIVE' && (
                      <NagProgress style={{ width: progressCheck(nag) }} />
                    )}
                  </NagWrap>
                )}
                {i === 1 && (
                  <NagEditLink
                    style={{
                      WebkitTransform: `translate(${t}px, -50%)`,
                      transform: `translate(${t}px, -50%)`
                    }}
                  >
                    <Button
                      circle
                      title={`Edit`}
                      onClick={() => nagEdit(nag.id)}
                    >
                      <Icon edit />
                    </Button>
                  </NagEditLink>
                )}
                {i === 2 && (
                  <NagDeleteLink
                    style={{
                      WebkitTransform: `translate(${t}px, -50%)`,
                      transform: `translate(${t}px, -50%)`
                    }}
                  >
                    <Button
                      circle
                      title={`Delete`}
                      onClick={() => nagDelete(nag.id)}
                    >
                      <Icon delete />
                    </Button>
                  </NagDeleteLink>
                )}
                {i === 3 && (
                  <NagStateLink
                    style={{
                      WebkitTransform: `translate(${t}px, -50%)`,
                      transform: `translate(${t}px, -50%)`
                    }}
                  >
                    {nag.status === 'COMPLETED' ? (
                      <Button circle title={`Restart`}>
                        <Icon resume />
                      </Button>
                    ) : nag.status === 'PAUSED' ? (
                      <Button
                        circle
                        title={`Resume`}
                        onClick={() => nagResume(nag.id)}
                      >
                        <Icon resume />
                      </Button>
                    ) : (
                      <Button
                        circle
                        title={`Pause`}
                        onClick={() => nagPause(nag.id)}
                      >
                        <Icon pause />
                      </Button>
                    )}
                  </NagStateLink>
                )}
              </div>
            ))}
          </div>
        )}
      </StaggeredMotion>
    );
  }
}
