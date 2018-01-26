import { connect } from 'react-redux';
import NagSuggest from '../components/NagSuggest';
import { nagCreate } from '../actions/NagActions';

const mapDispatchToProps = dispatch => ({
  nagCreate: nag => dispatch(nagCreate(nag))
});

export default connect(null, mapDispatchToProps)(NagSuggest);
