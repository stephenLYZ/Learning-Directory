import { connect } from 'react-redux'
import ResultPage from '../../components/ResultPage/ResultPage'

export default connect(
  (state) => ({
    data: state.getIn(['github','data'])
  }),
)(ResultPage)
