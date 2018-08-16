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

const data = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [{ name: 'child1' }, { name: 'child2' }],
    },
    {
      name: 'loading parent',
      loading: true,
      children: [],
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [{ name: 'nested child 1' }, { name: 'nested child 2' }],
        },
      ],
    },
  ],
};

class TreeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }

    const pute = node;

    pute.active = true;

    if (node.children) {
      pute.toggled = toggled;
    }

    this.setState({ cursor: pute });
  }
  render() {
    return <Treebeard data={data} onToggle={this.onToggle} />;
  }
}

export default TreeExample;
