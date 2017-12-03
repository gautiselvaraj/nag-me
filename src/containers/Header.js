import {connect} from 'react-redux';
import Header from '../components/Header';
import {switchPage} from '../actions/PageActions';

const mapDispatchToProps = dispatch => ({
  switchPage: page => dispatch(switchPage(page))
});

export default connect(null, mapDispatchToProps)(Header);
