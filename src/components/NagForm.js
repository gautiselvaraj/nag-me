import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Motion, spring} from 'react-motion';
import Datetime from 'react-datetime';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import Icon from './Icon';
import H3 from './H3';

const NagFormWrap = styled.form`
  background-color: ${props => props.theme.greyLightest};
  padding: .5rem;
`;

const NagFormHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props=> props.theme.greyLighter};
  display: flex;
  padding: 5px;
  justify-content: space-between;
`;

const BackLink = styled.div`
  flex: 0 0 25px;
  height: 15px;
  text-align: center;
`;

const Heading = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const Spacer = styled.div`
  margin-bottom: .75rem;
`;

const ButtonSpacer = styled.div`
  margin-bottom: .75rem;
  margin-top: 1.5rem;
`;

const nagFormSpring = {stiffness: 150, damping: 16};
const nagRepeatOptions = {
  min: [1, 2, 3, 5, 10, 15, 20, 30, 45],
  hour: Array.from(Array(23)).map((_, i) => i + 1),
  day: Array.from(Array(6)).map((_, i) => i + 1),
  week: Array.from(Array(10)).map((_, i) => i + 1),
  month: Array.from(Array(11)).map((_, i) => i + 1),
  year: Array.from(Array(10)).map((_, i) => i + 1)
}

export default class NagForm extends Component {
  static propTypes = {
    nag: PropTypes.object
  };

  render() {
    const {switchPage} = this.props;

    return (
      <div>
        <NagFormHeader>
          <BackLink>
            <Button reset title="Add new Nag" onClick={() => switchPage('Index')}>
              <Icon back />
            </Button>
          </BackLink>
          <Heading>
            <H3>Create new Nag</H3>
          </Heading>
          <BackLink></BackLink>
        </NagFormHeader>
        <NagFormWrap>
          <Spacer>
            <Input type="text" id="nag_title" label="What to Nag about?" />
          </Spacer>
          <Spacer>
            <Datetime
              renderInput={props => <Input id="nag_on" {...props} readOnly label="Nag on" />}
              dateFormat="MMM Do, YYYY"
            />
          </Spacer>
          <Spacer>
            <Select id="nag_repeat" label="Nag every" defaultValue="">
              <option value="" disabled></option>
              {Object.keys(nagRepeatOptions).map(key =>
                nagRepeatOptions[key].map(t =>
                  <option value={`${t} ${key}`} key={`${t} ${key}`}>{t} {key}{t === 1 ? '' : 's'}</option>
                )
              )}
            </Select>
          </Spacer>
          <ButtonSpacer>
            <Button block type="submit">Start Nagging</Button>
          </ButtonSpacer>
        </NagFormWrap>
      </div>
    )
  }
}
