import { connect } from 'react-redux';
import Nags from '../components/Nags';
import {
  nagNew,
  nagEdit,
  nagPause,
  nagResume,
  nagDelete
} from '../actions/NagActions';

const mapStateToProps = state => {
  const visibleList = state.getIn(['nag', 'visibleList']).toJS();
  let nags = visibleList.LIVE ? visibleList.LIVE : [];
  if (visibleList.PAUSED) {
    nags = [...nags, ...visibleList.PAUSED];
  }
  if (visibleList.COMPLETED) {
    nags = [...nags, ...visibleList.COMPLETED];
  }

  return { nags };
};

const mapDispatchToProps = dispatch => ({
  nagNew: () => dispatch(nagNew()),
  nagEdit: nagId => dispatch(nagEdit(nagId)),
  nagPause: nagId => dispatch(nagPause(nagId)),
  nagResume: nagId => dispatch(nagResume(nagId)),
  nagDelete: nagId => dispatch(nagDelete(nagId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Nags);
