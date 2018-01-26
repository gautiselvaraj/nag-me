import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import Icon from './Icon';
import H5 from './H5';
import H6 from './H6';
import { roundedTimestamp, nextNagTimestamp } from '../utils/time';

const SuggestNagsHeading = styled.div`
  border-top: 1px solid ${props => props.theme.greyLighter};
  margin-top: 20px;
  padding-top: 10px;
  text-align: center;
`;

const SuggestNagsUl = styled.ul`
  list-style-type: none;
  margin: 0;
  overflow: hidden;
  padding: 0.5rem 0.5rem 1rem;
`;

const SuggestNagsLi = styled.li`
  background-color: ${props => props.theme.white};
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  margin-bottom: 0.5rem;
  padding: 10px;
  padding-right: 50px;
  position: relative;
  user-select: none;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SuggestNagsRepeat = styled.p`
  font-size: 0.8rem;
  margin: 5px 0 0;
`;

const SuggestNagsButton = styled.div`
  bottom: 0;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export default class NagForm extends Component {
  static propTypes = {
    title: PropTypes.string,
    nagCreate: PropTypes.func.isRequired
  };

  state = {
    nags: [
      {
        title: 'Blink, relax your eyes',
        repeats: '15 min'
      },
      {
        title: 'Take a sip of water',
        repeats: '20 min'
      },
      {
        title: 'Take a deep breath',
        repeats: '1 hour'
      },
      {
        title: 'See a video and smile',
        repeats: '2 hour'
      },
      {
        title: 'Take a walk',
        repeats: '4 hour'
      }
    ]
  };

  handleNagCreate = (e, { title, repeats }) => {
    const on = nextNagTimestamp(roundedTimestamp(), repeats);
    this.props.nagCreate({
      title,
      firstNag: on,
      nextNag: on,
      repeats
    });
  };

  render() {
    return (
      <div>
        <SuggestNagsHeading>
          <H5>{this.props.title || 'Or start with nags below'}</H5>
        </SuggestNagsHeading>
        <SuggestNagsUl>
          {this.state.nags.map(nag => (
            <SuggestNagsLi key={nag.title}>
              <H6>{nag.title}</H6>
              <SuggestNagsRepeat>repeats every {nag.repeats}</SuggestNagsRepeat>
              <SuggestNagsButton>
                <Button
                  circle
                  title="Add this nag"
                  onClick={e => this.handleNagCreate(e, nag)}
                >
                  <Icon inverse add />
                </Button>
              </SuggestNagsButton>
            </SuggestNagsLi>
          ))}
        </SuggestNagsUl>
      </div>
    );
  }
}
