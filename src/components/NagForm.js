import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Datetime from 'react-datetime';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import Icon from './Icon';
import H3 from './H3';
import NagSuggest from '../containers/NagSuggest';
import { roundedTimestamp } from '../utils/time';

const NagFormWrap = styled.form`
  padding: 0.5rem;
`;

const NagFormHeader = styled.div`
  align-items: center;
  background-color: ${props => props.theme.white};
  border-bottom: 1px solid ${props => props.theme.greyLighter};
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
  margin-bottom: 0.75rem;
`;

const ButtonSpacer = styled.div`
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
`;

const nagRepeatOptions = {
  min: [1, 2, 3, 5, 10, 15, 20, 30, 45],
  hour: Array.from(Array(23)).map((_, i) => i + 1),
  day: Array.from(Array(6)).map((_, i) => i + 1),
  week: Array.from(Array(10)).map((_, i) => i + 1),
  month: Array.from(Array(11)).map((_, i) => i + 1),
  year: Array.from(Array(10)).map((_, i) => i + 1)
};

const today = Datetime.moment().subtract(1, 'd');

const getState = editNag => ({
  title: editNag ? editNag.title : '',
  on: editNag ? editNag.nextNag : '',
  repeats: editNag ? editNag.repeats : '',
  titleError: null,
  onError: null
});

export default class NagForm extends Component {
  static propTypes = {
    nagIndex: PropTypes.func.isRequired,
    nagCreate: PropTypes.func.isRequired,
    nagUpdate: PropTypes.func.isRequired,
    editNagId: PropTypes.number,
    editNag: PropTypes.object
  };

  state = getState(this.props.editNag);

  valid = current => current.isAfter(today);

  componentWillReceiveProps(nextProps) {
    if (nextProps.editNagId !== this.props.editNagId) {
      this.setState(getState(nextProps.editNag));
    }
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      [`${name}Error`]: !value ? `Nag ${name} is required` : null
    });
  };

  handleDateTimeInputChange = moment => {
    this.setState({
      on: moment.valueOf(),
      onError: null
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, on, repeats } = this.state;
    const { editNagId, nagUpdate, nagCreate } = this.props;

    if (!title || !on) {
      this.setState({
        titleError: !title ? 'Nag title is required' : null,
        onError: !on ? 'Nag from is required' : null
      });
      return false;
    }

    if (on < roundedTimestamp()) {
      this.setState({
        onError: 'Nag from should be in future'
      });
      return false;
    }

    if (editNagId) {
      nagUpdate(editNagId, {
        title,
        nextNag: on,
        repeats
      });
    } else {
      nagCreate({
        title,
        firstNag: on,
        nextNag: on,
        repeats
      });
    }
  };

  render() {
    const { nagIndex, editNagId } = this.props;
    const { title, on, repeats, titleError, onError } = this.state;

    return (
      <div>
        <NagFormHeader>
          <BackLink>
            <Button reset title="Back" onClick={nagIndex}>
              <Icon back />
            </Button>
          </BackLink>
          <Heading>
            <H3>{!!editNagId ? `Edit nag` : 'Create a nag'}</H3>
          </Heading>
          <BackLink />
        </NagFormHeader>
        <NagFormWrap onSubmit={this.handleSubmit}>
          <Spacer>
            <Input
              autoFocus
              value={title}
              type="text"
              name="title"
              id="nag_title"
              label="What to nag about?"
              error={titleError}
              onChange={this.handleInputChange}
            />
          </Spacer>
          <Spacer>
            <Datetime
              renderInput={props => (
                <Input
                  id="nag_on"
                  {...props}
                  readOnly
                  label="Nag from"
                  name="on"
                  error={onError}
                />
              )}
              dateFormat="MMM Do, YYYY"
              isValidDate={this.valid}
              onChange={this.handleDateTimeInputChange}
              value={
                on ? Datetime.moment(on).format('MMM Do, YYYY h:mm A') : ''
              }
            />
          </Spacer>
          <Spacer>
            <Select
              name="repeats"
              id="nag_repeats"
              label="Repeat every"
              value={repeats}
              onChange={this.handleInputChange}
            >
              <option value="" />
              {Object.keys(nagRepeatOptions).map(key =>
                nagRepeatOptions[key].map(t => (
                  <option value={`${t} ${key}`} key={`${t} ${key}`}>
                    {t} {key}
                    {t === 1 ? '' : 's'}
                  </option>
                ))
              )}
            </Select>
          </Spacer>
          <ButtonSpacer>
            <Button block type="submit">
              {!!editNagId ? `Update Nag` : 'Start Nagging'}
            </Button>
          </ButtonSpacer>
          {!editNagId && <NagSuggest />}
        </NagFormWrap>
      </div>
    );
  }
}
