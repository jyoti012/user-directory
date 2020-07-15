import React from "react"
import PropTypes from "prop-types"
class Input extends React.Component {
  render () {
    return (
      <input
        type="text"
        name={this.props.name}/>
    );
  }
}
Input.propTypes = {
  name: PropTypes.string,
};
export default Input
