/**
 * TreeExample
 *
 * @author       youpiwaza
 * @description  TreeBeard example componant
 * @see          https://github.com/storybooks/react-treebeard
 * @version      1
 */

import React from 'react';
// import ReactDOM from 'react-dom';
import { Treebeard } from 'react-treebeard';
import data from './data.json';

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
    return <Treebeard data={data} onToggle={this.onToggle} />;
  }
}

export default TreeExample;
