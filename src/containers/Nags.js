import {connect} from 'react-redux';
import Nags from '../components/Nags';
import {nagNew} from '../actions/NagActions';

const mapStateToProps = state => ({
  nags: state.getIn(['nag', 'list']).toJS()
});

const mapDispatchToProps = dispatch => ({
  nagNew: () => dispatch(nagNew())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nags);
