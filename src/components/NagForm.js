import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Datetime from 'react-datetime';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import Icon from './Icon';
import H3 from './H3';

const NagFormWrap = styled.form`
  padding: .5rem;
`;

const NagFormHeader = styled.div`
  align-items: center;
  background-color: ${props=> props.theme.white};
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

const nagRepeatOptions = {
  min: [1, 2, 3, 5, 10, 15, 20, 30, 45],
  hour: Array.from(Array(23)).map((_, i) => i + 1),
  day: Array.from(Array(6)).map((_, i) => i + 1),
  week: Array.from(Array(10)).map((_, i) => i + 1),
  month: Array.from(Array(11)).map((_, i) => i + 1),
  year: Array.from(Array(10)).map((_, i) => i + 1)
}

const today = Datetime.moment().subtract(1, 'd');

export default class NagForm extends Component {
  static propTypes = {
    nagIndex: PropTypes.func.isRequired,
    nagCreate: PropTypes.func.isRequired,
    nagUpdate: PropTypes.func.isRequired
  };

  valid = current => current.isAfter(today);

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDateTimeInputChange = moment => {
    this.setState({on: moment.valueOf()});
  }

  handleSubmit = e => {
    e.preventDefault();

    const {title, on, repeats} = this.state;

    this.props.nagCreate({
      nag: {
        title,
        firstNag: on,
        nextNag: on,
        repeats
      }
    })
  }

  render() {
    const {nagIndex} = this.props;

    return (
      <div>
        <NagFormHeader>
          <BackLink>
            <Button reset title="Back" onClick={nagIndex}>
              <Icon back />
            </Button>
          </BackLink>
          <Heading>
            <H3>Create new Nag</H3>
          </Heading>
          <BackLink></BackLink>
        </NagFormHeader>
        <NagFormWrap onSubmit={this.handleSubmit}>
          <Spacer>
            <Input autoFocus type="text" name="title" id="nag_title" label="What to Nag about?" onChange={this.handleInputChange} />
          </Spacer>
          <Spacer>
            <Datetime
              renderInput={props => <Input id="nag_on" {...props} readOnly label="Nag on" name="on" />}
              dateFormat="MMM Do, YYYY"
              isValidDate={this.valid}
              onChange={this.handleDateTimeInputChange}
            />
          </Spacer>
          <Spacer>
            <Select name="repeats" id="nag_repeats" label="Nag every" defaultValue="" onChange={this.handleInputChange}>
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
