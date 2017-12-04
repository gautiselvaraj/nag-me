import {connect} from 'react-redux';
import Nags from '../components/Nags';
import {nagNew, nagEdit, nagPause, nagResume, nagDelete} from '../actions/NagActions';

const mapStateToProps = state => ({
  nags: state.getIn(['nag', 'visibleList']).toJS()
});

const mapDispatchToProps = dispatch => ({
  nagNew: () => dispatch(nagNew()),
  nagEdit: nagId => dispatch(nagEdit(nagId)),
  nagPause: nagId => dispatch(nagPause(nagId)),
  nagResume: nagId => dispatch(nagResume(nagId)),
  nagDelete: nagId => dispatch(nagDelete(nagId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Nags);
