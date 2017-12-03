import {connect} from 'react-redux';
import Header from '../components/Header';
import {nagIndex, nagNew} from '../actions/NagActions';

const mapDispatchToProps = dispatch => ({
  nagIndex: () => dispatch(nagIndex()),
  nagNew: () => dispatch(nagNew())
});

export default connect(null, mapDispatchToProps)(Header);
