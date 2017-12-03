import {connect} from 'react-redux';
import NagForm from '../components/NagForm';
import {nagIndex, nagCreate, nagUpdate} from '../actions/NagActions';

const mapDispatchToProps = dispatch => ({
  nagIndex: () => dispatch(nagIndex()),
  nagCreate: nag => dispatch(nagCreate(nag)),
  nagUpdate: nag => dispatch(nagUpdate(nag)),
});

export default connect(null, mapDispatchToProps)(NagForm);
