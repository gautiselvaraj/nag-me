import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaggeredMotion, spring } from 'react-motion';
import Nag from './Nag';
import Button from './Button';
import H3 from './H3';
import NagSuggest from '../containers/NagSuggest';
import SearchSort from '../containers/SearchSort';

const NoNag = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
  }
`;

const NagsUl = styled.ul`
  list-style-type: none;
  margin: 0;
  overflow: hidden;
  padding: 0.5rem;
  will-change: transform;
`;

const NagsLi = styled.li`
  cursor: pointer;
  margin-bottom: 0.5rem;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`;

const nagsSpring = { stiffness: 150, damping: 16 };

export default class Nags extends Component {
  static propTypes = {
    nags: PropTypes.arrayOf(PropTypes.object),
    nagNew: PropTypes.func.isRequired,
    nagEdit: PropTypes.func.isRequired,
    nagPause: PropTypes.func.isRequired,
    nagResume: PropTypes.func.isRequired,
    nagDelete: PropTypes.func.isRequired
  };

  state = { initiated: false };

  getInterpolatedStyles = prevInterpolatedStyles => {
    const endValue = prevInterpolatedStyles.map((_, i) => {
      return i === 0
        ? { t: spring(0, nagsSpring) }
        : { t: spring(prevInterpolatedStyles[i - 1].t, nagsSpring) };
    });
    return endValue;
  };

  componentDidMount() {
    this.timeoutTimer = setTimeout(
      () => this.setState({ initiated: true }),
      225
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutTimer);
  }

  render() {
    const {
      nags,
      nagNew,
      nagEdit,
      nagDelete,
      nagResume,
      nagPause,
      nagStatusUpdate
    } = this.props;
    const { initiated } = this.state;

    if (!initiated) {
      return null;
    }

    if (!nags.length) {
      return (
        <NoNag>
          <H3>Nothing to nag about</H3>
          <Button onClick={nagNew}>Create your first Nag</Button>
          <NagSuggest />
        </NoNag>
      );
    }

    return (
      <div>
        <SearchSort />
        <StaggeredMotion
          defaultStyles={Array.from(Array(nags.length)).map(i => ({ t: 100 }))}
          styles={this.getInterpolatedStyles}
        >
          {interpolatingStyles => (
            <NagsUl>
              {interpolatingStyles.map(
                ({ t }, i) =>
                  !!nags[i] && (
                    <NagsLi
                      style={{
                        WebkitTransform: `translateY(${t}px)`,
                        transform: `translateY(${t}px)`
                      }}
                      key={nags[i].id}
                    >
                      <Nag
                        nag={nags[i]}
                        nagEdit={nagEdit}
                        nagPause={nagPause}
                        nagResume={nagResume}
                        nagDelete={nagDelete}
                        nagStatusUpdate={nagStatusUpdate}
                      />
                    </NagsLi>
                  )
              )}
            </NagsUl>
          )}
        </StaggeredMotion>
      </div>
    );
  }
}
