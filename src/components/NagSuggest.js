import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaggeredMotion, spring } from 'react-motion';
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

const nagsSuggestSpring = { stiffness: 120, damping: 16 };

export default class NagForm extends Component {
  static propTypes = {
    nagCreate: PropTypes.func.isRequired
  };

  state = {
    initiated: false,
    nagsSuggest: [
      {
        id: 1,
        title: 'Drink water',
        repeats: '20 min'
      },
      {
        id: 2,
        title: 'Relax your eyes',
        repeats: '30 min'
      },
      {
        id: 3,
        title: 'Take a deep breath',
        repeats: '1 hour'
      },
      {
        id: 4,
        title: 'Remember to smile',
        repeats: '4 hour'
      },
      {
        id: 5,
        title: 'Go for a walk',
        repeats: '8 hour'
      }
    ]
  };

  getInterpolatedStyles = prevInterpolatedStyles => {
    const endValue = prevInterpolatedStyles.map((_, i) => {
      return i === 0
        ? { t: spring(0, nagsSuggestSpring) }
        : { t: spring(prevInterpolatedStyles[i - 1].t, nagsSuggestSpring) };
    });
    return endValue;
  };

  componentDidMount() {
    this.timeoutTimer = setTimeout(
      () => this.setState({ initiated: true }),
      225
    );
  }

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
    const { initiated, nagsSuggest } = this.state;

    if (!initiated) {
      return null;
    }

    return (
      <div>
        <SuggestNagsHeading>
          <H5>Or try the nags below</H5>
        </SuggestNagsHeading>
        <StaggeredMotion
          defaultStyles={nagsSuggest.map(i => ({ t: 100 }))}
          styles={this.getInterpolatedStyles}
        >
          {interpolatingStyles => (
            <SuggestNagsUl>
              {interpolatingStyles.map(({ t }, i) => (
                <SuggestNagsLi
                  style={{
                    WebkitTransform: `translateY(${t}px)`,
                    transform: `translateY(${t}px)`
                  }}
                  key={nagsSuggest[i].id}
                >
                  <H6>{nagsSuggest[i].title}</H6>
                  <SuggestNagsRepeat>
                    repeats every {nagsSuggest[i].repeats}
                  </SuggestNagsRepeat>
                  <SuggestNagsButton>
                    <Button
                      circle
                      title="Start this nag"
                      onClick={e => this.handleNagCreate(e, nagsSuggest[i])}
                    >
                      <Icon inverse add />
                    </Button>
                  </SuggestNagsButton>
                </SuggestNagsLi>
              ))}
            </SuggestNagsUl>
          )}
        </StaggeredMotion>
      </div>
    );
  }
}
