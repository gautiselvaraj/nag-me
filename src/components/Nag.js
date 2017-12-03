import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import humanizeDuration from 'humanize-duration';
import {humanizeNextNag} from '../utils/time';
import Button from './Button';
import Icon from './Icon';

const NagWrap = styled.li`
  background-color: #ffffff;
  border: 2px solid transparent;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .25);
  cursor: pointer;
  margin-bottom: .5rem;
  padding: 5px;
  position: relative;
  transition: transform .35s;
  ${props => props.active ? 'transform: translateX(-150px)' : ''};

  &:last-child {
    margin-bottom: 0;
  }
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

const NagLinks = styled.div`
  position: absolute;
  right: -135px;
  top: 50%;
  transform: translateY(-50%);
  width: 120px;

  button {
    margin-left: .5rem;
  }
`;

export default class Nag extends Component {
  static propTypes = {
    nag: PropTypes.object.isRequired
  };

  state = {nowTimestamp: Date.now(), active: false};

  updateTimestamp = () => {
    this.setState({nowTimestamp: Date.now()});
  }

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
    const {nowTimestamp, active} = this.state;

    return (
      <NagWrap active={active} tabindex="0" onClick={this.handleClick}>
        <NagHeading>{nag.title}</NagHeading>
        <NagTimer>in {humanizeNextNag(nag.nextNag - nowTimestamp)}</NagTimer>
        <NagRepeat>
          {!!nag.repeats &&
            <span>and repeat every {humanizeDuration(nag.repeats)}</span>
          }
        </NagRepeat>
        <NagLinks>
          <Button circle title={`Edit ${nag.title} Nag`}>
            <Icon edit />
          </Button>
          <Button circle title={`Delete ${nag.title} Nag`}>
            <Icon delete />
          </Button>
          {nag.paused ?
            <Button circle title={`Resume ${nag.title} Nag`}>
              <Icon resume />
            </Button> :
            <Button circle title={`Pause ${nag.title} Nag`}>
              <Icon pause />
            </Button>
          }
        </NagLinks>
      </NagWrap>
    )
  }
}
