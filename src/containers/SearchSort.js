import { connect } from 'react-redux';
import SearchSort from '../components/SearchSort';
import { nagsSearch, nagsSort } from '../actions/NagActions';

const mapDispatchToProps = dispatch => ({
  nagsSearch: query => dispatch(nagsSearch(query)),
  nagsSort: sortBy => dispatch(nagsSort(sortBy))
});

export default connect(null, mapDispatchToProps)(SearchSort);
