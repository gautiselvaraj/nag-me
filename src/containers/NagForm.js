import {connect} from 'react-redux';
import NagForm from '../components/NagForm';
import {nagIndex, nagCreate, nagUpdate} from '../actions/NagActions';

const mapStateToProps = state => {
  const editNagId = state.getIn(['nag', 'editNagId']);

  return {
    editNagId,
    editNag: state.getIn(['nag', 'list']).toJS().find(n => n.id === editNagId)
  };
}

const mapDispatchToProps = dispatch => ({
  nagIndex: () => dispatch(nagIndex()),
  nagCreate: nag => dispatch(nagCreate(nag)),
  nagUpdate: (nagId, nag) => dispatch(nagUpdate(nagId, nag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NagForm);
