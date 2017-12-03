import {connect} from 'react-redux';
import NagForm from '../components/NagForm';
import {switchPage} from '../actions/PageActions';

const mapDispatchToProps = dispatch => ({
  switchPage: page => dispatch(switchPage(page))
});

export default connect(null, mapDispatchToProps)(NagForm);
