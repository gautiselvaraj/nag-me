import { connect } from 'react-redux';
import SearchSort from '../components/SearchSort';
import { nagsSearch, nagsSort } from '../actions/NagActions';

const mapStateToProps = state => ({
  query: state.getIn(['nag', 'query']),
  sortBy: state.getIn(['nag', 'sortBy'])
});

const mapDispatchToProps = dispatch => ({
  nagsSearch: query => dispatch(nagsSearch(query)),
  nagsSort: sortBy => dispatch(nagsSort(sortBy))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchSort);
