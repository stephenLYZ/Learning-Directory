import React from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

const HomePage = ({
  userId,
  onSubmitUserId,
  onChangeUserId,
}) => (
  <div>
    <TextField

      hintText="Please Key in your Github User Id."
      onChange={onChangeUserId}
    />
    <Link
      to={{
        pathname: '/result',
        query: { userId },
      }}
    >
      <RaisedButton label="Submit" onClick={onSubmitUserId(userId)} primary />
    </Link>
  </div>
)

HomePage.propTypes = {
  onSubmitUserId: React.PropTypes.func,
  onChangeUserId: React.PropTypes.func,
  userId: React.PropTypes.string,
}
export default HomePage
