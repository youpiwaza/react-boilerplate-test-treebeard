/**
 * TreeExample
 *
 * @author       youpiwaza
 * @description  TreeBeard example componant
 * @see          doc      / https://github.com/storybooks/react-treebeard
 * @see          issue    / https://github.com/storybooks/react-treebeard/issues/100
 * @see          sandbox  / https://codesandbox.io/s/Q5AE9vG0?module=OygDp
 * @version      2
 */

import PropTypes from 'prop-types';

import React from 'react';
// import ReactDOM from 'react-dom';
import { decorators, Treebeard } from 'react-treebeard';

import data from './data.json';

// Extract custom header to allow props validation
const customHeader = props => (
  <span style={props.style}>{props.node.name} lol</span>
);
customHeader.propTypes = {
  node: PropTypes.any,
  style: PropTypes.any,
};

// Create a separate instance of decorators
// Use plugin base & update only what's necessary
const modifiedDecorators = Object.assign({}, decorators, {
  Header: customHeader,
});

class TreeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // Mandatory to give access to TreeExample this.state
    this.onToggle = this.onToggle.bind(this);
  }

  // params : Clicked/toggled node and his toggled state
  onToggle(node, toggled) {
    // Remove active state on precedent cursor
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }

    // linter > Avoid params reassign...
    const datNode = node;

    // Clicked node becomes active
    datNode.active = true;

    // If node have children, toggle it
    // Not sure how the toggle effect if made tho
    if (datNode.children) {
      datNode.toggled = toggled;
    }

    // Update state
    this.setState({ cursor: datNode });

    console.log(this.state);
  }
  render() {
    return (
      <Treebeard
        data={data}
        decorators={modifiedDecorators}
        onToggle={this.onToggle}
      />
    );
  }
}

export default TreeExample;
